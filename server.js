const net = require("net");
const fs = require("fs").promises;

const server = net.createServer();

server.listen(3000, () => {
  console.log("server listening on port 3000...");
});

server.on("connection", (client) => {
  console.log("New client connected");
  client.write("---connected---");

  client.setEncoding("utf8");

  client.on("data", (data) => {
    console.log(data);
  });
});


//server functions :
// => show files
// => CREATE file from data
// => READ file by name
// => UPDATE file (add data)
// => DELETE file by name

