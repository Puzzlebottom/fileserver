const { loadFile, saveFile } = require('./file-controller');

const parseRequest = (request) => {
  const { command, path, fileName, data } = JSON.parse(request);

  return new Promise((resolve, reject) => {

    if (command === 'load') {
      return loadFile(`./server-data/${path}${fileName}`)
        .then((file) => {
          resolve(formatResponse('data', { fileName, file }));
        })
        .catch((error) => {
          reject(formatResponse('error', { error }));
        });
    }

    if (command === 'save') {
      return saveFile(`./server-data/${path}${fileName}`, data)
        .then(() => {
          resolve(formatResponse('message', { message: `${fileName} successfully saved` }));
        })
        .catch((error) => {
          reject(formatResponse('error', { error }));
        });
    }
    reject(formatResponse('error', { error: `Server Error: unknown command: ${command}` }));
  });
};

const formatResponse = (type, payload) => JSON.stringify({ type, payload });


module.exports = { formatResponse, parseRequest };