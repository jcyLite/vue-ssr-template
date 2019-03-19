const path = require('path');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const isDev=process.env.NODE_ENV==='development';
exports.cssLoaders = function(options,conf) {
	options = options || {};
	var cssLoader = {
		loader: 'css-loader',
		options: {
			sourceMap: options.sourceMap,
			minimize: true
		}
	}
	var postcssLoader = {
		loader: 'postcss-loader',
		options: {
			sourceMap: options.sourceMap,
			plugins: (loader) => [
				require('autoprefixer')()
			]
		}
	}
	
	var px2remLoader = {
	    loader: 'px2rem-loader',
	    options: {
	      remUnit: conf.rem//设计稿宽度/10
	    }
	 };
	
	// generate loader string to be used with extract text plugin
	function generateLoaders(loader, loaderOptions) {
		const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
		if(!isDev){
			loaders.unshift({
				loader:MiniCssExtractPlugin.loader,
				options:{
					publicPath:'../'
				}
			});
		}
		if(conf.rem){
			loaders.push(px2remLoader);
		}
		if(loader) {
			loaders.push({
				loader: loader + '-loader',
				options: Object.assign({}, loaderOptions, {
					sourceMap: options.sourceMap
				})
			})
		}

		// Extract CSS when that option is specified
		// (which is the case during production build)
		return ['vue-style-loader'].concat(loaders)	
//			return ExtractTextPlugin.extract({
//				use: loaders,
//				publicPath:'../', 
//				fallback: 'vue-style-loader'
//			})
//		}
		/*
		 * for webpack 4.16 we don't use extracttextplugin any more
		 * we use minicssextractplugin
		 */
		
	}
	const stylusOptions = {
	    'resolve url': true
	}
	// https://vue-loader.vuejs.org/en/configurations/extract-css.html
	return {
		css: generateLoaders(),
		postcss: generateLoaders(),
		less: generateLoaders('less'),
		sass: generateLoaders('sass', {
			indentedSyntax: true
		}),
		scss: generateLoaders('sass'),
		stylus: generateLoaders('stylus',stylusOptions),
		styl: generateLoaders('stylus',stylusOptions)
	}
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options,conf) {
	const output = []
	const loaders = exports.cssLoaders(options,conf)

	for(const extension in loaders) {
		const loader = loaders[extension]
		output.push({
			test: new RegExp('\\.' + extension + '$'),
			use: loader
		})
	}

	return output
}
