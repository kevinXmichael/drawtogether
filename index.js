const SerialPort = require("serialport");
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

const client = new tmi.client(loginData);
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);
client.connect();

function onMessageHandler(target, context, msg, self) {
  if (!self) {
    const direction = resolveDirection(msg);
    if (direction) {
      sendToSerialPort(direction);
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
    { keys: ["stift runter", "⬇️", "unten"], value: "gcodeDown", symbol: "⬇️" },
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

function sendToSerialPort(direction = false) {
  if (direction && direction.value && direction.symbol) {
    const logError = (err) =>
      console.error(
        `🚨 Something went wrong walking '${direction.symbol}': ${err}`
      );
    try {
      console.log(`👉 Walking ${direction.symbol}`);

      const path = "/dev/tty-usbserial1";
      port.on("error", logError(err));

      const serialport = new SerialPort(path);
      serialport.write(direction.value, logError(err));
    } catch (err) {
      logError(err);
    }
  }
}

function onConnectedHandler(addr, port) {
  console.log(`✅ Connected to ${addr}:${port}...`);
}
