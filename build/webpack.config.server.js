const path = require('path')
const baseConfig = require('./webpack.config.base')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const isDev = process.env.NODE_ENV === 'development'

const plugins = [
  new MiniCssExtractPlugin({
    filename: 'style.[contenthash:8].css',
    chunkFilename: 'style.[contenthash:8].css'
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"'
  })
]

if (isDev) {
  plugins.push(new VueServerPlugin())
}

let config

config = merge(baseConfig, {
  target: 'node',
  devtool: 'source-map',
  mode: 'production',
  entry: path.resolve(__dirname, '../client/server-entry.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.resolve(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?importLoaders=1',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins
})

module.exports = config
