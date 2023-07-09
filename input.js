const readline = require('readline');
const { writeFile, readFile } = require('fs').promises;

let connection;

const setupInput = (conn) => {
  connection = conn;

  const rl = readline.createInterface({
    'input': process.stdin,
    'output': process.stdout
  });

  const stdin = rl.input;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  rl.on('line', (line) => inputHandler(line));
  stdin.resume();

  return stdin;
};

const inputHandler = (line) => {
  connection.write(line);
};

module.exports = { setupInput };