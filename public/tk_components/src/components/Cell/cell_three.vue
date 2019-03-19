<style lang="less">
	.tk-cell-three{
		height:70px;
		border-top:1px solid #e5e5e5;
		border-bottom:1px solid #e5e5e5;
		margin-bottom:9px;
		background:#fff;
		flex-wrap: wrap;
		padding: 13px;
		position: relative;
		&.active{
			height:auto;
			.content{
				overflow: inherit;
				text-overflow:inherit;
				white-space: inherit;
			}
		}
		.title{
			width:50%;
		}
		.time{
			position:absolute;
			right:13px;
			top:13px;
			width:50%;
			color:#999;
			font-size:12px;
			text-align: right;
		}
		.content{
			line-height:16px;
			margin-top:10px;
			font-size:12px;
			color:#999;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
	}
</style>
<template>
	<div :class="{active}" class="tk-cell-three" @click="active=!active">
		<div class="title">{{data.title}}</div>
		<div class="time">{{data.time}}</div>
		<div class="content">{{data.content}}</div>
	</div>
</template>

<script>
	export default {
		name:'tk-cell-three',
		data(){
			return {
				active:false
			}
		},
		props:{
			data:{
				type:Object,
				default(){
					return {
						title:{
							type:String,
							default:'title'
						},
						time:{
							type:String,
							default:'asdf'
						},
						content:{
							type:String,
							default:'sadf'
						}
					}
				}
			}
		}
	}
</script>
