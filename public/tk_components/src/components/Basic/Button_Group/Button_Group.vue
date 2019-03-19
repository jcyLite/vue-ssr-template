<template>
	<div class="tk-button-group">
		<div class="button" @click="$emit('click',index)" v-for="(item,index) of contents">{{item}}</div>
	</div>
</template>

<script>
	export default {
		props:{
			contents:{
					type:Array,
					default:['1','2','3']
			}
		}
	}
</script>

<style lang="less">
	.tk-button-group{
		display: flex;
		.button{
			flex:1;
			text-align: center;
			height:50px;
			line-height: 50px;
			border-radius:3px;
			margin-left:10px;
			margin-right:10px;
			&:not(:last-child){
				border:1px solid #ddd;
			}
			&:last-child{
				background:#4a4c5b;
				
				color:#fff;
			}
		}
	}
</style>