const { CONTROLLED_OWNER, CONTROLLED_REGISTRY_REPO } = require('../../core/registry/registry-reader');

function isControlledRepo(fullName) {
  return typeof fullName === 'string' && fullName.startsWith(`${CONTROLLED_OWNER}/`);
}

module.exports = {
  controlledOwner: CONTROLLED_OWNER,
  registryRepo: CONTROLLED_REGISTRY_REPO,
  isControlledRepo,
};
