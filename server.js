const { formatResponse, parseRequest } = require('./requestHandler');
const net = require('net');


const server = net.createServer();
server.listen(3000, () => {
  console.log('server listening on port 3000...');
});

server.on('connection', (client) => {
  client.setEncoding('utf8');
  client.write(formatResponse('message', { message: '---connected---' }));
  console.log('New client connected');

  client.on('data', (data) => {
    parseRequest(data)
      .then((response) => client.write(response))
      .catch((error) => client.write(error));
  });
});