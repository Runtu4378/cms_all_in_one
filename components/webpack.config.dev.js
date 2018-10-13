const path = require('path')
const webpack = require('webpack')

const ROOT = __dirname
const HOST = 'localhost'
const PORT = '3000'
const SRC = path.resolve(ROOT, 'src')
const DLL_DIR = path.resolve(SRC, 'dll')

module.exports = {
  entry: {
    components: path.resolve(SRC, 'components/index.js'),
    templates: path.resolve(SRC, 'templates/index.js'),
  },
  output: {
    path: path.resolve(ROOT, 'dist'),
    filename: '[name].js',
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: require.resolve(path.resolve(DLL_DIR, 'cms')),
        use: [{
            loader: 'expose-loader',
            options: 'cms'
        }]
      },
      {
        test: /\.art$/,
        loader: 'art-template-loader',
        options: {},
      },
      {
        test: /\.js$/,
        include: [
          SRC,
        ],
        loader: 'babel-loader',
        options: {
          'presets': [
            ['env', { 'loose': true }],
            'stage-0',
          ],
        },
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    // 配置 dll
    // new webpack.DllReferencePlugin({
    //   // context: ROOT,
    //   manifest: path.resolve(DLL_DIR, './manifest.json'),
    //   // name: 'cms',
    //   // name: './cms.js',
    //   scope: 'cms',
    //   // sourceType: 'commonjs2'
    // }),
  ],
  // 使用 source-map
  devtool: 'cheap-source-map',
  // 对 webpack-dev-server 进行配置
  devServer: {
    contentBase: './dist',
    // 设置localhost端口
    host: HOST,
    port: PORT,
    // 自动打开浏览器
    // open: true,
    hot: true,
    quiet: true,
  },
  mode: 'development',
  target: 'web',
  context: ROOT,
}
