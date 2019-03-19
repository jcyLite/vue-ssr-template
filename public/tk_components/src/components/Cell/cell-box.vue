<template>
	<div class="tk-cell-box">
		<slot></slot>
		<div v-if="!data.length" class="tk-box-nodata">
			
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			data:{
				type:[Array],
				default:()=>[]
			}
		}
	}
</script>

<style lang="less">
	.tk-cell-box{
		.tk-box-nodata{
			height:100px;
			width:100px;
			left:0;
			right:0;
			margin:auto;
			background-repeat: no-repeat;
			background-image:url('./tk-box-nodata.png');
			background-size: contain;
		}
	}
</style>