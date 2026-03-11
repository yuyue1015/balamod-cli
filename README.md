# balamod-cli

受控 Balatro Mod CLI（第一版骨架）。

## 核心约束
- 仅允许安装受控 registry（`yuyue1015/balamod-registry`）中的 mod/pack。
- 不接入全网搜索。
- AI 仅用于理解请求与解释推荐，不直接执行安装 shell。

## 快速开始
```bash
npm run check
npm run test:smoke
node bin/balamod.js help
node bin/balamod.js search --query example --registry-dir src/data
node bin/balamod.js install --mod example-mod --registry-dir src/data
```
