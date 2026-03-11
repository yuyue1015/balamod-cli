const { ControlledInstaller } = require('../../core/installer/controlled-installer');

module.exports = {
  name: 'install-pack',
  description: 'Install a mod pack only if it exists in controlled registry.',
  async run({ packId, registryDir }) {
    const installer = new ControlledInstaller(registryDir);
    return installer.installPack(packId);
  },
};
