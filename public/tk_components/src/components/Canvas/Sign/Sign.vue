<style lang="less">
	.tk-sign{
		.-color-picker{
			background:#007AFF;
			border-radius:4px;
			margin:4px;
			text-align: center;
			display: none;
		}
		.clear-canvas{
			display: none;
		}
		canvas{
			height:500px;
			/*background:#fff;*/
		}
		.tk-sign-container{
			width:100%;
			height:300px;
			.colpick.colpick_hex{
				display: none;
			}
			.-canvas-wrapper{
				/*height:400px;*/
			}
		}
	}
</style>
<template>
	<div class="tk-sign">
		<div class="tk-sign-container"></div>
		<tk-button @click=submit :type="2">提交</tk-button>
	</div>
</template>

<script>
	import Tablet from './tablet.js';
	export default {
		data(){
			return {
				tablet:null
			}
		},
		methods:{
			submit(){
				this.$emit('submit',this.tablet.getBase64())
				console.log(this.tablet.getBase64())
			}
		},
		mounted(){
			this.tablet=new Tablet(".tk-sign>.tk-sign-container",{
                defaultColor: "#000",
                height:400,
                onInit: function (){
                    var that = this,
                        container = this.container;
//                  container.find("select").eq(0).on("change", function (){
//                      that.setLineWidth($(this).val());
//                  });
//                  container.find("select").eq(1).on("change", function (){
//                      that.rotate($(this).val());
//                  });
//                  container.find(".save-canvas-to-img").on("click", function (){
//                      console.log(that.getBase64());
//                      if(!that.isMobile){
//                          alert("请按f12打开控制台查看base64图片数据！");
//                      }
//                  });
//                  container.find(".get_blob").on("click", function (){
//                      that.getBlob();
//                  });
                    /*container.find(".download").on("click", function (){
                        document.getElementById("preview_img").src = that.getBase64();
                    });*/
                }
            });	
		}
	}
</script>
