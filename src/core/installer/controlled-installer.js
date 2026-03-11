const { RegistryReader } = require('../registry/registry-reader');

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
      status: 'planned',
      note: '第一版仅生成受控安装计划，不执行 shell 安装命令。',
    };
  }

  async installPack(packId) {
    const packs = await this.reader.readPacks();
    const pack = packs.find((item) => item.id === packId);
    if (!pack) {
      throw new Error(`禁止安装 registry 外 pack: ${packId}`);
    }

    return {
      type: 'pack',
      id: pack.id,
      status: 'planned',
      note: '第一版仅生成受控安装计划，不执行 shell 安装命令。',
    };
  }
}

module.exports = {
  ControlledInstaller,
};
