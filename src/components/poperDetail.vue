<template>
	<div v-show="isShow" class="poperDetail">
		<div @click=hide class="shade">
			
		</div>
		<div class="midbox">
			<div>
				<div>图层名称：</div>
				<div>{{data.tname}}</div>
			</div>
			<div>
				<div>图层类型：</div>
				<div>{{['点','线','面'][['dian','xian','mian'].indexOf(data.tleixing)]}}</div>
			</div>
			<div>
				<div>基础数据类型：</div>
				<div>{{data.jcsjlx}}</div>
			</div>
			<div>
				<div>所属部件大类：</div>
				<div>公共设施</div>
			</div>
			<div>
				<div>所属部件小类：</div>
				<div>公共井盖</div>
			</div>
			<div>
				<div>描述：</div>
				<div>{{data.miaoshu}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'poperDetail',
		props:['data'],
		data(){
			return {
				isShow:true
			}
		},
		mounted(){console.log(this.data)},
		methods:{
			show(){
				this.isShow=true;
			},
			hide(){
				this.isShow=false;
			}
		}
	}
</script>

<style lang=less>
	.poperDetail{
		position:fixed;
		top:0;
		right:0;
		bottom:0;
		left:0;
		z-index:10000000000000;
		.shade{
			position:fixed;
			top:0;
			right:0;
			bottom:0;
			left:0;
			background:rgba(0,0,0,.2);
			z-index:10000000000000;
		}
		.midbox{
			padding:13px;
			position:absolute;
			width:300px;
			height:300px;
			top:0;
			right:0;
			bottom:0;
			left:0;
			margin:auto;
			background: #fff;
			z-index:10000000000001;
			>div{
				height:40px;
				>div{
					float:left;
				}
			}
		}
	}
</style>