const net = require("net");

const conn = net.createConnection({
  host: 'localhost',
  port: 3000
});

conn.setEncoding("utf8");

conn.on("connect", () => {
  conn.write("Howdy!");
});

conn.on("data", (data) => {
  console.log("Server says: ", data);
});

