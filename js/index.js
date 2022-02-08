const tmi = require("tmi.js");
const loginData = {
  identity: {
    username: "",
    password: "oauth:",
  },
  channels: [
    // twitch.tv/<CHANNEL_NAME></CHANNEL_NAME>
  ],
};
const PORT = 3000;

const { Server } = require("socket.io");
const io = new Server({});

io.on("connection", (socket) => {
  console.log(
    `Started js-Socket-Server on port ${PORT} with socket.id: ${socket.id}`
  );

  const client = new tmi.client(loginData);
  client.on("message", onMessageHandler);
  client.on("connected", onConnectedHandler);
  client.connect();

  function onMessageHandler(target, context, msg, self) {
    if (!self) {
      const direction = resolveDirection(msg);
      if (direction) {
        sendToAxi(direction);
      }
    }
  }

  function resolveDirection(msg = false) {
    const directions = [
      { keys: ["left", "⬅️", "links"], value: "gcodeLeft", symbol: "⬅️" },
      { keys: ["right", "➡️", "rechts"], value: "gcodeRight", symbol: "➡️" },
      { keys: ["up", "⬆️", "oben"], value: "gcodeUp", symbol: "⬆️" },
      { keys: ["down", "⬇️", "unten"], value: "gcodeDown", symbol: "⬇️" },

      { keys: ["stift hoch", "⬇️", "unten"], value: "gcodeDown", symbol: "⬇️" },
      {
        keys: ["stift runter", "⬇️", "unten"],
        value: "gcodeDown",
        symbol: "⬇️",
      },
      { keys: ["go home", "⬇️", "unten"], value: "gcodeDown", symbol: "⬇️" },
    ];

    return (
      directions.find((direction) => {
        try {
          if (direction.keys.includes(msg?.trim().toLowerCase())) {
            return direction;
          }
        } catch (err) {
          console.error(`🚨 Cannot parse direction from message: '${msg}'`);
          return false;
        }
      }) || false
    );
  }

  function sendToAxi(direction = false) {
    if (direction && direction.value && direction.symbol) {
      const logError = (err) =>
        console.error(
          `🚨 Something went wrong walking '${direction.symbol}': ${err}`
        );
      try {
        console.log(`👉 Walking ${direction.symbol}`);

        // TODO: send to axi with client.js
        socket.emit("axi-walk", direction);
      } catch (err) {
        logError(err);
      }
    }
  }

  function onConnectedHandler(addr, port) {
    console.log(`✅ Connected to ${addr}:${port}...`);
  }
});

io.listen(PORT);
