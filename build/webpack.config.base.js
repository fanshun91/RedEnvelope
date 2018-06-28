const path = require('path')
const createVueloaderOptions = require('./vueloader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  mode: process.env.NODE_ENV || 'production',
  entry: path.resolve(__dirname, '../client/client-entry.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, '../public'),
    publicPath: 'http://127.0.0.1:8090/public/'
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules|public/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: createVueloaderOptions(isDev)
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif|eot|ttf|woff|font)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resources/[path].[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
