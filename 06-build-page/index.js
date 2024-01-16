const fsPromises = require('fs').promises;
const path = require('path');
const mergeCssFiles = require('../05-merge-styles');

async function buildPage() {
  const distPath = path.join(__dirname, 'project-dist');
  const stylesSourcePath = path.join(__dirname, 'styles');
  const stylesDestinationPath = path.join(distPath, 'style.css');
  await createFolder(distPath);
  await buildIndexHtml(distPath);
  await mergeCssFiles(stylesSourcePath, stylesDestinationPath);
  // TODO: copy assets
}

async function createFolder(folderPath) {
  await fsPromises.mkdir(folderPath, { recursive: true });
}

async function buildIndexHtml(distPath) {
  const templateFilePath = path.join(__dirname, 'template.html');
  const templateFileContent = await getFileContent(templateFilePath);
  let indexFileContent = '';
  let currectSymbolIndex = 0;
  const tagMatchIterator = templateFileContent.matchAll(
    new RegExp('{{.*?}}', 'g'),
  );
  for (const tagMatch of tagMatchIterator) {
    const tagWithBraces = tagMatch[0];
    const tag = tagWithBraces.slice(2, tagWithBraces.length - 2);
    const index = tagMatch.index;
    indexFileContent += templateFileContent.slice(currectSymbolIndex, index);
    indexFileContent += await getFileContent(
      path.join(__dirname, 'components', tag + '.html'),
    );
    currectSymbolIndex = index + tagWithBraces.length;
  }
  const indexFilePath = path.join(distPath, 'index.html');
  await fsPromises.writeFile(indexFilePath, indexFileContent);
}

async function getFileContent(path) {
  const fileBuffer = await fsPromises.readFile(path);
  return fileBuffer.toString();
}

buildPage().catch(console.error);
