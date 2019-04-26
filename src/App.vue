<style src="./app.less" lang="less">

</style>
<template>
	<div id="app">
		<div class="leftBox">
			<div class="top">
				<div>
					事件大类：
					<select name="" id=""></select>
				</div>
				<div>
					事件小类：
					<select name="" id=""></select>
				</div>
			</div>
			<div class="bottom">
				<div class="bottom-top">
					<div>
						共{{d.length}}个图层
					</div>
					<div>
						<img src="./img/filter.png" alt="" />
						<img @click="addatuceng" src="./img/addb.png" alt="" />
						<img @click="d=[]" src="./img/huishou.png" alt="" />
					</div>
				</div>
				<div class="container">
					<div class="box" v-for="item,index of d">
						<div class="t">
							<span>
								{{item.tname}}
							</span>
							<div class="u">
								<img  src="./img/edit.png" alt="" />
								<img src="./img/detail.png" alt="" />
								<img src="./img/earth.png" alt="" />
								<img @click="d.splice(index,1)" src="./img/hsz.png" alt="" />
							</div>
						</div>
						<div class="b">
							<span>
								<img src="./img/upload.png" alt="" />
								批量上传</span>
							<span @click="cksxb">
								<img src="./img/shuxing.png" alt="" />
								查看属性表</span>
							<span>
								<img src="./img/download.png" alt="" />
								导出</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="rightBox">
			<div class="topTool">
				<div class="toola">
					<img @click="editMarker" src="./img/position.png" alt="" />
					<img @click="openPolylineTool" src="./img/zx.png" alt="" />
					<img @click="openPolygonTool" src="./img/m.png" alt="" />
				</div>
				<div class="toolb">
					<img @click="openCircleTool" src="./img/circle.png" alt="" />
					<img @click="openRectangleTool" src="./img/reck.png" alt="" />
					<img @click="mlineTool" src="./img/cz.png" alt="" />
					<img @click="mpolygonTool" src="./img/cm.png" alt="" />
					<img @click="searchShow=true" src="./img/search.png" alt="" />
				</div>
			</div>
			<div v-show="searchShow" class="search">
				<input type="text" />
				<span style="cursor: pointer;" @click="searchShow=false">搜索</span>
			</div>
			<div id="mapDiv"></div>
			<div v-show="cksxbd" class="cksxb">
				<div @click="cksxbd=false" class="close">X</div>
			</div>
		</div>
		<div v-show="poper" class="poper">
			<div @click="poper=false" class="shade"></div>
			<div class="box">
				<div class="scroller">
					<div class="row">
						<div class="col">图层名称：</div>
						<input v-model="poperData.tcmc" class="col" type="text" />
					</div>
					<div class="row">
						<div class="col">图层类型：</div>
						<select v-model="poperData.tclx" placeholder="请选择" class="col" name="" id="">
							<option value="dian">点</option>
							<option value="xian">线</option>
							<option value="mian">面</option>
						</select>
					</div>
					<div class="row">
						<div v-model="poperData.jcsjlx" class="col">基础数据类型：</div>
						<input class="col" type="text" />
					</div>
					<div class="row">
						<div class="col">所属网格类型：</div>
						<select v-model="poperData.sswglx" placeholder="请选择" class="col" name="" id="">
							<option value="请选择">行政区划网格</option>
							<option value="请选择">考评工作网格</option>
						</select>
					</div>
					<div class="row">
						<div class="col">描述：</div>
						<input v-model="poperData.ms" class="col" type="text" />
					</div>
				</div>
				<div class="buttons">
					<div @click="poper=false" click="btna" class="button-1">取消</div>
					<div click="addbtuceng" class="button-2">确定</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import './components/dialog.less';
	var $ = require('jquery');
	export default {
		data() {
			return {
				cksxbd:false,
				poper: false,
				map: null,
				zoom: 12,
				control: null,
				markerTool: null,
				handler: null,
				lineTool: null,
				infoWin1: null,
				polygonTool: null,
				searchShow:false,
				d: [],
				contents: [],
				poperData:{
					tcmc:'',
					tclx:'',
					jcsjlx:'',
					sswglx:'',
					ms:''
				}
			}
		},
		mounted() {
			//读取后台数据
			this.$http.post('/tuceng',{}).then(d=>{
				this.d=d;
			})
			this.map = new T.Map("mapDiv");
			window.map = this.map;
			//设置显示地图的中心点和级别
			this.map.centerAndZoom(new T.LngLat(116.40969, 39.89945), this.zoom);
			//创建缩放平移控件对象
			this.control = new T.Control.Zoom();
			//添加缩放平移控件
			this.map.addControl(this.control);
			this.infoWin1 = new T.InfoWindow();
			this.markerTool = new T.MarkTool(this.map, {
				follow: true
			});
			var infoWin1 = this.infoWin1;
			var sContent = require('./components/dialog.tpl')()
			var bContent = require('./components/dialogb.tpl')()
			var that = this;
			this.markerTool.addEventListener('mouseup', function() {
				var markers = that.markerTool.getMarkers();
				infoWin1.setContent(sContent);
				for(var i = 0; i < markers.length; i++) {
					let marker = markers[i]
					marker.openInfoWindow(infoWin1);
				}
			})
			var config = {
				showLabel: true,
				color: "blue",
				weight: 3,
				opacity: 0.5,
				fillColor: "#FFFFFF",
				fillOpacity: 0.5
			};
			this.polygonTool = new T.PolygonTool(map, config);
			this.lineTool = new T.PolylineTool(map, config);
			this.ControlsetPosition();
			var that = this;
			$('body').on('click', '*[click]', function(e) {
				var method = $(this).attr('click');
				that[method] ? that[method].call(this, e) : '';
			})
		},
		methods: {
			cksxb(){
				this.cksxbd=true;
			},
			btna() {
				var markers = this.markerTool.getMarkers();
				this.map.removeOverLay(markers[markers.length - 1]);

			},
			btnb() {

			},
			btnadd() {
				require('./components/add.less')
				var addtpl = require('./components/add.tpl')();
				$('body').append(addtpl);
			},
			shadea() {
				$('.cpt-add').remove()
			},
			mlineTool() {
				this.lineTool.open();
			},
			mpolygonTool() {
				this.polygonTool.open();
			},
			editMarker() {
				var markers = this.markerTool.getMarkers();
				for(var i = 0; i < markers.length; i++) {
					let marker = markers[i]
					markers[i].disableDragging();
				}
				this.markerTool.open();
			},
			openPolylineTool() {
				var handler = this.handler;
				if(handler) handler.close();
				handler = new T.PolylineTool(this.map);
				handler.open();
			},
			openPolygonTool() {
				var handler = this.handler;
				if(handler) handler.close();
				handler = new T.PolygonTool(this.map);
				handler.open();
			},
			openRectangleTool() { //绘制矩形
				var handler = this.handler;
				if(handler) handler.close();
				handler = new T.RectangleTool(map, {
					follow: true
				});
				handler.open();
			},
			openCircleTool() { //绘制圆
				var handler = this.handler;
				if(handler) handler.close();
				handler = new T.CircleTool(map, {
					follow: true
				});
				handler.open();
			},
			ControlsetPosition() {
				var controlPositionStr = 'leftTOP';
				this.leftTOP = T_ANCHOR_TOP_LEFT;
				this.rightTOP = T_ANCHOR_TOP_RIGHT;
				this.leftBOTTOM = T_ANCHOR_BOTTOM_LEFT;
				this.rightBOTTOM = T_ANCHOR_BOTTOM_RIGHT
				var controlPosition;
				if(controlPositionStr == "leftTOP")
					controlPosition = T_ANCHOR_TOP_LEFT;
				else if(controlPositionStr == "rightTOP")
					controlPosition = T_ANCHOR_TOP_RIGHT;
				else if(controlPositionStr == "leftBOTTOM")
					controlPosition = T_ANCHOR_BOTTOM_LEFT;
				else if(controlPositionStr == "rightBOTTOM")
					controlPosition = T_ANCHOR_BOTTOM_RIGHT;
				this.control.setPosition(controlPosition);
			},
			//添加一个图层
			addatuceng() {
				this.poper = true;
			},
			addbtuceng(){
				if(!this.poperData.tcmc){
					alert('未填写图层名称');
					return;
				}
				this.d.push(this.poperData);
				this.poperData={};
				this.poper = false;
			}
		}
	}
</script>