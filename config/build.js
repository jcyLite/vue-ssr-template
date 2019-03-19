const compiler=require('./compiler.js');
const path=require('path');
const webpack=require('webpack');
const merge=require('webpack-merge');
const ora = require('ora');
const jcyFs=require('jcy-fs')
var webpackConfig=compiler('src');
var entry=webpackConfig.entry;

for(var key in entry){
	entry[key].unshift('./config/production.entry.js')
}

function buildPack(webpackConfig,callback) {
  var spinner = ora('building for uncompressed files...')
  spinner.start()
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) {  
      throw err
    }
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
    callback&&callback()
  })
}
buildPack(webpackConfig,function(){
    var from=path.resolve(__dirname,'../src/static')
    var output_path=webpackConfig.output.path;
    var to=output_path+'/static';
    jcyFs.copyDir(from,to)
})