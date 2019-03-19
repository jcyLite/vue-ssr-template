<style lang="less">
	@import '../../style/variable.less';
	.tk-detail-video-content{
		background:#fff;
		padding-top:10px;
		padding-bottom:10px;
		overflow: hidden;
		.tk-detail-video-item{
			margin:5px;
			background:@default_bg_color;
			width:calc(100vw/4 - 10px);
			height:calc(100vw/4 - 10px);
			video{
				width:100%;
				height:100%;
			}
		}
	}
	.no-data{
		background-image:url(./nodata.png);
		height:200px;
		background-size:contain;
		background-repeat: no-repeat;
		width:200px;
		margin:auto;
	}
</style>
<template>
	<div class="tk-detail-video">
		<div v-if="list.length" class="tk-detail-video-content">
			<div 
				@click="playVideo(item.src)"
				v-for="(item,index) of list"
				class="tk-detail-video-item">
				<video 
					:src="item.src"
					autoplay="autoplay">
				</video>
			</div>
		</div>
		<div v-if="!list.length" class="no-data">
			
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default:()=>[]
			}
		},
		methods:{
			playVideo(src,id){
				this.$createTkPlayVideo({
					src
				}).show();
			}
		}
	}
</script>

