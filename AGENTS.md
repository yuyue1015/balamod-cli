# AGENTS.md

## Project
This repository is `balamod-cli`, a controlled Balatro mod CLI.

## Core rules
- Only install mods listed in the controlled registry.
- Do not search the public web for arbitrary mods.
- AI is only used for request understanding and recommendation explanation.
- AI must not directly execute installation shell commands assembled from model output.
- Installation must be performed only by controlled code paths in this repo.

## GitHub ecosystem
- Controlled owner: `yuyue1015`
- Registry repository: `yuyue1015/balamod-registry`
- Mod sources are independent fork repositories under `yuyue1015`
- Do not assume any mod outside this controlled ecosystem is installable

## Desired repository structure
```text
src/
  cli/
    commands/
  core/
    ai/
    planner/
    installer/
    registry/
    doctor/
    rollback/
  providers/
    github/
    filesystem/
  schemas/
  data/
  state/
