<template>
	<div class="tk-switch-cell">
		<div class="left">
			<slot></slot>
		</div>
		<tk-switch></tk-switch>
	</div>
</template>

<script>
	import Switch from '../Switch/Switch.vue';
	export default {
		components:{'tk-switch':Switch}
	}
</script>

<style lang="less">
	.tk-switch-cell{
		height:55px;
		line-height: 55px;
		background:#fff;
		.left{
			float:left;
			padding-left:20px;
		}
		.tk-switch{
			float:right;
			margin-right:10px;
			margin-top:10px;
		}
	}
</style>