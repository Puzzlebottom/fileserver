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

  const validCommands = ['delete', 'list', 'load', 'save'];

  let [command, path, data] = [...line.split(' ')];
  let fileName;

  if (!validCommands.includes(command)) {
    return console.log(`Client Error: unknown command: ${command}`);
  }

  if (path) {
    path = path.split('/');
    [fileName] = [...path.slice(-1)];
    path.pop();
    path = `${[path.join('/')]}/`;
  }

  if (path === '/') path = '';

  const request = {};

  if (command) request['command'] = command;
  if (path) request['path'] = path;
  if (fileName) request['fileName'] = fileName;
  if (data) request['data'] = data;
  console.log('REQUEST: ', request);

  connection.write(JSON.stringify(request));
};

module.exports = { setupInput };