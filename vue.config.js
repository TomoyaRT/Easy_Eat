module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Easy Eat商城';
        return args;
      });
  },
  // 部屬專案的 URL
  publicPath: '/Easy_Eat/dist/'
}