<style lang="less">
	.tk-sign{
	}
</style>
<template>
	<div class="tk-sign" ref="sign">
		<canvas 
			@touchend="touchend" 
			@touchstart="touchstart" 
			@touchmove="touchmove" 
			ref="signCanvas" 
			id="" 
			:width="width" 
			:height="height"
			></canvas>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				tablet:null,
				startX:0,
				startY:0,
				signValue:this.value
			}
		},
		props:{
			value:{
				type:String,
				default:''
			},
			width:{
				type:[Number,String],
				default:window.innerWidth
			},
			height:{
				type:[Number,String],
				default:window.innerHeight
			},
			color:{
				type:String,
				default:"#278add"
			}
		},
		watch:{
			value(newV){
				this.signValue=newV;
			},
			signValue(newV){
				this.$emit('input',newV)
			}
		},
		methods:{
			touchstart(e){
				this.ctx=this.$refs.signCanvas.getContext('2d');
				this.ctx.lineWidth=5;
				this.ctx.strokeStyle=this.color;
				this.startX=e.changedTouches[0].clientX-this.canvasPosition.offsetLeft;
				this.startY=e.changedTouches[0].clientY-this.canvasPosition.offsetTop;
				this.ctx.beginPath();
				this.ctx.moveTo(this.startX,this.startY)
			},
			touchmove(e){
				this.moveX=e.changedTouches[0].clientX-this.canvasPosition.offsetLeft;
				this.moveY=e.changedTouches[0].clientY-this.canvasPosition.offsetTop;
				this.ctx.lineTo(this.moveX,this.moveY);
				
				this.ctx.stroke();
			},
			touchend(){
				this.signValue=this.$refs.signCanvas.toDataURL('image/png')
			},
			getOffetTopByBody(el){
				let offsetTop=0;
				let offsetLeft=0;
				while(el&&el.tagName!=='BODY'){
					offsetTop += el.offsetTop;
					offsetLeft+=el.offsetLeft;
					el=el.offsetParent;
				}
				return {offsetTop,offsetLeft}
			}
		},
		computed:{
			canvasPosition(){
				var el=this.$refs.signCanvas;
				let offsetTop=0;
				let offsetLeft=0;
				while(el&&el.tagName!=='BODY'){
					offsetTop += el.offsetTop;
					offsetLeft+=el.offsetLeft;
					el=el.offsetParent;
				}
				return {offsetTop,offsetLeft}
			}
		},
		mounted(){
			console.log(this.$refs.sign.clientHeight)
			
		}
	}
</script>
