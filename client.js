const net = require('net');
const { saveFile } = require('./file-controller');
const { HOST, PORT } = require('./constants');

const connect = () => {
  const conn = net.createConnection({
    'host': HOST,
    'port': PORT
  });

  conn.setEncoding('utf8');

  conn.on('data', (data) => {
    const parsed = JSON.parse(data);
    if (parsed.type === 'data') {
      const path = `./client-data/${parsed.payload.fileName}`;
      console.log(parsed);
      const buffer = Buffer.from(parsed.payload.file.data, 'utf-8');
      return saveFile(path, buffer)
        .then(() => console.log(`${path} successfully received`))
        .catch((err) => console.log(`${err.message}`));
    }
    return console.log(parsed.payload);
  });
  conn.on('end', () => console.log('---disconnected---'));

  return conn;
};

module.exports = { connect };