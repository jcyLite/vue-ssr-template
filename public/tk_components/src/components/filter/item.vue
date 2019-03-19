<template>
	<div class="tk-filter-item">
		<tk-title>
			{{name}}
		</tk-title>
		<div @click="tkValue=index" :class="{active:tkValue==index}" class="tk-filter-item-cell" v-for="item,index of select">
			{{item}}
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				tkValue:this.value
			}
		},
		watch:{
			value(newV){
				this.tkValue=newV
			},
			tkValue(newV){
				this.$emit('input',newV)
			}
		},
		props:{
			select:{
				type:Array,
				default:()=>['item1','item2']
			},
			value:{
				type:[String,Number],
				default:0
			},
			name:{
				type:String,
				default:'头'
			}
		}
	}
</script>

<style lang="less">
	.tk-filter-item{
		overflow:hidden;
		.tk-filter-item-title{
			margin-left:13px;
			margin-top:10px;
			margin-bottom:10px;
			.tk-filter-item-name{
				margin-left:10px;
				vertical-align: middle;
			}
		}
		.tk-filter-item-cell{
			border-radius:5px;
			margin-top:10px;
			margin-left:10px;
			text-align: center;
			padding-left:20px;
			padding-right:20px;
			height:40px;
			line-height:40px;
			float:left;
			background:#fff;
			&.active{
				background:#0084FF;
				color:#fff;
			}
		}
	}
</style>