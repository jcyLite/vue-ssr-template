<style lang="less">
	.tk-add-minus{
		height:40px;
		width:300px;
		>*{
			float:left;
		}
		>div,>svg{
			width:20px;
			height:20px;
			background-size:cover;
			border-radius:10px;
			text-align:center;
			font-size:30px;
			line-height:15px;
			color:#ddd;
			padding:0;
		}
		>input{
			font-size:12px;
			border-radius: 5px;
			height:20px;
			line-height: 20px;
			border:1px solid #ddd;
			margin-left:10px;
			margin-right:10px;
			width:50px;
			text-align: center;
		}
		.tk-add-minus-tip{
			height:2px;
			background:#ddd;
			clear:both;
			margin-top:10px;
			.tk-add-minus-tip-t{
				margin-left:-20px;
				width:40px;
				height:40px;
				margin-top:-11px;
				vertical-align: middle;
				text-align: center;
				&::after{
					content:' ';
					display: inline-block;
					background:#278add;
					width:4px;
					height:14px;
					border-radius:3px;
				}
			}
		}
	}
</style>
<template>
	<div class="tk-add-minus">
		<div @click="tkValue>min&&tkValue--" :style="{'background-image':`url(${require('./minus.svg')})`}"></div>
		<input @blur=blur :max="max" :min="min" @change="change" type="number" v-model="tkValue"/>
		<div @click="tkValue<max&&tkValue++" :style="{'background-image':`url(${require('./add.svg')})`}"></div>
		<div style="width:110px;" class="tk-add-minus-tip">
			<div @touchstart="touchstart" @touchmove="touchmove" @touchend=touchend :style="{'transform':`translateX(${110/max*tkValue}px)`}" class="tk-add-minus-tip-t">
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'tk-add-minusc',
		props:{
			value:{
				default:0
			},
			max:{
				type:Number,
				default:100
			},
			min:{
				type:Number,
				default:0
			}
		},
		data(){
			return {
				tkValue:this.value,
				startX:0,
				move:0,
				befmove:(this.value-this.min)/(this.max-this.min)*110,
				movedX:0
			}
		},
		mounted(){
//			console.log(this.tkValue)
		},
		watch:{
			value(newVal){
				this.tkValue=newVal
			},
			tkValue(newVal){
				this.$emit('input',newVal)
			},
			movedX(newVal){
				if(newVal>110){
					this.tkValue=parseInt(this.max)
				}else if(newVal<0){
					this.tkValue=this.min;
				}else{
					this.tkValue=this.min+parseInt(newVal/110*this.max)
				}
			}
		},
		methods:{
			change(){
				if(this.tkValue<this.min){
					this.tkValue=this.min
				}else if(this.tkValue>this.max){
					this.tkValue=this.max
				}
			},
			touchstart(e){
				this.startX=e.touches[0].clientX;
			},
			touchmove(e){
				this.move=e.touches[0].clientX-this.startX;
				this.movedX=this.move+this.befmove
			},
			touchend(e){
				this.befmove=this.movedX;
			},
			blur(){
				if(this.tkValue<this.min){
					this.tkValue=this.min
				}else if(this.tkValue>this.max){
					this.tkValue=this.max
				}
			}
		}
	}
</script>
