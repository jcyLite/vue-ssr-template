const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');
const loaders=require('./loaders.js');
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
   alias: {
			'%': path.resolve(__dirname, '../public'),
			'$': path.resolve(__dirname, '../public'),
			'@': path.resolve(__dirname, '../src'),
			'vue$': 'vue/dist/vue.esm.js'
		},
    extensions: ['.js', '.less', '.tpl', '.json', '.css', '.vue']
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: loaders
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        })
      ]
    : [
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin()
      ]
}
