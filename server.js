const { parseInstruction } = require('./file-controller');
const net = require('net');
const server = net.createServer();

server.listen(3000, () => {
  console.log('server listening on port 3000...');
});

server.on('connection', (client) => {
  console.log('New client connected');
  client.write('---connected---');

  client.setEncoding('utf8');

  client.on('data', (data) => {
    parseInstruction(data)
      .then((response) => {
        client.write(response);
      })
      .catch((error) => {
        client.write(`${error.message}`);
      });
  });
});


