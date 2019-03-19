<style lang="less" scoped="scoped">
	.tk-switch{
		display: flex;
		height:50px;
		line-height:50px;
		.tk-switch-name{
			flex:1;
			display: block;
			height:50px;
			line-height:50px;
			margin-left:13px;
		}
		padding-right:13px;
		background: #fff;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		box-sizing:border-box;
		span.glyphicon {
			display: inline-block;
			float: right;
		}
	}
</style>
<template>
	<div class="tk-switch">
		<div class="tk-switch-name">{{name}}</div>
		<pot-switch v-model="active"></pot-switch>
	</div>
	
</template>

<script>
	export default{
		props:{
			value:{
				type:Boolean,
				default:false
			},
			name:{
				type:String,
				default:'value'
			}
		},
		name:'tk-switch',
		watch:{
			value(newV){
				this.active=newV;
			},
			active(newV){
				this.$emit('input',newV)
			}
		},
		data(){
			return {
				active:this.value
			}
		}
	}
</script>