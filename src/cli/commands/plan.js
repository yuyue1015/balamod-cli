module.exports = {
  name: 'plan',
  description: 'Create an install plan constrained to controlled registry entries.',
  async run({ targets = [] }) {
    return {
      targets,
      policy: 'registry-only',
      steps: [
        '读取受控 registry',
        '校验目标 mod/pack 均在 registry 中',
        '生成安装计划（不直接执行 shell）',
      ],
    };
  },
};
