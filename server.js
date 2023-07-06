const net = require("net");

const server = net.createServer();

server.listen(3000, () => {
  console.log("server listening on port 3000...");
});

server.on("connection", (client) => {
  console.log("New client connected");
  client.write("G'day");

  client.setEncoding("utf8"); // interpret data as text

  client.on("data", (data) => {
    console.log("Message from client: ", data);
  });
});
