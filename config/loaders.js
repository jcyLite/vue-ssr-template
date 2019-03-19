const isProd = process.env.NODE_ENV === 'production';
const ExtractTextPlugin=require('extract-text-webpack-plugin');
module.exports = [
	{
		test: /\.vue$/,
		loader: 'vue-loader',
		options: {
			compilerOptions: {
				preserveWhitespace: false
			}
		}
	},
	{
		test: /\.html|.tpl|.md$/,
		use: {
			'loader': "jcy-loader"
		}
	},
	{
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
	},
	{
		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		loader: 'url-loader',
		options: {
			limit: 1000,
			outputPath: "./fonts",
			publicPath: "../fonts",
			name: "[name].[ext]"
		}
	},
	{
		test: /\.(png|jpg|gif|svg)$/,
		loader: 'url-loader',
		options: {
			limit: 10000,
			name: '[name].[ext]?[hash]'
		}
	},
	{
		test:/\.(styl|stylus)$/,
		use: isProd ?
			ExtractTextPlugin.extract({
				use: [{
						loader: 'css-loader',
						options: {
							minimize: true
						}
					},
					'stylus-loader'
				],
				fallback: 'vue-style-loader'
			}) :
			['vue-style-loader', 'css-loader', 'stylus-loader']
	},
	{
		test: /\.less$/,
		use: isProd ?
			ExtractTextPlugin.extract({
				use: [{
						loader: 'css-loader',
						options: {
							minimize: true
						}
					},
					'less-loader'
				],
				fallback: 'vue-style-loader'
			}) :
			['vue-style-loader', 'css-loader', 'less-loader']
	}
]