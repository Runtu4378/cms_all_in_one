const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const ROOT = __dirname
const HOST = 'localhost'
const PORT = '3000'
const SRC = path.resolve(ROOT, 'src')
const prod = true
// const prod = false

module.exports = {
  entry: {
    box: path.resolve(SRC, 'components/box/index.js'),
    card: path.resolve(SRC, 'components/card/index.js'),
  },
  output: {
    path: path.resolve(ROOT, 'dist_com'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: "this",
  },
  module: {
    rules: [
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
  devtool: prod ? false : 'inline-source-map',
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
  optimization: {
    // minimize: false,
    minimizer: prod ? [
      // 源码进行压缩并转码
      new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        sourceMap: false,
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            properties: false,
            warnings: false,
          },
          output: {
            beautify: false,
            quote_keys: true,
          },
          mangle: {
            keep_fnames: true,
          },
          ie8: true,
          safari10: true,
        },
      }),
    ] : false,
  },
  mode: prod ? 'production' : 'development',
  target: 'web',
  context: ROOT,
}
