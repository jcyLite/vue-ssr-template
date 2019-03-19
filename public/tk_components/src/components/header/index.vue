<style lang="less">
	.tk-header {
		z-index:10;
		height:80px;
		line-height:50px;
		padding-top:30px;
		position:fixed;
		top:0;
		width:100%;
		text-align:center;
		background:#278ADD;
		color:#fff;
		.left{
			position:absolute;
			left:0;
			width:50px;
		}
		.title{
			width:200px;
			position:absolute;
			left:0;
			right:0;
			margin:auto;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		.right{
			width:50px;
			position:absolute;
			right:10px;
			font-size:12px;
		}
	}
</style>
<template>
	<div class="tk-header">
		<div v-if="back" @click="left_click" class="left">
			<span class="glyphicon glyphicon-menu-left"></span>
		</div>
		<div class="left">
			<slot name="left"></slot>
		</div>
		<div class="title">
			<slot></slot>
		</div>
		<div class="right">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name:'pot-header',
		props: {
			title:{
				type:String,
				default:'头部'
			},
			back:{
				type:Boolean,
				default:true
			},
			options:{
				type:Object,
				default(){
					return {
						overback:false
					}
				}
				
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			right_top_class() {
				if(this.right_top.toggleClass){
					return [this.right_top.toggleClass[this.right_top.active]];
				}else{
					return [this.right_top.class]
				}
			}
		},
		methods: {
			right_top_click(){
				if(!this.right_top.click){
					return this.$emit('right_top_click')
				}else{
					return this.right_top.click();
				}
			},
			left_click(){
				if(this.$listeners['left-click']){
					this.$emit('left-click');
				}else{
					this.$router.goBack?this.$router.goBack():this.$router.go(-1)
				}
			}
		}
	}
</script>

