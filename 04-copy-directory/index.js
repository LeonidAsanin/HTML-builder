const fsPromises = require('fs').promises;
const path = require('path');

async function copyDir() {
  const filesFolderPath = path.join(__dirname, 'files');
  const filesCopyFolderPath = path.join(__dirname, 'files-copy');

  await fsPromises.mkdir(filesCopyFolderPath, { recursive: true });
  await clearFolder(filesCopyFolderPath);
  await copyFiles(filesFolderPath, filesCopyFolderPath);
}

async function clearFolder(folderPath) {
  const copyFiles = await fsPromises.readdir(folderPath);
  for (const fileName of copyFiles) {
    await fsPromises.unlink(path.resolve(folderPath, fileName));
  }
}
async function copyFiles(sourcePath, destinationPath) {
  const files = await fsPromises.readdir(sourcePath);
  for (const fileName of files) {
    const source = sourcePath.toString() + '\\' + fileName;
    const destination = destinationPath.toString() + '\\' + fileName;
    await fsPromises.copyFile(source, destination);
  }
}

copyDir().catch(console.error);
