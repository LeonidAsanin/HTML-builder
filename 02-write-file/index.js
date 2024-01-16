const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'output.txt');

fs.writeFile(filePath, '', (error) => {
  if (error) throw error;
});

console.log('Hello!');

process.stdin.on('data', (data) => {
  if (data.toString() === 'exit\r\n') {
    console.log('Goodbye!');
    process.exit();
  }
  fs.appendFile(filePath, data, (error) => {
    if (error) throw error;
  });
});
