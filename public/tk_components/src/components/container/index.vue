<template>
	<div class="tk-container">
		<slot></slot>
	</div>
</template>

<script>
	export default{
	}
</script>

<style lang="less">
	.tk-container{
		position:fixed;
		top:80px;
		width:100%;
		background:#efefef;
		bottom:0;
	}
</style>