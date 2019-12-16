module.exports = {
  configureWebpack:{
    resolve: {
      //配置别名 省略../../ @代表src，cls3默认配置src为@
      alias: {
        'assets':'@assets',
        'common':'@common',
        'components':'@components',
        'network':'@network',
        'views':'@views',
      }
    },
  }
}


