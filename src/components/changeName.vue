<style lang="less">
	.cpt-changeName{
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
		.box{
			width:200px;
			height:90px;
			background:#fff;
			z-index:10000000000001;
			left:0;
			right:0;
			bottom:0;
			top:0;
			margin:auto;
			position:absolute;
			border-radius:10px;
			input{
				margin-left:10px;
				margin-top:10px;
				height:20px;
				border-radius:4px;
				border:1px solid #ddd;
				padding-left:10px;
			}
			.change-name-buttons{
				margin-top:20p
			}
			.button{
				cursor: pointer;
				float:left;
				background:#007BC4;
				color:#fff;
				width:50px;
				height:30px;
				line-height:30px;
				text-align: center;
				font-size:14px;
				border-radius:5px;
				margin-top:10px;
				margin-left:30px;
			}
		}
	}
</style>

<template>
	<div v-if="isShow" class="cpt-changeName">
		<div @click="hide" class="shade"></div>
		<div class="box">
			<input v-model="currentData" type="text" />
			<div class="change-name-buttons">
				<div @click="hide" class="button cancel">取消</div>
				<div @click="confirm" class="button confirm">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'changeName',
		props:['data'],
		data(){
			return {
				isShow:false,
				currentData:''
			}
		},
		mounted(){
			this.currentData=this.data;
		},
		methods:{
			show(){
				this.isShow=true;
			},
			hide(){
				this.isShow=false;
			},
			confirm(){
				this.hide()
				this.$emit('confirm',this.currentData)
			}
		}
	}
</script>

