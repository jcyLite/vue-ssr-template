<template>
	<div 
		class="tk-image-cell">
		<div 
			@click="toBigger(index)"
			class="tk-image-cell-box" 
			:style="{
				'background-image':`url(${data.img_src})`
			}">
		</div>
		<div v-if="data.name" class="tk-image-cell-name">
			{{data.name}}
		</div>
		<div v-if="data.time" class="tk-image-cell-time">
			{{data.time}}
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			data:{
				type:Object,
				default(){
					return {
						img_src:require('./nodata.png'),
						name:'无数据',
						time:'1991-07-03'
					}
				}
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
	.tk-image-cell{
		margin:5px;
		position:relative;
		border:1px solid #fefefe;
		text-align: center;
		font-size:10px;
		.tk-image-cell-box{
			border-radius:5px;
			width:80px;
			height:80px;
			background-size:cover;
			background-repeat: no-repeat;
		}
		.tk-image-cell-name{
			line-height:20px;
			width:80px;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.tk-image-cell-time{
			width:80px;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>