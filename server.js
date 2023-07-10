const { parseInstruction } = require('./requestHandler');
const net = require('net');


const server = net.createServer();
server.listen(3000, () => {
  console.log('server listening on port 3000...');
});

server.on('connection', (client) => {
  console.log('New client connected');
  const connVerification = JSON.stringify({ type: 'message', payload: '---connected---' });
  client.write(connVerification);

  client.setEncoding('utf8');

  client.on('data', (data) => {
    parseInstruction(data)
      .then((response) => {
        const responseObject = JSON.stringify({ type: 'data', payload: response });
        client.write(responseObject);
      })
      .catch((error) => {
        const errorObject = JSON.stringify({ type: 'error', payload: error.message });
        client.write(errorObject);
      });
  });
});