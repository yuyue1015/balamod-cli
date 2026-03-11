const fs = require('node:fs/promises');
const path = require('node:path');

async function readJsonFile(baseDir, fileName) {
  const filePath = path.join(baseDir, fileName);
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

module.exports = {
  readJsonFile,
};
