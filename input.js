const readline = require('readline');
const { loadFile } = require('./file-controller');

let connection;

const setupInput = (conn) => {
  connection = conn;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const stdin = rl.input;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');

  rl.on('line', (line) => inputHandler(line));

  stdin.resume();

  return stdin;
};

const inputHandler = (line) => {

  const VALID_COMMANDS = ['delete', 'list', 'load', 'save'];

  const [command, fileName] = [...line.split(' ')];

  if (!VALID_COMMANDS.includes(command)) {
    return console.log(`Client Error: unknown command: ${command}\n`);
  }

  if (command === 'save') {
    loadFile(`./client-data/${fileName}`)
      .then((data) => {
        const request = { command, fileName, data };
        connection.write(JSON.stringify(request));
      })
      .catch((error) => console.log(error));
  } else {
    const request = { command, fileName };
    connection.write(JSON.stringify(request));
  }
};

module.exports = { setupInput };