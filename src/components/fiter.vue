<template>
	<div v-if="showv" class="page-filter">
		<div @click="hide" class="shade"></div>
		<div class="fiter-box">
			<div @click="active=0">
				<div>
					<span :class="{active:active==0}" ></span>
					按图层名称筛选
				</div>
				<div>
					<input v-model="inputv" type="text" />
				</div>
			</div>
			<div @click="active=1">
				<div>
					<span :class="{active:active==1}" ></span>
					按图层类型筛选
				</div>
				<div>
					<img :class="{active:activeb==0}" @click="activeb=0" src="../img/position.png" alt="" />
					<img :class="{active:activeb==1}" @click="activeb=1" src="../img/zx.png" alt="" />
					<img :class="{active:activeb==2}" @click="activeb=2" src="../img/m.png" alt="" />
				</div>
			</div>
			<div class="buttons">
				<div @click="chongzhi" class="button">重置</div>
				<div @click="shaixuan" class="button">筛选</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'fiter',
		data(){
			return {
				showv:false,
				active:-1,
				inputv:'',
				activeb:-1
			}
		},
		watch:{
			active(newV){
				if(newV!=1){
					this.activeb=-1
				}
			}
		},
		methods:{
			chongzhi(){
				this.active=-1;
				this.inputv='';
				this.activeb=-1;
			},
			shaixuan(){
				
			},
			show(){
				this.showv=true;
			},
			hide(){
				this.showv=false;
			}
		}
	}
</script>

<style lang=less>
	.page-filter{
		z-index:10000000;
		position:fixed;
		top:0;
		right:0;
		bottom:0;
		left:0;
		.shade{
			position:fixed;
			top:0;
			right:0;
			bottom:0;
			left:0;
			background:rgba(0,0,0,.2);
			z-index:10000000;
		}
		.fiter-box{
			padding:30px;
			width:300px;
			height:200px;
			position:absolute;
			left:0;
			right:0;
			bottom:0;
			top:0;
			margin:auto;
			background:#fff;
			z-index:10000001;
			.buttons{
				margin-bottom:0px;
				.button{
					cursor: pointer;
					border:1px solid #ddd;
					padding:5px;
					margin-right:10px;
					border-radius:4px;
				}
			}
			>div{
				>div{
					span{
						width:15px;
						height:15px;
						border:1px solid #ddd;
						display: block;
						float:left;
						border-radius: 50%;
						margin-right:10px;
						margin-top:3px;
						&.active{
							background:#ddd;
						}
					}
					margin-bottom:10px;
				}
				margin-bottom:30px;
				img{
					width:20px;
					margin-left:10px;
					&.active{
						background:#ddd;
					}
				}
			}
		}
	}
	
</style>