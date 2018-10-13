import webpack from 'webpack';

export default function (webpackConfig) {
  // 注册全局变量
  webpackConfig.plugins.push(
    // new webpack.ProvidePlugin({
    //   'cms': 'expose-loader?cms!../../components/src/dll/cms.js',
    // }),
  )

  return webpackConfig
};
