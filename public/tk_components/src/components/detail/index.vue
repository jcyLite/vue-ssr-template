<style lang="less">
	.tkn-detail{
		background:#fff;
		width:auto;
		margin-top:5px;
		margin-bottom:5px;
		box-sizing: border-box;
		.list:not(:last-child){
			border-bottom:1px solid #FAFAFA;
		}
		.list{
			font-size:14px;
			height:45px;
			display:flex;
			line-height:50px;
			padding-left:10px;
			padding-right:10px;
			box-sizing:border-box;
			.key{
				flex:2;
				text-align: left;
				color:#999;
			}
			.value{
				flex:3;
				text-align: right;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.icon{
				width:20px;
				line-height:50px;
				height:50px;
				font-size:12px;
				text-align: center;
				&::before{
					transition:.3s all;
					display: block;
				}
				&.active{
					&::before{
						transform: rotateZ(90deg);
					}
				}
			}
		}
		.wrap{
			overflow: hidden;
			display: none;
			padding:13px;
			padding-top:20px;
			padding-bottom:20px;
			line-height:30px;
			color:#999;
			font-size:14px;
			&.active{
				display: block;
			}
		}
	}
</style>
<template>
	<div class="tkn-detail">
		<template v-for="item,index of list">
			<div @click="item_click(item,index)"  class="list">
				<div class="key">{{item.key}}</div>
				<div class="value">{{item.value}}</div>
				<div v-if="item.detail" :class="{active:actives.indexOf(index)!=-1}" class="icon glyphicon glyphicon-menu-right"></div>
			</div>
			<ul :class="{active:actives.indexOf(index)!=-1}" class="wrap" v-if="item.detail">
				{{item.detail}}
			</ul>
		</template>
	</div>
</template>

<script>
	export default{
		name:'tk-detail',
		data(){
			return {
				actives:[]
			}
		},
		methods:{
			item_click(item,index){
				if(item.detail){
					console.log(index);   
					var i=this.actives.indexOf(index)
					console.log(i)
					if(i==-1){
						this.actives.push(index)
					}else{
						this.actives.splice(i,1);
					}
					console.log(this.actives)
				}
				item.click&&item.click.call(this)
			}
		},
		props:{
			list:{
				type:Array,
				default(){
					return [{
						key:'发令人',
						value:'薛峰'
					},{
						key:'发令时间',
						value:'2018-10-10 20:20:20'
					},{
						key:'调度原因',
						value:'防汛'
					},{
						key:'已选择管理所',
						value:'白区港抽水站管理所、周庄'
					}]
				}
			}
		}
	}
</script>

