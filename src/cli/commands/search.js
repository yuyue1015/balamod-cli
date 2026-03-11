const { RegistryReader } = require('../../core/registry/registry-reader');

module.exports = {
  name: 'search',
  description: 'Search mods from controlled registry only.',
  async run({ query, registryDir }) {
    const reader = new RegistryReader(registryDir);
    const mods = await reader.readMods();
    const keyword = String(query || '').toLowerCase();

    return mods.filter((mod) => {
      if (!keyword) return true;
      return (
        mod.id.toLowerCase().includes(keyword) ||
        mod.name.toLowerCase().includes(keyword)
      );
    });
  },
};
