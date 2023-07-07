const readline = require('readline');

let connection;

const setupInput = (conn) => {
  connection = conn;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const stdin = rl.input;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  rl.on('line', (line) => connection.write(line));
  stdin.resume();

  return stdin;
};

module.exports = { setupInput };