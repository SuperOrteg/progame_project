const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template : './dist/index.html',
  filename : 'index.html',
  inject : 'body'
})

const config = {
  mode: 'development',
  watch: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    static: './dist',
  },
  plugins: [HtmlWebpackPluginConfig],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
          test: /\.svg$/,
          oneOf: [
              {
                  include: path.resolve(__dirname, '../node_modules/package-name/'),
                  use: 'svg-inline-loader'
              },
              {
                  exclude: path.resolve(__dirname, '../node_modules/package-name/'),
                  use: 'url-loader'
              }
          ]
      },
      {
          test: /\.(ttf|eot|woff|woff2|svg)$/,
          use: {
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/'
              },
          },
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;