<template>
	<div class="tk-image">
		<div class="tk-image-container">
			<slot></slot>
		</div>
		<div v-if="!data.length" class="tk-image-no-data">
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			data:{
				type:Array,
				default:()=>[]
			}
		},
		methods:{
			toBigger(index,item){
				this.$createPotImagePreview({
					imgs:this.data,
					initialIndex:index
				}).show()
			}
		}
	}
</script>

<style lang="less">
	
	.tk-image{
		display: flex;
		flex-wrap: wrap;
		.tk-image-container{
			background:#fff;
			width:100%;
		}
		.tk-upload-photo-abc{
			background-size:cover;
			margin:5px;
			background-repeat: no-repeat;
			position:relative;
			border:1px solid #fefefe;
			width:80px;
			height:80px;
			border-radius:5px;
			text-align: center;
			line-height:80px;
			font-size:80px;
			.del{
				position:absolute;
				right:-8px;
				top:-8px;
				width:16px;
				height:16px;
				border-radius: 50%;
				background:red;
				color:#fff;
				font-size:12px;
				line-height:16px;
				text-align: center;
			}
		}
		.tk-image-no-data{
			background-image:url('./nodata.png');
			height:100px;
			background-size:contain;
			background-repeat: no-repeat;
			width:100px;
			left:0;
			right:0;
			margin:auto;
			margin-top:20px;
		}
	}
</style>