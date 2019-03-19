<template>
	<div class="hello">
		<div class="header">
			hell
		</div>
		<div class="menus">
			<div @click="$router.push({
				path:'/add'
			})">+</div>
		</div>
		<!--<tk-upload-photo></tk-upload-photo>-->
	</div>
</template>

<script>
</script>

<style lang="less">
	.menus{
		div:last-child{
			width:calc( 25% - 4px );
			text-align: center;
			font-size:80px;
		}
	}
	.header{
		background:#000;
		text-align:center;
		height:50px;
		line-height:50px;
		color:#fff;
	}
</style>