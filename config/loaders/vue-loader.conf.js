const utils = require('./style-loaders/utils')
const isDev = process.env.NODE_ENV === 'development'
const sourceMapEnabled = true

module.exports = function(conf){
	return {
	  loaders: utils.cssLoaders({
	    sourceMap: sourceMapEnabled,
	    extract: isDev,
	    usePostCSS:false
	  },conf),
	  cssSourceMap: sourceMapEnabled,
	  cacheBusting: true,
	  transformToRequire: {
	    video: ['src', 'poster'],
	    source: 'src',
	    img: 'src',
	    image: 'xlink:href'
	  },
	  cssModules:{
	  	localIdentName:'[path][name]---[local]---[hash:base64:5]',
	  	camelCase:true
	  }
	}
}
