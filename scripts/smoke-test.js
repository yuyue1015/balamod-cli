const path = require('node:path');
const assert = require('node:assert/strict');

const { getCommand } = require('../src/cli');

async function run() {
  const registryDir = path.resolve(__dirname, '../src/data');

  const search = getCommand('search');
  const results = await search.run({ query: 'example', registryDir });
  assert.equal(results.length, 1);
  assert.equal(results[0].id, 'example-mod');

  const install = getCommand('install');
  const plannedMod = await install.run({ modId: 'example-mod', registryDir });
  assert.equal(plannedMod.type, 'mod');

  const installPack = getCommand('install-pack');
  const plannedPack = await installPack.run({ packId: 'starter-pack', registryDir });
  assert.equal(plannedPack.type, 'pack');
  assert.deepEqual(plannedPack.mods, ['example-mod']);

  let blocked = false;
  try {
    await install.run({ modId: 'outside-mod', registryDir });
  } catch (error) {
    blocked = /禁止安装 registry 外 mod/.test(error.message);
  }
  assert.equal(blocked, true);

  console.log('smoke-test passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
