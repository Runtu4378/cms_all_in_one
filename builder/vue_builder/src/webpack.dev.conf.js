const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = ({
  paths,
}) => {
  return {
    // mode: 'development',
    mode: 'production',
    resolveLoader: {
      modules: [
        paths.MODULE_SEARCH_DIR,
        'web_loaders',
        'web_modules',
        'node_loaders',
        'node_modules',
      ],
    },
    resolve: {
      // able to get module from this project
      modules: [
        paths.MODULE_SEARCH_DIR,
        'node_modules',
      ],
    },
    externals: {
      Vue: 'window.Vue',
    },
    entry: paths.ENTRY,
    output: {
      path: paths.TEMP_DIR,
      filename: paths.OUTPUT,
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                // sourceMap: true,
                context: paths.TEMP_DIR, // 修复不同文件拥有相同[hash:base64]的bug-https://github.com/webpack-contrib/css-loader/issues/464
                localIdentName: '[local]___[hash:base64:6]',
                camelCase: true,
                // importLoaders: 2,
              },
            },
            {
              loader: 'less-loader',
            },
          ],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
      ],
    },
    plugins: [
      // 请确保引入这个插件！
      new VueLoaderPlugin(),
    ],
  }
}
