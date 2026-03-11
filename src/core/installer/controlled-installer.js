const { RegistryReader, CONTROLLED_REGISTRY_REPO } = require('../registry/registry-reader');

class ControlledInstaller {
  constructor(registryDir) {
    this.reader = new RegistryReader(registryDir);
  }

  async installMod(modId) {
    const mods = await this.reader.readMods();
    const mod = mods.find((item) => item.id === modId);
    if (!mod) {
      throw new Error(`禁止安装 registry 外 mod: ${modId}`);
    }

    return {
      type: 'mod',
      id: mod.id,
      source: CONTROLLED_REGISTRY_REPO,
      status: 'planned',
      note: '第一版仅生成受控安装计划，不执行 shell 安装命令。',
    };
  }

  async installPack(packId) {
    const [mods, packs] = await Promise.all([this.reader.readMods(), this.reader.readPacks()]);
    const pack = packs.find((item) => item.id === packId);
    if (!pack) {
      throw new Error(`禁止安装 registry 外 pack: ${packId}`);
    }

    const modSet = new Set(mods.map((item) => item.id));
    const missing = pack.mods.filter((modId) => !modSet.has(modId));
    if (missing.length > 0) {
      throw new Error(`pack(${pack.id}) 引用了 registry 中不存在的 mod: ${missing.join(', ')}`);
    }

    return {
      type: 'pack',
      id: pack.id,
      source: CONTROLLED_REGISTRY_REPO,
      mods: pack.mods,
      status: 'planned',
      note: '第一版仅生成受控安装计划，不执行 shell 安装命令。',
    };
  }
}

module.exports = {
  ControlledInstaller,
};
