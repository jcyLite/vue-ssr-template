<template>
	<div 
		@click="$emit('click')" 
		class="tk-cell-with-image"
		v-if="title.indexOf(filter)!=-1||middle.indexOf(filter)!=-1||bottom.indexOf(filter)!=-1||right_top.indexOf(filter)!=-1">
		<div v-if="img_src!==false" class="tk-cell-with-image-left">
			<div :style="{'background-image':`url(${img_src||require('./nodata.png')})`}" class="tk-cell-with-image-bg">
			
			</div>
		</div>
		
		<div class="tk-cell-with-image-content">
			<div v-if="!filter" class="title">
				{{title}}
			</div>
			<div v-if="filter" class="title">
				<template v-for="(item,index) of title.split(filter)">
					<span>{{item}}</span>
					<span style="color:rgb(255, 160, 101);" v-if="index!=(title.split(filter).length-1)">{{filter}}</span>
				</template>
			</div>
			<div v-if="!filter" class="middle">
				{{middle}}
			</div>
			<div v-if="filter" class="middle">
				<template v-for="(item,index) of middle.split(filter)">
					<span>{{item}}</span>
					<span style="color:rgb(255, 160, 101);" v-if="index!=(middle.split(filter).length-1)">{{filter}}</span>
				</template>
			</div>
			<div v-if="!filter" class="bottom">
				{{bottom}}
			</div>
			<div v-if="filter" class="bottom">
				<template v-for="(item,index) of bottom.split(filter)">
					<span>{{item}}</span>
					<span style="color:rgb(255, 160, 101);" v-if="index!=(bottom.split(filter).length-1)">{{filter}}</span>
				</template>
			</div>
		</div>
		<div class="tk-cell-with-image-right">
			<div class="right-top">
				<span v-if="right_top">
					{{!filter?right_top:''}}
					<template v-if="filter" v-for="(item,index) of right_top.split(filter)">
						<span>{{item}}</span>
						<span style="color:rgb(255, 160, 101);" v-if="index!=(right_top.split(filter).length-1)">{{filter}}</span>
					</template>
				</span>
				<slot name="right-top"></slot>
			</div>
			<div class="right-bottom">
				<span class="mbtime" v-if="right_bottom">
					{{!filter?right_bottom:''}}
					<template v-if="filter" v-for="(item,index) of right_bottom.split(filter)">
						<span>{{item}}</span>
						<span style="color:rgb(255, 160, 101);" v-if="index!=(right_bottom.split(filter).length-1)">{{filter}}</span>
					</template>
				</span>
				<slot name="right-bottom"></slot>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		name:'tk-cell_with_image',
		props:{
			filter:{
				type:String,
				default:''
			},
			img_src:{
				type:[String,Boolean],
				default:''
			},
			title:{
				type:String,
				default:''
			},
			middle:{
				type:String,
				default:''
			},
			bottom:{
				type:String,
				default:''
			},
			right_top:{
				type:String,
				default:''
			},
			right_bottom:{
				type:String,
				default:''
			}
		}
	}
</script>

<style lang="less">
	.tk-cell-with-image{
		box-sizing: border-box;
		padding-top:16px;
		padding-left:13px;
		padding-right:13px;
		padding-bottom:16px;
		background:#fff;
		margin-top:9px;
		display: flex;
		position: relative;
		
	}
	.tk-cell-with-image-right{
		flex:1;
		width:100px;
		.right-bottom{
			height:50%;
			font-size:12px;
			color:#999;
			vertical-align: bottom;
			position:relative;
			.mbtime{
				position:absolute;
				display: block;
				right:0px;
				bottom:0px;
			}
		}
		.right-top{
			height:50%;
			text-align: right;
			*{
				font-size:12px;
				color:#999;
			}
		}
	}
	.tk-cell-with-image-content{
		box-sizing: border-box;
		flex:1;
		width:120px;
		box-sizing: border-box;
		overflow:hidden;
		padding-left:20px;
		.title{
			margin-top:4px;
			font-size:14px;
			color:#333;
		}
		.middle{
			margin-top:12px;
			color:#999;
			font-size:12px;
		}
		.bottom{
			margin-top:12px;
			color:#999;
			font-size:12px;
			width:200px;
			text-overflow:ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}
	.tk-cell-with-image-left{
		border-right:1px solid #e5e5e5;
		.tk-cell-with-image-bg{
			flex: 1;
			width:68px;
			height:68px;
			background-size: cover;
			border-radius:10px;
			background-color:#f2f3e1;
			margin-right:20px;
		}
	}
	
	

</style>