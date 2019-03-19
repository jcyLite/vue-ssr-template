<style lang="less">
	.tk-menu{
		.list{
			.glyphicon-triangle-right{
				transition:.3s all;
				&.active{
					transform: rotateZ(90deg);
				}
			}
			.title{
				background:#666;
				height:50px;
				line-height:50px;
				color:#fff;
				padding-left:20px;
				span{
					float: right;
					margin-top:15px;
					margin-right:20px;
				}
			}
			.container{
				transition:.3s all;
				overflow: hidden;
			}
			.item{
				padding-left:20px;
				height:50px;
				line-height:50px;
				border-bottom:1px solid #ddd;
				background:#fff;
				.glyphicon.glyphicon-menu-right{
					float:right;
					top:18px;
					right:20px;
				}
			}
		}
	}
	
</style>
<template>
	<div class="tk-menu">
		<div class="left">
			<div v-for="(item,index) of list" class="list">
				<div @click="active['active'+index]=!active['active'+index]" class="title">
					{{item.title}}
					<span :class="{active:active['active'+index]}" class="glyphicon glyphicon-triangle-right"></span>
				</div>
				<div :style="{height:active['active'+index]?(item.list.length*3.125+'rem'):'0'}" :class="{active:active['active'+index]}" class="container">
					<div v-for="i of item.list" @click="item_click(i.click)" class="item">
						{{i.title}}
						<span class="glyphicon glyphicon-menu-right"></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods:{
			item_click(fn){
				console.log(this);
				fn&&fn.call(this)
			}
		},
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
			},
			all_active:{
				type:Boolean,
				default:true
			}
		},
		watch:{
			all_active(newV){
				for(var key in this.active){
					this.active[key]=newV
				}
			}
		},
		data(){
			var obj={};
			for(var i=0;i<this.list.length;i++){
				obj['active'+i]=true;
			}
			return {
				active:obj
			}
		}
	}
</script>

