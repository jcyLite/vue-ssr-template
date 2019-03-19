const path = require('path');
function resolve(dir) {
	return path.join(__dirname, '..', '..', dir)
}
module.exports = function(conf) {
	var styleLoaders = require('./style-loaders')(conf);
	var vueLoaderConfig = require('./vue-loader.conf.js')(conf)
	var loaders = [{
		test: /\.ejs$/,
		use: {
			'loader': 'ejs-loader'
		}
	}, {
		test: /\.ts$/,
		use: {
			"loader": 'ts-loader'
		}
	}, {
		test: /\.vue$/,
		loader: 'vue-loader',
		options: vueLoaderConfig
	}, {
		test: /\.html|.tpl|.md$/,
		use: {
			'loader': "jcy-loader"
		}
	},{
		test: /\.js$/,
		exclude: /node_modules/,
		use: [{
			loader: 'babel-loader',
			options: {
				presets: ['es2015'],
				plugins: [
					"transform-object-rest-spread",
					'syntax-dynamic-import',
					'transform-async-to-generator',
					'transform-regenerator',
					'transform-runtime'
				],
				"compact": false
			}
		}]
	}, {
		test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
		loader: 'url-loader',
		options: {
			limit: 1000,
			name: "images/[name].[hash:6].[ext]"
		}
	}, {
		test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
		loader: 'url-loader',
		options: {
			limit: 1000,
			name: "voice/[name].[hash:6].[ext]"
		}
	}, {
		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		loader: 'url-loader',
		options: {
			limit: 1000,
			outputPath: "./fonts",
			publicPath: "../fonts",
			name: "[name].[hash:6].[ext]"
		}
	}];
	return loaders.concat(styleLoaders);
}