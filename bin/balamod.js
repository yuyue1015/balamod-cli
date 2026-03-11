#!/usr/bin/env node

const path = require('node:path');
const { getCommand, commands } = require('../src/cli');

function parseArgs(argv) {
  const [commandName, ...args] = argv;
  const options = {};

  for (let i = 0; i < args.length; i += 1) {
    const token = args[i];
    if (!token.startsWith('--')) continue;

    const key = token.slice(2);
    const next = args[i + 1];
    const value = !next || next.startsWith('--') ? true : next;
    options[key] = value;
    if (value !== true) i += 1;
  }

  return { commandName, options };
}

function printHelp() {
  console.log('balamod <command> [--options]');
  console.log('Commands:');
  for (const command of commands.values()) {
    console.log(`  - ${command.name}: ${command.description}`);
  }
  console.log('Global options:');
  console.log('  --registry-dir <path>   Controlled registry directory (default: ./src/data)');
}

async function main() {
  const { commandName, options } = parseArgs(process.argv.slice(2));

  if (!commandName || commandName === 'help' || commandName === '--help') {
    printHelp();
    return;
  }

  const command = getCommand(commandName);
  if (!command) {
    console.error(`Unknown command: ${commandName}`);
    printHelp();
    process.exitCode = 1;
    return;
  }

  const registryDir = options['registry-dir']
    ? path.resolve(options['registry-dir'])
    : path.resolve(process.cwd(), 'src/data');

  const payload = {
    query: options.query,
    question: options.question,
    modId: options.mod,
    packId: options.pack,
    targets: options.targets ? String(options.targets).split(',').filter(Boolean) : [],
    registryDir,
  };

  try {
    const result = await command.run(payload);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

main();
