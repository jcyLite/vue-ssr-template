<style lang="less">
	.mh-shopping{
		position:fixed;
		top:0;
		bottom:0;
		left:0;
		right:0;
		z-index:100;
		.mh-shopping-mask{
			position:absolute;
			width:100%;
			height:100%;
			background-color:#25262d;
			opacity:.4;
		}
		.mh-dialog-main{
			position:absolute;
			top:0;
			right:0;
			bottom:0;
			left:0;
			background:#fff;
			border-radius:5px;
			width:300px;
			height:400px;
			margin:auto;
		}
		.btns{
			position:absolute;
			bottom:0;
			height:50px;
			display: flex;
			line-height:50px;
			width:100%;
			>div{
				flex:1;
				text-align: center;
			}
		}
		.mh-textarea{
			height:150px;
			border:1px solid #f1f1f1;
			textarea{
				border:none;
				
				padding:13px;
				width:100%;
				height:100%;
				box-sizing: border-box;
			}
		}
		.mh-num{
			display: flex;
			>div:nth-child(1){
				flex:1;
				margin-left:13px;
			}
			>div:nth-child(2){
				flex:2;
			}
		}
	}
	.mh-dialog-fade-enter-active{
		animation: dialog-fadein .4s;
		.mh-dialog-main{
	    	animation: dialog-zoom .4s
	    }
	}
    .mh-dialog-fade-leave{
		animation: dialog-fadeout .4s;
		.mh-dialog-main{
	    	animation: dialog-zoom-leave .4s
	    }
	}
    
      

  @keyframes dialog-fadein{
  	0%{
  		opacity: 0;
  	}
    100%{
    	 opacity: 1;
    }
  }
   @keyframes dialog-fadeout{
  	0%{
  		opacity: 1;
  	}
    100%{
    	 opacity: 0;
    }
  } 
  @keyframes dialog-zoom{
  	0%{
  		transform: scale(0);
  	}
     
    50%{
    	transform: scale(1.1);
    }
    100%{
    	transform: scale(1);
    }
  }
   @keyframes dialog-zoom-leave{
   	0%{
  		transform: scale(1);
  	}
     
    50%{
    	transform: scale(1.1);
    }
    100%{
    	transform: scale(0);
    }
   }
</style>
<template>
	<transition name="mh-dialog-fade">
		<div v-show="isVisible" class="mh-shopping">
			<div @click="maskClick" class="mh-shopping-mask"></div>
			<div class="mh-dialog-main">
				<div class="mh-dialog-container">
					<mh-cell :img_src=item.img_src :title=item.title :middle=item.spec :bottom="'库存：'+item.num"></mh-cell>
					<div class="mh-num">
						<div>数量：</div>
						<tk-add-minus 
							:max="item.num" :min="0"
							v-model="num"></tk-add-minus>
					</div>
					<div class="mtitle">
						<div class="icon"></div>
						<div class="left">
							备注：
						</div>
					</div>
					<div class="mh-textarea">
						<textarea maxlength="1000" v-model="content" placeholder="请输入备注内容" name="" rows="" cols=""></textarea>
					</div>
				</div>
				<div class="btns">
					<div @click="cancel" class="cancel">取消</div>
					<div @click="confirm" class="confirm">确认</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import visibilityMixin from './visibility.js'
	export default {
		 mixins: [visibilityMixin],
		name:'tk-pop-shopping-car',
		data(){
			return {
				num:this.model||0,
				content:''
			}
		},
		props:['data','model'],
		computed:{
			item(){
				var data=this.data;
				return {
					img_src:this.baseImageURL+data.icon,
					title:data.name,
					spec:data.spec,
					num:data.num
				}
			}
		},
		methods:{
			maskClick(){
				console.log(1212)
				this.hide()
			},
			cancel(){
				this.hide();
			},
			confirm(e){
				this.hide();
				this.$emit('confirm', e, {
					num:this.num,
					content:this.content
				})
			}
		}
		
	}
</script>
