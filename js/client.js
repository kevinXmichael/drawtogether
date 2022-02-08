const net = require("net");

const client = new net.Socket();
client.connect(12345, "127.0.0.1", () => {
  console.log("✅ Connected");
  client.write("left");
});

client.on("data", (data) => {
  console.log("> " + data);
  client.destroy(); // kill client after server's response
});

client.on("close", () => {
  console.log("> Connection closed");
});
