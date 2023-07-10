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
  stdin.setEncoding('utf8');

  rl.on('line', (line) => inputHandler(line));

  stdin.resume();

  return stdin;
};

// const closeInput = () => readline.close();

const inputHandler = (line) => {

  const validCommands = ['load', 'save'];

  let [command, path, data] = [...line.split(' ')];
  let fileName;

  if (!validCommands.includes(command)) {
    return console.log(`Client Error: unknown command: ${command}`); // => this whole thing is inelegant
  }

  if (path) {
    path = path.split('/');
    [fileName] = [...path.slice(-1)];
    path.pop();
    path = `${[path.join('/')]}/`;
  }

  if (path === '/') path = '';

  const request = { command, path, fileName, data };

  connection.write(JSON.stringify(request));
};

module.exports = { setupInput };