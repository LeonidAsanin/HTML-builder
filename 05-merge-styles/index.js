const fsPromises = require('fs').promises;
const path = require('path');

const stylesFolderPath = path.join(__dirname, 'styles');
const bundleFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeCssFiles(sourceFolderPath, destinationFilePath) {
  await fsPromises.writeFile(destinationFilePath, '');

  const styleFiles = await fsPromises.readdir(sourceFolderPath);

  for (const styleFile of styleFiles) {
    const filePath = path.join(sourceFolderPath, styleFile);
    const fileExtension = path.extname(styleFile);
    const stat = await fsPromises.stat(filePath);
    if (!stat.isFile() || fileExtension !== '.css') {
      continue;
    }
    const content = await fsPromises.readFile(filePath, { encoding: 'utf8' });
    await fsPromises.appendFile(destinationFilePath, content);
  }
}

mergeCssFiles(stylesFolderPath, bundleFilePath).catch(console.error);
