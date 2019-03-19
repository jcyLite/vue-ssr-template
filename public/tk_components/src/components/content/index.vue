<style lang="less">
	.tk-content{
		background:#fff;
		padding-top:13px;
		padding-bottom:30px;
		line-height:30px;
		box-sizing: border-box;
		.tk-content-box{
			/*overflow: ;*/
			width:auto;
			margin:13px;
			margin-top:0;
			text-align: justify;
		}
	}
</style>
<template>
	<div class="tk-content">
		<div class="tk-content-box">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			
		}
	}
</script>

