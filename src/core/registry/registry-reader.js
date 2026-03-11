const { readJsonFile } = require('../../providers/filesystem/json-reader');

const CONTROLLED_OWNER = 'yuyue1015';

function assertArray(data, fileName) {
  if (!Array.isArray(data)) {
    throw new Error(`${fileName} 必须是数组。`);
  }
}

function assertControlledSource(entry) {
  if (entry.owner && entry.owner !== CONTROLLED_OWNER) {
    throw new Error(`发现非受控 owner: ${entry.owner}`);
  }
}

class RegistryReader {
  constructor(registryDir) {
    this.registryDir = registryDir;
  }

  async readMods() {
    const mods = await readJsonFile(this.registryDir, 'mods.json');
    assertArray(mods, 'mods.json');
    mods.forEach(assertControlledSource);
    return mods;
  }

  async readPacks() {
    const packs = await readJsonFile(this.registryDir, 'packs.json');
    assertArray(packs, 'packs.json');
    packs.forEach(assertControlledSource);
    return packs;
  }
}

module.exports = {
  RegistryReader,
  CONTROLLED_OWNER,
};
