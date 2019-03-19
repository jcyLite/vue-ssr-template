<style lang="less">
	.tk-cell-four{
		background:#fff;
		height:70px;
		margin-bottom:10px;
		border-bottom:1px solid #e5e5e5;
		border-top:1px solid #e5e5e5;
		padding:10px;
		box-sizing:border-box;
		position: relative;
		.title{
			position:absolute;
			color:#000;
			font-size:14px;
			top:16px;
			left:13px;
			height:16px;
			line-height:16px;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			width:230px;
		}
		.status{
			position:absolute;
			right:13px;
			font-size:13px;
			top:16px;
		}
		.content{
			position:absolute;
			left:13px;
			bottom:13px;
			color:#AFAFAF;
			font-size:12px;
			width:190px;
			height:20px;
			line-height:20px;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			/*padding-left:5px;
			.hightLight{
				margin-left:-3px;
			}*/
		}
		.time{
			position:absolute;
			right:13px;
			bottom:16px;
			color:#999;
			font-size:12px;
		}
		.filter{
			color:rgb(255, 160, 101);
			display: inline-block;
		}
	}
</style>
<template>
	<div 
		v-if="data.time.indexOf(filter)!=-1||data.title.indexOf(filter)!=-1||data.content.indexOf(filter)!=-1"
		@click="$emit('click')" 
		class="tk-cell-four">
		<div v-if="!filter" class="title">{{data.title}}</div>
		<div v-if="filter" class="title">
			<template v-for="(item,index) of data.title.split(filter)">
				<span>{{item}}</span>
				<span class="filter" v-if="index!=(data.title.split(filter).length-1)">{{filter}}</span>
			</template>
		</div>
		<div class="status">
			<template v-if="typeof data.status!='string'" v-for="(item,index) of data.status">
				<span :style="{color:data.colors[index]}">{{item}}</span>
				<span style="color:#ccc;" v-if="index!=data.status.length-1"> | </span>
			</template>
			<span :style="{color:data.colors}" v-if="typeof data.status=='string'">{{data.status}}</span>
		</div>
		<div v-if="!filter" class="content">{{data.content}}</div>
		<div v-if="filter" class="content">
			<template v-for="(item,index) of data.content.split(filter)">
				<span>{{item}}</span>
				<span class="filter" v-if="index!=(data.content.split(filter).length-1)">{{filter}}</span>
			</template>
		</div>
		<div v-if="!filter" class="time">{{data.time}}</div>
		<div v-if="filter" class="time">
			<template v-for="(item,index) of data.time.split(filter)">
				<span>{{item}}</span>
				<span class="filter" v-if="index!=(data.time.split(filter).length-1)">{{filter}}</span>
			</template>
		</div>
	</div>
</template>

<script>
	export default{
		name:'tk-cell-four',
		mounted(){
		},
		props:{
			filter:{
				type:String,
				default:''
			},
			data:{
				type:Object,
				default(){
					return {
						title:{
							type:String,
							default:'指令BD1807'
						},
						status:{
							default:()=>['未发送']
						},
						colors:{
							default:()=>['#ddd']
						},
						content:{
							type:String,
							default:'内容XXXX'
						},
						time:{
							type:String,
							default:'2018-12-12'
						}
					}
				}
			}
			
		}
	}
</script>
