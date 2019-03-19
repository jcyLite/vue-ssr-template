<style lang="less">
	.nodata-icon{
		background-image:url('./nodata.png');
		height:200px;
		background-size:contain;
		background-repeat: no-repeat;
		width:200px;
		left:0;
		right:0;
		margin:auto;
		margin-top:50px;
	}
	.no-more{
		height:100px;
	}
</style>
<template>
	<pot-scroll class="tk-scroll" ref="scroll" @pulling-up="pullUp" @pulling-down="pullDown" :options="{
			pullDownRefresh:canPullDownCpt,
			pullUpLoad:data.length&&canPullUpCpt
		}">
		<slot></slot>
		<div class="nodata-icon" v-if="!data.length">
			
		</div>
		<div v-if="data.length&&options.pullUp&&!canpullUp" class="no-more">
			暂无更多数据
		</div>
	</pot-scroll>
</template>

<script>
	export default{
		data(){
			return {
				data:this.value,
				canpullUp:true,
				page:1
			}
		},
		computed:{
			canPullDownCpt(){
				return this.options.pullDown||false
			},
			canPullUpCpt(){
				return this.options.pullUp&&this.canpullUp
			}
		},
		props:{
			value:{
				default:''
			},
			url:{
				type:String,
				default:''
			},
			param:{
				default:false
			},
			options:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		watch:{
			value (newVal) {
		        this.data = newVal
	      	},
	        data (newVal) {
	        	this.$emit('input', newVal)
	        },
//	        param(newVal,oddVal){
//	        	if(newVal!=oddVal){
//	        		this.ajax();
//	        	}
//	        },
//	        url(newVal,oddVal){
//	        	if(newVal!=oddVal){
//	        		this.ajax();
//	        	}
//	        }
		},
		mounted(){
			this.$refs.scroll.scrollTo(0,this.$route.query.scrollY||0)
			this.param&&this.url&&this.ajax();
		},
		methods:{
			ajax(){
				var param=this.param||{};
				param.page=this.page;
				this.$http.post(this.url,param).then(d=>{
					if(this.page==1){
						this.data=d;
					}else{
						if(d.length==0){
							this.canpullUp=false;
						}else{
							this.data=this.data.concat(d)
						}
					}
					//将此函数放入队列，等dom更新后回调，防止提前重新计算高度不准
					this.$nextTick(()=>{
						this.$refs.scroll&&this.$refs.scroll.forceUpdate(true);
					})
				})
			},
			pullUp(){
				if(this.canpullUp){
	    			this.page++;
	    			this.ajax();
	    		}
			},
			pullDown(){
				this.page=1;
				this.canpullUp=true;
				this.ajax()
			}
		}
	}
</script>

