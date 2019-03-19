<style lang="less" scoped="scoped">
	.tk-switch.active{
		.core:after{
			transform: translateX(1.428571rem);
		}
		.core:before{
			transform: scale(0);
		}
		.core{
			border-color: #26a2ff;
    		background-color: #26a2ff;
		}
	}
	.tk-switch {
		display: flex;
		align-items: center;
		.core{
			background-color: #d9d9d9;
			border-color: #d9d9d9;
    	display: inline-block;
	    position: relative;
	    width: 3.714286rem;
	    height: 2.285714rem;
	    border: .071429rem solid #d9d9d9;
	    border-radius: 1.142857rem;
	    box-sizing: border-box;
	    /*background: #d9d9d9;*/
	    pointer-events: none;
		}
		.core:before{
			transform: scale(1);
			width: 3.571429rem;
	    height: 2.142857rem;
	    background-color: #fdfdfd;
		}
		.core:after{
			transform: translateX(0rem);
		
			width: 2.142857rem;
	    height: 2.142857rem;
	    background-color: #fff;
	    box-shadow: 0 0.071429rem 0.214286rem rgba(0,0,0,.4);
		}
		.core:before,.core:after{
			content: " ";
	    top: 0;
	    left: 0;
	    position: absolute;
	    transition: transform .3s,-webkit-transform .3s;
    	border-radius: 1.071429rem;
		}
		.label:empty{
			margin-left: 0;
			display: inline-block;
			pointer-events: none;
		}
	}
</style>
<template>
	<label :class="{'active':active}"  @click="switchTab" class="tk-switch" >
			<span class="core"></span> 
			<div class="label">
				
			</div>
	</label>
</template>

<script>
	export default{
		props:{
			value:Boolean
		},
		name:'tk-switch',
		watch:{
			value(newV){
				this.active=newV;
			}
		},
		data(){
			return {
				active:1
			}
		},
		mounted(){
			this.active=this.value;
		},
		methods:{
			switchTab(){
				this.active=!this.active;
				this.$emit('change',this.active)
			}
		}
		
		
	}
</script>