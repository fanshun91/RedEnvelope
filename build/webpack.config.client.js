const path = require('path')
const baseConfig = require('./webpack.config.base')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HTMLPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const isDev = process.env.NODE_ENV === 'development'

const devServer = {
  host: '0.0.0.0',
  port: 8090,
  overlay: {
    errors: true
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: true,
  hot: true
}

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.resolve(__dirname, 'index.html')
  }),
  new VueClientPlugin()
]

let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader/url',
            'file-loader'
          ]
        },
        {
          test: /\.styl$/,
          use: [
            'vue-style-loader',
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
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.resolve(__dirname, '../client/client-entry.js')
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
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
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: false,
        cacheGroups: {
          vendor: {
            name: 'vendor',
            chunks: 'initial',
            priority: -10,
            reuseExistingChunk: false,
            test: /node_modules\/(.*)\.js/
          },
          styles: {
            name: 'styles',
            test: /\.(styl|css)$/,
            chunks: 'all',
            minChunks: 1,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      },
      runtimeChunk: {
        name: 'manifest'
      },
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: 'app.[contenthash:8].css',
        chunkFilename: 'style.[contenthash:8].css'
      }),
      new webpack.NamedChunksPlugin()
    ])
  })
}

module.exports = config
