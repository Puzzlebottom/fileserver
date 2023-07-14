const { saveFile } = require('./file-controller');

const handleData = (payload) => {
  let { fileName, data } = payload;
  const filePath = `./client-data/${fileName}`;
  const buffer = Buffer.from(data, 'utf-8');
  saveFile(filePath, buffer)
    .then(() => console.log(`${fileName} successfully received\n`))
    .catch((err) => console.log(`${err.message}`));
};

const handleError = (payload) => console.log(payload.error);

const handleMessage = (payload) => console.log(payload.message);


module.exports = { handleData, handleError, handleMessage };