<style lang="less">
	.tk-header {
		z-index:10;
		height:50px;
		line-height:50px;
		position:fixed;
		top:0;
		width:100%;
		text-align:center;
		background:#333;
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
		<div v-show="back" @click="$emit('left_click')&&$router.go(-1)" class="left">
			<span class="glyphicon glyphicon-menu-left"></span>
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
		props: {
			title:{
				type:String,
				default:'头部'
			},
			back:{
				type:Boolean,
				default:true
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
			}
		}
	}
</script>

