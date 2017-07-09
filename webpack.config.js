const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const fs = require('fs');

var uglifyJsPlugin = process.env.PROD == 1? [
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    output: {
      comments: false
    },
    compressor: {
      warnings: false
    }
  }),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
] : [];

var uglifyCssPlugin = process.env.PROD == 1? [ new OptimizeCssAssetsWebpackPlugin() ] : []

var node_modules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    node_modules[mod] = 'commonjs ' + mod;
  });

module.exports = [
  {
    externals: node_modules,
    node: {
      __filename: true,
      __dirname: true
    },
    target: 'electron-renderer',
    name: 'javascript',
    entry: path.join(__dirname, '/resources/scripts/entry.js'),
    output: {
      filename: 'app.js',
      path: path.join(__dirname, '/app/scripts')
    },
    module: {
      loaders: [
        {
          test: /\.js/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2017', 'react', 'es2015'],
            plugins: ['babel-plugin-transform-object-rest-spread', 'babel-plugin-transform-class-properties']
          }
        }
      ]
    },
    plugins: uglifyJsPlugin
  },

  {
    name: 'stylesheets',
    entry: path.join(__dirname, '/resources/styles/entry.sass'),
    output: {
      filename: 'app.css',
      path: path.join(__dirname, '/app/styles')
    },
    module: {
      loaders: [
        {
          test: /\.sass/,
          loader: ExtractTextWebpackPlugin.extract({
            use: 'css-loader?url=false!sass-loader?url=false',
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [
      new ExtractTextWebpackPlugin('app.css')
    ].concat(uglifyCssPlugin)
  }
];