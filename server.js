const { parseInstruction } = require("./file-controller");
const net = require("net");
const server = net.createServer();

server.listen(3000, () => {
  console.log("server listening on port 3000...");
});

server.on("connection", (client) => {
  console.log("New client connected");
  client.write("---connected---");

  client.setEncoding("utf8");

  client.on("data", (data) => {
    parseInstruction(data);
  });
});


//server functions :
// => list all files            list
// => CREATE file from data     save file.txt as file2.txt
// => READ file by name         load file.txt
// => DELETE file by name       delete file.txt

