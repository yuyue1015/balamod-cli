module.exports = {
  name: 'ask',
  description: 'Interpret request and explain recommendations without external web search.',
  async run({ question }) {
    return {
      question,
      note: 'AI 仅用于请求理解与推荐解释，不执行安装命令。',
      webSearch: false,
    };
  },
};
