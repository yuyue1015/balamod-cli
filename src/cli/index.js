const searchCommand = require('./commands/search');
const askCommand = require('./commands/ask');
const planCommand = require('./commands/plan');
const installCommand = require('./commands/install');
const installPackCommand = require('./commands/install-pack');
const updateRegistryCommand = require('./commands/update-registry');

const commands = new Map([
  [searchCommand.name, searchCommand],
  [askCommand.name, askCommand],
  [planCommand.name, planCommand],
  [installCommand.name, installCommand],
  [installPackCommand.name, installPackCommand],
  [updateRegistryCommand.name, updateRegistryCommand],
]);

function getCommand(name) {
  return commands.get(name);
}

module.exports = {
  commands,
  getCommand,
};
