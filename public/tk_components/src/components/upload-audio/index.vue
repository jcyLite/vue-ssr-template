<style lang="less">
	@import '../../style/variable.less';
	.tk-audio{
		background:#fff;
		padding-top:10px;
		padding-bottom:10px;
		overflow: hidden;
		position:static;
		.tk-audio-item{
			margin:8px;
			border-radius:2px;
			color:#fff;
			line-height:calc(100vw/8 - 10px);
			width:calc(100vw/4 - 16px);
			height:calc(100vw/8 - 10px);
			background-color:#fcbd3a;
			background-size:contain;
			background-repeat: no-repeat;
			float: left;
			text-align: center;
			position:relative;
			.del{
				position:absolute;
				right:-9px;
				top:-9px;
				line-height:18px;
				text-align:center;
				border-radius:50%;
				background:red;
				width:18px;
				height:18px;
				
			}
		}
		.tk-audio-item-image{
			background-image:url('./audio.png');
		}
	}
	.tk-upload-audio{
		
	}
	.button{
		width:150px;
		color:#fff;
		height:40px;
		background:#fcbd3a;
		border-radius:5px;
		text-align: center;
		line-height: 40px;
	}
	.pressToSay-box{
		width:200px;
		height:200px;
		position:fixed;
		margin:auto;
		left:0;
		right:0;
		bottom:0;
		top:0;
		border-radius:10px;
		background:rgba(0,0,0,.5);
		text-align: center;
		line-height:200px;
		font-size:20px;
		color:#fff;
	}
</style>
<template>
	<div class="tk-upload-audio">
		<div class="tk-audio">
			<div  
				class="tk-audio-item tk-audio-item-image"
				v-for="(item,index) of nativeVal" 
				@click="playAudio(item)"
			>
				<div @click.stop="del(index)" class="del">
					-
				</div>
			</div>
			<div 
				@touchstart="pressToSay($event,0)" 
				@touchmove="pressToSay($event,1)"
				@touchend="pressToSay($event,2)" 
				class="tk-audio-item">
				录音
			</div>
		</div>
		<div v-if="audioStatus!='0'" class="pressToSay-box">
			{{audioStatus=='1'?'手指左右滑 取消发送':'松开手指 取消发送'}}
		</div>
	</div>
</template>

<script>
	import playAudio from './playAudio.js';
	import {createFile,captureVideo} from './file.js';
	export default{
		data(){
			return {
				audioStatus:"0",
				audioVal:this.value||[],
				nativeVal:[]
			}
		},
		props:{
			value:{
				type:Array,
				default:()=>[]
			}
		},
		watch:{
			value(newVal){
				this.tkValue=newVal
			},
			audioVal(newVal){
				this.$emit('input',newVal)
			}
		},
		methods:{
			playAudio(src){
				playAudio(src);
			},
			del(index){
				this.nativeVal.splice(index,1);
			},
			pressToSay(e,i){
				e.stopPropagation();
				var that=this;
				var timer;
				function release(){
					if(that.audioStatus=="1"){
						createFile.stop();
					}else if(that.audioStatus=="2"){
						createFile.cancel();
					};
					that.audioStatus="0";
					release.hasRelease=true;
				}
				[()=>{//开始
					this.audioStatus="1";
					release.hasRelease=false;//表面还未释放资源
					this.startx=e.changedTouches[0].pageX;
					this.timeStart=new Date().getTime();
					createFile(new Date().getTime()+'.wav',function(d,url){
						that.audioVal.push(d);
						that.nativeVal.push(url)
					});
					timer=setTimeout(()=>{
						release();
					},30000);
				},()=>{//移动
					var movedx=e.changedTouches[0].pageX-this.startx;
					var outBox=movedx>50||(movedx<-50);
					if(outBox){
						this.audioStatus="2";
					}else if(this.audioStatus!=1){
						this.audioStatus="1";
					}
				},()=>{
					//超过30秒以及释放过了
					if(release.hasRelease) return;
					//没到30秒的时候；松开时清除timer；并释放资源
					if(timer){
						clearTimeout(timer);
						timer=null;
					}
					release();
				}][i]();
			}
		}
	}
</script>
