<style lang="less">
	.tk-list{
		.title{
			height:50px;
			line-height: 50px;
			padding-left:10px;
			background:#F2F2F2;
		}
		.container{
			background:#fff;
			.item{
				float:left;
				width:25%;
				.icon{
					height:60px;
					width:60px;
					background:#f2f2f2;
					border-radius:50%;
					margin:auto;
					margin-top:20px;
					margin-bottom:10px;
					background-size:100% 100%;
				}
				margin-bottom:20px;
				text-align:center;
			}
			&:after{
				content:'';
				display: block;
				clear:both;
			}
		}
	}
</style>
<template>
	<div class="tk-menu">
		<div v-for="(item,index) of list" class="tk-list">
			<div class="title">
				{{item.title}}
			</div>
			<div class="container">
				<div v-for="i of item.list" @click="item_click(i.click)" class="item">
					<div :style="i.icon?{'background-image':`url(${i.icon})`}:''" class="icon">
						
					</div>
					{{i.title}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'tk-menu',
		props:{
			list:{
				type:Array,
				default:()=>[
					{
						title:'a',
						list:[{
							title:'b',
							click(){
								console.log('b')
							}
						}]
					},{
						title:'c',
						list:[{
							title:'d',
							click(){
								console.log('d')
							}
						}]
					}
				]
			}
		},
		methods:{
			item_click(fn){
				fn&&fn.call(this)
			}
		}
	}
</script>
