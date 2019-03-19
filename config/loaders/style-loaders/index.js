var utils=require('./utils.js')
module.exports=function(conf){
	return utils.styleLoaders({
		sourceMap: true,
		extract: true,
		usePostCSS:conf.postCss
	},conf)
};