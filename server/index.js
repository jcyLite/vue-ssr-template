const express=require('express');
const fs=require('fs')
const path=require('path');
var bodyParser     =         require("body-parser"); 
const resolve=(p)=>path.resolve(__dirname,p)

module.exports=function makeServer(app){
	//设置跨域访问
	app.all('*', function(req, res, next) {
	   res.header("Access-Control-Allow-Origin", "*");
	   res.header("Access-Control-Allow-Headers", "X-Requested-With");
	   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	   res.header("X-Powered-By",' 3.2.1');
	// res.header("Content-Type", "application/json;charset=utf-8");
	   next();
	});
	
	//app.use(bodyParser.json({"limit":"50mb"}));
	app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));
	app.use('/image',express.static(resolve('./image')))
	app.post('/addBegin',bodyParser.json({limit: '10mb'}),(req, res)=>{
		var body=req.body;
		var data=body.data;
		var result=JSON.parse(fs.readFileSync(resolve("./api/tuceng.json")))
		result.push(data);
		fs.writeFileSync(
			resolve("./api/tuceng.json"),
			JSON.stringify(result)
		)
	})
	
	app.post('/del',bodyParser.json({limit: '10mb'}),(req,res)=>{
		var body=req.body;
		var bid=body.bid;
		var tid=body.tid;
		console.log(tid,bid)
		var result=JSON.parse(fs.readFileSync(resolve("./api/tuceng.json")))
		var arr=[];
		result.forEach(item=>{
			if(item.tid==tid){
				var a;
				item.data.forEach((ii,index)=>{
					if(ii.bid==bid){
						console.log(index);
						a=index
					}
				})
				item.data.splice(a,1)
			}
			arr.push(item)
		})
		fs.writeFileSync(
			resolve("./api/tuceng.json"),
			JSON.stringify(arr)
		)
		res.json({
			code:0
		})
	})
	
	app.post('/changeName',bodyParser.json({limit: '10mb'}),(req,res)=>{
		var body=req.body;
		var tid=body.tid;
		var result=JSON.parse(fs.readFileSync(resolve("./api/tuceng.json")))
		var arr=[];
		result.forEach(item=>{
			if(body.tid==item.tid){
				console.log(body.tname)
				item.tname=body.tname
			}
			arr.push(item)
		})
		fs.writeFileSync(
			resolve("./api/tuceng.json"),
			JSON.stringify(arr)
		)
		res.json({
			code:0
		})
	})
	app.all('/:viewname?', function(req, res) {
		if(req.params.viewname){
			var result=JSON.parse(fs.readFileSync(resolve("./api/"+req.params.viewname+".json")))
			res.status(200)
			res.json(result)
		}else{
			res.json('无数据')
		}
	});
//	var server = app.listen(3334, function () {
//		console.log('listening at port 3334')
//	})
}
