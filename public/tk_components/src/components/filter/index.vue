<template>
	<div class="tk-filter">
		<div class="tk-filter-name">
			<span class="name">{{name}}</span>
			<slot name="right"></slot>
		</div>
		<div class="tk-filter-container">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			name:{
				type:String,
				default:'筛选'
			}
		}
	}
</script>

<style lang="less">
	.tk-filter{
		overflow: hidden;
		width:100%;
		height:100%;
		.tk-filter-name{
			color:#0084ff;
			margin-left:13px;
			margin-top:13px;
			.name{
				font-size:20px;
				
			}
			.right{
				display: inline-block;
				float:right;
				margin-right:30px;
			}
		}
		.tk-filter-container{
			margin-top:20px;
		}
	}
</style>