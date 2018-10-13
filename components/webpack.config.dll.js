const path = require('path')
const webpack = require('webpack')

const ROOT = __dirname
const SRC = path.resolve(ROOT, 'src')
const DLL_DIR = path.resolve(SRC, 'dll')

module.exports = {
  entry: {
    cms: [
      // 'art-template/lib/template-web',
      'art-template/lib/runtime',
    ],
  },
  output: {
    path: DLL_DIR,
    filename: '[name].js',
    library: '[name]', // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    // libraryTarget: "commonjs2",
  },
  module: {
    rules: [
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
    new webpack.DllPlugin({
      path: path.resolve(DLL_DIR, 'manifest.json'), // 本Dll文件中各模块的索引，供DllReferencePlugin读取使用
      name: '[name]',  // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与参数output.library保持一致
      context: ROOT, // 指定一个路径作为上下文环境，需要与DllReferencePlugin的context参数保持一致，建议统一设置为项目根目录
    }),
    // // 注册全局变量
    // new webpack.ProvidePlugin({
    //   'cms': 'cms',
    // }),
  ],
  // 使用 source-map
  devtool: false,
  mode: 'production',
  target: 'web',
  context: ROOT,
}
