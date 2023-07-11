const { writeFile, readFile } = require('fs').promises;

const loadFile = (path) => {
  return readFile(`${path}`);
};

const saveFile = (path, data) => {
  return writeFile(`${path}`, data, { flag: 'wx' });
};

module.exports = { loadFile, saveFile };