const { deleteFile, listFiles, loadFile, saveFile } = require('./file-controller');

const parseRequest = (request) => {
  let { command, fileName, data } = JSON.parse(request);

  return new Promise((resolve, reject) => {

    if (command === 'load') {
      return loadFile(`./server-data/${fileName}`)
        .then((data) => {
          resolve(formatResponse('data', { fileName, data }));
        })
        .catch((error) => reject(formatResponse('error', { error })));
    }

    if (command === 'save') {
      const buffer = Buffer.from(data, 'utf-8');
      return saveFile(`./server-data/${fileName}`, buffer)
        .then(() => resolve(formatResponse('message', { message: `${fileName} successfully saved\n` })))
        .catch((error) => reject(formatResponse('error', { error })));
    }

    if (command === 'list') {
      return listFiles('./server-data')
        .then((files) => {
          let message = '\nListing server contents...\n';
          for (const file of files) {
            message += `${file}\n`;
          }
          resolve(formatResponse('message', { message }));
        })
        .catch((error) => reject(formatResponse('error', { error })));
    }

    if (command === 'delete') {
      return deleteFile(`./server-data/${fileName}`)
        .then(() => {
          resolve(formatResponse('message', { message: `${fileName} successfully removed\n` }));
        })
        .catch((error) => reject(formatResponse('error', { error })));
    }

    reject(formatResponse('error', { error: `Server Error: unknown command: ${command}\n` }));
  });
};

const formatResponse = (type, payload) => JSON.stringify({ type, payload });


module.exports = { formatResponse, parseRequest };