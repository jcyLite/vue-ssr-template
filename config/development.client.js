/*
 * author  :chenjian
 * endtime :2018-9-6
 * function:this module is a entry of all project
 */
require('eventsource-polyfill')
var hotClient=require('webpack-hot-middleware/client?noInfo=true&reload=true')
hotClient.subscribe((event)=>{
	if(event.action === 'reload'){
		window.location.reload();
	}
})
