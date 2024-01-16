const fs = require('fs');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolderPath, (error, fileAndFolders) => {
  if (error) {
    throw error;
  }

  fileAndFolders.forEach((element) => {
    const elementPath = path.resolve(secretFolderPath, element);
    fs.stat(elementPath, (error, stats) => {
      if (error) {
        throw error;
      }

      if (stats.isFile()) {
        const pathElements = path.parse(elementPath);
        const name = pathElements.name;
        const extension = pathElements.ext.replace('.', '');
        console.log(`${name} - ${extension} - ${stats.size} bytes`);
      }
    });
  });
});
