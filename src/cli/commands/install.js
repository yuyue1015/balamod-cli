const { ControlledInstaller } = require('../../core/installer/controlled-installer');

module.exports = {
  name: 'install',
  description: 'Install a mod only if it exists in controlled registry.',
  async run({ modId, registryDir }) {
    const installer = new ControlledInstaller(registryDir);
    return installer.installMod(modId);
  },
};
