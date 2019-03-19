<template>
	<div class="tk-cell-one">
		{{title}}
	</div>
</template>

<script>
	export default{
		props:{
			title:{
				type:String,
				default:'default'
			}
		}
	}
</script>

<style lang='less'>
	.tk-cell-one{
		background:#fff;
		height:50px;
		line-height:50px;
		padding-left:20px;
	}
</style>