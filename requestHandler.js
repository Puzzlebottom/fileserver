const { loadFile, saveFile } = require('./file-controller');

const parseRequest = (instruction) => {
  const { command, path, fileName, data } = JSON.parse(instruction);

  return new Promise((resolve, reject) => {

    if (command === 'load') {
      return loadFile(`./server-data/${path}${fileName}`)
        .then((file) => {
          resolve({ fileName, file });
        })
        .catch((err) => `${err.message}`);
    }

    if (command === 'save') {
      resolve(saveFile(`./server-data/${path}${fileName}`, data)
        .then(() => `${fileName} successfully saved`)
        .catch((err) => `${err.message}`));
    }

    reject(new Error(`Server Error: unknown command: ${command}`));
  });
};

module.exports = { parseRequest };