const { writeFile, readFile } = require('fs').promises;

const parseInstruction = (instruction) => {
  const [command, fileName, data] = [...instruction.split(' ')];

  return new Promise((resolve, reject) => {
    if (command === 'load') {
      resolve(loadFile(fileName));
    }

    if (command === 'save') {
      resolve(saveFile(fileName, data)
        .then(() => `${fileName} successfully saved`)
        .catch((err) => `${err.message}`));
    }
    reject(`unknown command: ${instruction}`);
  });
};

const loadFile = (fileName) => {
  return readFile(`./server-data/${fileName}`);
};

const saveFile = (fileName, data) => {
  return writeFile(`./server-data/${fileName}`, data, { 'flag': 'wx' });
};

module.exports = { parseInstruction, writeFile, readFile };