const { writeFile, readdir, readFile, unlink } = require('fs').promises;

const loadFile = (path) => {
  return readFile(`${path}`);
};

const saveFile = (path, data) => {
  return writeFile(`${path}`, data, { flag: 'wx' });
};

const listFiles = (path) => {
  return readdir(path);
};

const deleteFile = (path) => {
  return unlink(path);
};

module.exports = { deleteFile, listFiles, loadFile, saveFile };