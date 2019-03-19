<style lang="less">
	.search{
		display: flex;
		.input{
			flex:1;
			border:1px solid #ddd;
			color:#bbb;
			margin:5px;
			height:40px;
			position: relative;
			background:#fff;
			border-radius: 5px;
			span.glyphicon{
				position:absolute;
				display: block;
				top:12px;
				left:10px;
				font-size:15px;
				
			}
			input{
				font-size:13px;
				height:100%;
				width:80%;
				background:transparent;
				color:#bbb;
				margin-left:30px;
			}
		}
		.text{
			width:80px;
			line-height:50px;
			text-align: center;
		}
		.close{
			width:60px;
			line-height:50px;
			text-align: center;
			font-size:20px;
		}
		.pot-scroll{
			
			top:0;
			left:20px;
			overflow: hidden;
			/*right:20px;*/
		}
		.pot-scroll-contaienr{
			position:absolute;
			top:8px;
			right:40px;
			left:30px;
			overflow: hidden;
		}
		.tk-clear-all{
			position:absolute;
			right:8px;
			top:12px;
			font-size:12px;
		}
		.pot-scroll-content{
			display: inline-block;
		}
		.tk-local{
			height:24px;
			padding:0px 10px;
			white-space: nowrap;
			.tk-local-item{
				line-height:20px;
				flex:1;
				height:20px;
				box-sizing: border-box;
				font-size:12px;
				padding-left:4px;
				padding-right:4px;
				color:#fff;
				display: inline-block;
				.tk-local-text{
					vertical-align: middle;
					box-sizing: border-box;
					height:20px;
					border-radius:3px;
					background:#278add;
					line-height:20px;
					color:#fff;
					padding-left:5px;
					padding-right:5px;
					display: inline-block;
				}
				.del{
					vertical-align: middle;
					margin-left:-2px;
					box-sizing: border-box;
					display: inline-block;
					line-height:20px;
					height:20px;
					width:20px;
					background:#f64b45;
					border-radius:3px;
					text-align: center;
					font-size:10px;
					color:#fff;
				}
			}
		}
	}
	
</style>
<template>
	<div @click="toSearch" class="tk-search">
		<div class="search">
			<div v-if="t.back" @click="back" class="close">
				<span class="glyphicon glyphicon-remove-circle"></span>
			</div>
			<div class="input">
				<span class="glyphicon glyphicon-search"></span>
				<input ref="input" @focus="focus" @blur="blur" @keypress.enter="$emit('enter')" v-model="searchVal" :placeholder="!this.local.length?placeholder:''" type="text" />
				<div v-if="searchVal" @click="searchVal=''" class="tk-icon-close">
				
				</div>
				<div class="pot-scroll-contaienr">
					<pot-scroll 
						class="horizontal-scroll-list-wrap"
						ref="scroll"
						:data="local" 
						v-if="!searchVal&&!isFocus" 
						direction="horizontal">
						<ul class="tk-local">
								<li @click="searchVal=item" v-for="item,index of local" class="tk-local-item">
									<span class="tk-local-text">
										{{item}}
									</span>
									<span class="del" @click.stop="local.splice(index,1)">
										—
									</span>
								</li>
						</ul>
					</pot-scroll>
				</div>
				<div v-if="!searchVal&&!isFocus&&local.length" @click="local=[]" class="tk-clear-all">清空</div>
			</div>
			<div v-if="t.search" class="text">
				搜索
			</div>
			
		</div>
	</div>
	
</template>

<script>
	window.$=require('jquery');
	export default {
		name:'tk-search',
		data(){
			return {
				searchVal:this.value,
				local:[],
				isFocus:false,
			}
		},
		destroyed(){
			this.blur();
			var local=this.local;
			localStorage.setItem('tkSearchData',JSON.stringify(local))
		},
		mounted(){
			var local=localStorage.getItem('tkSearchData')||'[]';
			this.local=JSON.parse(local);
			this.$refs.scroll.forceUpdate(true)
		},
		watch:{
			value(newVal){
				this.searchVal=newVal;
			},
			searchVal(newVal){
				this.$emit('input',newVal)
			}
		},
		props:{
			placeholder:{
				type:String,
				default:'请输入想要查找的内容'
			},
			value:{
				type:String,
				default:''
			},
			t:{//控制样式
				type:Object,
				default(){
					return {
						search:false,
						back:false
					}
				}
			}
		},
		methods:{
			toSearch(){
				this.$refs.input.focus()
			},
			back(){
				this.$emit('back')
			},
			blur(){
				this.isFocus=false;
				var index=this.local.indexOf(this.searchVal)
				if(index==-1){
					this.searchVal&&this.local.unshift(this.searchVal)
				}else{
					var a=this.local.splice(index,1)
					this.local=a.concat(this.local)
				}
				
			},
			focus(){
				this.isFocus=true;
			}
		}
	}
</script>
