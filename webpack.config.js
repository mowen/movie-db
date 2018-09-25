const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src/web_ui/index.ts',
  mode: 'development',
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [
          /node_modules/,
          /src\/web_api/
        ],
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ],
      },
      {
        test: /\.tsx$/,
        exclude: [
          /node_modules/,
          /src\/web_api/
        ],
        use: [
          'babel-loader',
          'ts-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'web_ui')
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};