const fsPromises = require('fs').promises;
const path = require('path');

const filesFolderPath = path.join(__dirname, 'files');
const filesCopyFolderPath = path.join(__dirname, 'files-copy');

async function copyDir(sourcePath, destinationPath) {
  await fsPromises.mkdir(destinationPath, { recursive: true });
  await clearFolder(destinationPath);
  await copyDirContent(sourcePath, destinationPath);
}

async function clearFolder(folderPath) {
  const copyFiles = await fsPromises.readdir(folderPath);
  for (const fileName of copyFiles) {
    const folderChildPath = path.resolve(folderPath, fileName);
    await fsPromises.rm(folderChildPath, { recursive: true });
  }
}

async function copyDirContent(sourcePath, destinationPath) {
  const files = await fsPromises.readdir(sourcePath);
  for (const fileName of files) {
    const source = path.join(sourcePath.toString(), fileName);
    const destination = path.join(destinationPath.toString(), fileName);
    const stat = await fsPromises.stat(source);
    if (stat.isFile()) {
      await fsPromises.copyFile(source, destination);
    } else {
      await copyDir(source, destination);
    }
  }
}

copyDir(filesFolderPath, filesCopyFolderPath).catch(console.error);

module.exports = copyDir;
