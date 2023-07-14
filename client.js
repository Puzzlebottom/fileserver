const { HOST, PORT } = require('./constants');
const net = require('net');
const { handleData, handleError, handleMessage } = require('./responseHandler');


const connect = () => {
  const conn = net.createConnection({
    host: HOST,
    port: PORT
  });

  conn.setEncoding('utf8');

  conn.on('data', (data) => {
    const parsed = JSON.parse(data);
    const { type, payload } = parsed;

    if (type === 'data') return handleData(payload);
    if (type === 'message') return handleMessage(payload);
    if (type === 'error') return handleError(payload);

    console.log(`Unknown server response type: ${data}\n`);
  });

  conn.on('end', () => {
    console.log('---disconnected---\n');
  });
  return conn;
};

module.exports = { connect };