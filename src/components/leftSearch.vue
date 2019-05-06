<template>
	<div v-show="!avalue" class="left-search">
		<div class="top">
			<span>共筛选出3个图层数据</span>
			<span class="close" @click="close">关闭</span>
		</div>
		<div class="titem">
			图层名称
			<img src="../img/detail.png" alt="" />
			<img src="../img/shuxing.png" alt="" />
			<span>共条记录</span>
		</div>
	</div>
</template>

<script>
	export default {
		props:['value'],
		watch:{
			value(newV){
				this.avalue=newV;
			},
			avalue(newV){
				this.$emit('input',newV)
			}
		},
		data(){
			return {
				avalue:this.value
			}
		},
		methods:{
			close(){
				this.avalue=true;
			}
		}
	}
</script>

<style lang=less>
	.left-search{
		.top{
			span:last-child{
				margin-left:20px;
			}
			.close{
				cursor: pointer;
			}
		}
		.titem{
			padding-top:20px;
			width:290px;
			height:50px;
			border:1px solid #ddd;
			img{
				width:20px;
			}
		}
	}
</style>