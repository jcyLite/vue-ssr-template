<template>
	<div @click="a" :class="['tk-button',disabled?'tk-disabled':'','button-'+type]">
		<slot></slot>
	</div>
</template>

<script>
	export default{
		props:{
			type:{
				type:Number,
				default:0
			},
			disabled:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			a(){
				!this.disabled&&this.$emit('click')
			}
		}
	}
</script>

<style lang="less">
	.tk-button{
		height:50px;
		line-height: 50px;
		border-radius:3px;
		text-align: center;
		margin-left:10px;
		margin-right:10px; 
		&.button-0{
			background:#ffb243;
			color:#fff;
			height:40px;
			line-height:40px;
			&.tk-disabled{
				background:#f7db9d;
			}
		}
		&.button-1{
			background:#4a4c5b;
			color:#fff;
			&:active{
				background:#444654;
			}
		}
		&.button-2{
			z-index:100;
			margin-left:0px;
			margin-right:0px;
			background:#FCBD3A;
			color:#fff;
			border-radius:0px;
			position:fixed;
			width:100%;
			bottom:0;
			border:none;
			&.tk-disabled{
				background:#f7db9d;
			}
		}
		&.button-4{
			box-sizing: border-box;
			color:#fff;
			height:30px;
			line-height:30px;
			font-size:14px;
			border-radius:4px;
			background:#FCBD3A;
			width:100%;
			position:absolute;
			bottom:0;
		}
	}
	
</style>