<template>
	<div class="pot-container">
		<slot></slot>
	</div>
</template>

<script>
	export default{
		name:'pot-container'
	}
</script>

<style lang="less">
	.pot-container{
		position:fixed;
		top:50px;
		width:100%;
		background:#efefef;
		bottom:0;
	}
	.pot-container::-webkit-scrollbar{
		display:none;
	}
</style>