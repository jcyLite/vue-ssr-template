<template>
	<div class="tk-upload-video">
		<div class="tk-video">
			<div @click="createVideo(item,index)" class="tk-video-item" v-for="(item,index) of tkValue">
				<video 
					:src="item"
					autoplay="autoplay">
				</video>
				<div @click.stop="del(index)" class="del">
					—
				</div>
			</div>
			<div 
				class="tk-upload-photo-camera"  
				@click="camera">
			</div>
		</div>
		
	</div>
</template>

<script>
	import {captureVideo} from '../upload-audio/file.js'
	export default {
		data(){
			return {
				tkValue:this.value||[]
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
			tkValue(newVal){
				this.$emit('input',newVal)
			}
		},
		mounted(){
			window.d=this;
		},
		methods:{
			camera(){
				var that=this;
				captureVideo((d,src)=>{
					that.tkValue.push(d)
				})
			},
			del(index){
				this.tkValue.splice(index,1);
			},
			createVideo(src,index){
				this.$createTkPlayVideo({
					src
				}).show();
			}
		}
	}
</script>

<style lang="less">
	.tk-video-item{
		height:80px;
		width:80px;
		float:left;
		background:#ddd;
		margin:5px;
		border-radius:5px;
		position: relative;
		video{
			position: absolute;
			margin:auto;
			left:0;
			right:0;
			width:60px;
			height:auto;
		}
		.del{
			position:absolute;
			right:-8px;
			top:-8px;
			width:16px;
			height:16px;
			border-radius: 50%;
			background:red;
			color:#fff;
			font-size:12px;
			line-height:16px;
			text-align: center;
		}
	}
	.tk-upload-video{
		background:#fff;
		overflow: hidden;
		padding-top:20px;
		padding-bottom:20px;
		.tk-upload-photo-camera{
			float:left;
			background-size:cover;
			margin:5px;
			height:80px;
			width:80px;
			border:1px solid #ddd;
			border-radius:5px;
			background-image:url("./image/camera.svg");
			background-size:60% auto;
			background-repeat: no-repeat;
			background-position:17px 15px;
			
		}
	}
</style>