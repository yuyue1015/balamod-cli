module.exports = {
  name: 'update-registry',
  description: 'Update controlled registry cache (source: yuyue1015/balamod-registry).',
  async run() {
    return {
      source: 'yuyue1015/balamod-registry',
      note: '第一版仅提供命令骨架，后续补齐拉取与签名校验流程。',
    };
  },
};
