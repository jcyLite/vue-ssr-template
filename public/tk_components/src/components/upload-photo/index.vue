<style lang="less">
	.tk-upload-photo{
		display: flex;
		flex-wrap: wrap;
		background:#fff;
		padding-top:20px;
		padding-bottom:20px;
		.tk-upload-photo-camera{
			background-size:cover;
			margin:5px;
			background-image:url("./image/camera.svg");
			background-size:60% auto;
			background-repeat: no-repeat;
			background-position:17px 15px;
		}
		.tk-upload-photo-abc{
			background-size:cover;
			margin:5px;
			background-image:url("./image/photo.svg");
			background-repeat: no-repeat;
			position:relative;
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
		.tk-upload-photo-image{
			background-size:cover;
			margin:5px;
			background-image:url("./image/photo.svg");
			background-size:60% auto;
			background-repeat: no-repeat;
			background-position:17px 15px;
			position:relative;
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
		>div{
			width:80px;
			height:80px;
			border:1px solid #ddd;
			border-radius:5px;
			text-align: center;
			line-height:80px;
			font-size:80px;
		}
		
	}
</style>
<template>
	<div class="tk-upload-photo">
		<div 
			@click="toBigger(index)"
			v-for="item,index of _tkValue" 
			class="tk-upload-photo-abc" 
			:style="{
				'background-image':`url(${item})`,
				'width':`${innerWidth/4-10}px`,
				'height':`${innerWidth/4-10}px`
			}">
			<div @click.stop="del(index)" class="del">
				—
			</div>
		</div>
		<div 
			class="tk-upload-photo-camera"
			@click.stop="camera">
		</div>
		<div class="tk-upload-photo-image"  @click="image"></div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				tkValue:this.value,
				innerWidth:window.innerWidth
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
		computed:{
			_tkValue(){
				if(!this.withBase64){
					var arr=[];
					this.tkValue.forEach(item=>{
						arr.push("data:image/jpeg;base64,"+item)
					})
					return arr;
				}else{
					return this.tkValue;
				}
			}
		},
		props:{
			value:{
				type:Array,
				default:()=>[]
			},
			withBase64:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			del(index){
				this.tkValue.splice(index,1);
			},
			toBigger(index,item){
				this.$createPotImagePreview({
					imgs:this._tkValue,
					initialIndex:index
				}).show()
			},
			image(){
				var that=this;
				this.choosePic((imageData)=>{ 
					if(this.withBase64){
						this.tkValue.push("data:image/jpeg;base64,"+imageData)
					}else{
						this.tkValue.push(imageData)
					}
				})
			},
			camera(){
				this.mycamera((imageData)=>{
					console.log(12);
					if(this.withBase64){
						this.tkValue.push("data:image/jpeg;base64,"+imageData)
					}else{
						this.tkValue.push(imageData)
					}
				})
			},
			mycamera(successCallback){
				function errorCallback(message){
				}
				navigator.camera.getPicture(successCallback,errorCallback,{
					quality: 50,
					destinationType:Camera.DestinationType.DATA_URL
				});
			},
			choosePic(successCallback){
				function errorCallback(message){
				}
				navigator.camera.getPicture(successCallback,errorCallback,{
					quality: 50,
					destinationType:Camera.DestinationType.DATA_URL,
					sourceType :Camera.PictureSourceType.SAVEDPHOTOALBUM
				});
			}
		}
	}
</script>

