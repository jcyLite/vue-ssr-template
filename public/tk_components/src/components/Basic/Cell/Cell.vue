<style lang="less">
	.tk-cell{
		background:#fff;
		height:100px;
		margin:5px;
		border-radius:5px;
		padding:10px;
		box-sizing:border-box;
		position: relative;
		.title{
			position:absolute;
			color:#000;
			font-size:20px;
			font-weight: 600;
			top:20px;
			left:20px;
		}
		.status{
			position:absolute;
			right:20px;
			top:20px;
		}
		.content{
			position:absolute;
			left:20px;
			bottom:20px;
		}
		.time{
			position:absolute;
			right:20px;
			bottom:20px;
			
		}
	}
</style>
<template>
	<div class="tk-cell">
		<div class="title">{{title}}</div>
		<div class="status">{{status}}</div>
		<div class="content">{{content}}</div>
		<div class="time">{{time}}</div>
	</div>
</template>

<script>
	export default{
		props:{
			title:{
				type:String,
				default:'指令BD1807'
			},
			status:{
				type:String,
				default:'未发送'
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
</script>
