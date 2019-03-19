<template>
	<div :style="{display}" class="tk-button-group">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props:{
			display:{
				type:String,
				default:'flex'
			}
		}
	}
</script>

<style lang="less">
	.tk-button-group{
		display: flex;
		>div{
			padding:10px;
			box-sizing:border-box;
			flex:1;
			text-align: center;
			border:1px solid #efefef;
		}
		>div:last-child{
			background:#ffb243;
			color:#fff;
			border:none;
		}
	}
</style>