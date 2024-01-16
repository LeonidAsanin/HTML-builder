const fsPromises = require('fs').promises;
const path = require('path');

async function mergeCssFiles() {
  const bundleFilePath = path.join(__dirname, 'project-dist', 'bundle.css');
  const stylesFolderPath = path.join(__dirname, 'styles');

  await fsPromises.writeFile(bundleFilePath, '');

  const styleFiles = await fsPromises.readdir(stylesFolderPath);

  for (const styleFile of styleFiles) {
    const filePath = path.join(stylesFolderPath, styleFile);
    const fileExtension = path.extname(styleFile);
    const stat = await fsPromises.stat(filePath);
    if (!stat.isFile() || fileExtension !== '.css') {
      continue;
    }
    const content = await fsPromises.readFile(filePath, { encoding: 'utf8' });
    await fsPromises.appendFile(bundleFilePath, content);
  }
}

mergeCssFiles().catch(console.error);
