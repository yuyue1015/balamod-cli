const { readJsonFile } = require('../../providers/filesystem/json-reader');

const CONTROLLED_OWNER = 'yuyue1015';
const CONTROLLED_REGISTRY_REPO = 'yuyue1015/balamod-registry';

function assertArray(data, fileName) {
  if (!Array.isArray(data)) {
    throw new Error(`${fileName} 必须是数组。`);
  }
}

function assertStringField(entry, fieldName, typeName) {
  if (!entry[fieldName] || typeof entry[fieldName] !== 'string') {
    throw new Error(`${typeName} 缺少必填字段: ${fieldName}`);
  }
}

function assertControlledOwner(entry) {
  if (entry.owner !== CONTROLLED_OWNER) {
    throw new Error(`发现非受控 owner: ${entry.owner || 'unknown'}`);
  }
}

function assertControlledRepo(entry) {
  if (!entry.repo) return;
  if (!entry.repo.startsWith(`${CONTROLLED_OWNER}/`)) {
    throw new Error(`发现非受控 repo: ${entry.repo}`);
  }
}

function validateMod(mod) {
  assertStringField(mod, 'id', 'mod');
  assertStringField(mod, 'name', 'mod');
  assertControlledOwner(mod);
  assertControlledRepo(mod);
}

function validatePack(pack) {
  assertStringField(pack, 'id', 'pack');
  assertStringField(pack, 'name', 'pack');
  assertControlledOwner(pack);
  if (!Array.isArray(pack.mods)) {
    throw new Error(`pack(${pack.id}) 的 mods 必须是数组`);
  }
}

class RegistryReader {
  constructor(registryDir) {
    this.registryDir = registryDir;
  }

  async readMods() {
    const mods = await readJsonFile(this.registryDir, 'mods.json');
    assertArray(mods, 'mods.json');
    mods.forEach(validateMod);
    return mods;
  }

  async readPacks() {
    const packs = await readJsonFile(this.registryDir, 'packs.json');
    assertArray(packs, 'packs.json');
    packs.forEach(validatePack);
    return packs;
  }
}

module.exports = {
  RegistryReader,
  CONTROLLED_OWNER,
  CONTROLLED_REGISTRY_REPO,
};
