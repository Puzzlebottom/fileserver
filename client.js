const net = require("net");
const { HOST, PORT } = require("./constants");

const connect = () => {
  const conn = net.createConnection({
    host: HOST,
    port: PORT
  });

  conn.setEncoding("utf8");

  conn.on("connect", () => conn.write("Howdy!"));
  conn.on("data", (data) => console.log(data));
  conn.on("end", () => console.log("---disconnected---"));

  return conn;
};

module.exports = { connect };