const { writeFile, readdir, readFile, unlink } = require('fs').promises;

const loadFile = (filePath) => {
  return readFile(`${filePath}`);
};

const saveFile = (filePath, data) => {
  return writeFile(`${filePath}`, data, { flag: 'wx' });
};

const listFiles = (filePath) => {
  return readdir(filePath);
};

const deleteFile = (filePath) => {
  return unlink(filePath);
};

module.exports = { deleteFile, listFiles, loadFile, saveFile };