<style lang="less">
	@import '../../style/variable.less';
	.tk-detail-photo{
		background:#fff;
		overflow: hidden;
		.tk-detail-photo-item{
			border-radius:4px;
			float:left;
			justify-content: flex-start;
			width:calc( 100vw/4 - 20px);
			height:calc( 100vw/4 - 20px);
			background:@default_bg_color;
			margin:20px;
			.tk-detail-photo-item-box{
				width:100%;
				height:100%;
				background-repeat: no-repeat;
				background-size:cover;
				border-radius:5px;
			}
		}
	}
</style>
<template>
	<div class="tk-detail-photo">
		<div 
			v-for="item,index of list" 
			class="tk-detail-photo-item" 
			>
			<div
				@click="toBigger(index)"
				class="tk-detail-photo-item-box" 
				:style="{
					'background-image':`url(${item.src})`
				}"
			>
				
			</div>
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
		computed:{
			srcs(){
				var arr=[];
				this.list.forEach(item=>{
					arr.push(item.src)
				})
				return arr;
			}
		},
		methods:{
			toBigger(index){
				this.$createPotImagePreview({
					imgs:this.srcs,
					initialIndex:index
				}).show()
			}
		}
	}
</script>

