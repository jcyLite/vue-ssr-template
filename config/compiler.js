const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const loaders = require('./loaders/index.js');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isDev = process.env.NODE_ENV === 'development';
const PostCompilePlugin = require('webpack-post-compile-plugin')
function dist(odist) {
	if(odist){
		return '../'+odist
	}else{
		return process.env.OUTPUT == 'cordova'?'../cordova/www':'../dist';
	}
}
module.exports = function(src,odist) {
	return {
		target: 'web',
		entry: {
			index: ['./src/index.js']
		}, //入口JS
		output: {
			filename: "./js/[name].js",
			path: path.resolve(__dirname, '../fxwz')
		},
		resolve: {
			alias: {
				'%': path.resolve(__dirname, '../public'),
				'$': path.resolve(__dirname, '../public'),
				'@': path.resolve(__dirname, '../' + src),
				'vue$': 'vue/dist/vue.esm.js'
			},
			// 省略后缀
			extensions: ['.js', '.less', '.tpl', '.json', '.css', '.vue']
		},
		module: {
			noParse: /es6-promise\.js$/,
			rules: loaders
		},
		plugins: [
			new PostCompilePlugin(),
			new HtmlWebpackPlugin({
				template: './' + src + '/index.html', // 模板文件           
				filename: 'index.html',
				env: isDev ? 'development' : 'production',
				chunks:['vendor','utils','index'],
				chunkSortMode:'manual',
				inject:true,
				minify: {
					minimize: false,
					removeConments: false, //remove the note in html
					collapseWhitespace: false // delete the white and space
				}
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV)
			}),
			new VueLoaderPlugin(),
			new CleanWebpackPlugin(['dist', 'build'], {
				verbose: false
			})
		]
	}
}