const { saveFile } = require('./file-controller');

const handleData = (payload) => {
  const { fileName, file } = payload;
  const path = `./client-data/${fileName}`;
  const buffer = Buffer.from(file.data, 'utf-8');
  saveFile(path, buffer)
    .then(() => console.log(`${path} successfully received`))
    .catch((err) => console.log(`${err.message}`));
};

const handleError = (payload) => console.log(payload.error);

const handleMessage = (payload) => console.log(payload.message);


module.exports = { handleData, handleError, handleMessage };