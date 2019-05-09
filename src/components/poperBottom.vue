
<style lang=less>
	.poperBottom.cksxb{
		&.active{
			height:600px;
		}
		.close{
			position:absolute;
			right:10px;
			top:10px;
			cursor: pointer;
		}
		.box{
			width:100%;
		}
		.row{
			&.active{
				background:#eee;
			}
			height:30px;
			width:100%;
			border-bottom:1px solid #ddd;
			.a{
				margin-left:10px;
				font-size:14px;
			}
			.right{
				width:400px;
				margin-right:30px;
				float:right;
				.b{
					font-size:14px;
					margin-right:10px;
				}
				.c{
					font-size:14px;
				}
				.d{
					
				}
				input{
					margin-top:2px;
				}
			}
			.col:first-child{
				width:20px;
			}
			.col:nth-child(2){
				width:30px;
			}
			.col{
				line-height:30px;
				height:100%;
				text-align: center;
				padding-left:10px;
				padding-right:10px;
				border-right:1px solid #ddd;
			}
			.select-input{
				border:1px solid #ddd;
				border-radius:2px;
				width:12px;
				height:12px;
				margin-top:9px;
				&.active{
					background:#ddd;
				}
			}
		}
	}
	.sxsearch{
		width:20px;
	}
</style>

<template>
	<div v-if="acksxbd" :class="{active:bactive}" class="poperBottom cksxb">
		<div @click="acksxbd=false" class="close">X</div>
		<div class="box">
			<div class="row">
				<span class="a">{{d.tname}}</span>
				<div class="right">
					<span @click="del" class="b">删除所选</span>
					<span class="c">筛选</span>
					<input v-model="searchVal" type="text" />
					<!--<img @click="sxsearch" class="sxsearch" src="../img/search.png" alt="" />-->
					<span @click="bactive=!bactive" class="d">{{!bactive?'全屏显示':'小屏显示'}}</span>
					
				</div>
				
			</div>
			<div class="row">
				<div class="col">
					<div
						:class="{active:allActive}"
						@click="allSelect"
						class="select-input"></div>
				</div>
			</div>
			<div :class="{active:oactive==index}" @click="oactive=index,dingwei(item,index)" v-if="searchVal?
				(item.bjmc.indexOf(searchVal)!=-1)
				||(item.bjbzm.indexOf(searchVal)!=-1)
				||(item.szxzq.indexOf(searchVal)!=-1)
				:true" v-for="item,index of d.data" class="row">
				<div class="col">
					<div 
						@click="(active.indexOf(index)!=-1)?active.splice(active.indexOf(index),1):active.push(index)"
						:class="{active:active.indexOf(index)!=-1}" class="select-input"></div>
				</div>
				<div class="col">
					{{index+1}}
				</div>
				<div class="col">
					{{item.bjmc}}
				</div>
				<div class="col">
					{{item.bjbzm}}
				</div>
				<div class="col">
					{{item.szxzq}}
				</div>
				<div class="col">
					{{item.txzq}}
				</div>
				<div class="col">
					{{item.tsfdz}}
				</div>
				<div class="col">
					{{item.tsfyy}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {markerClick} from '../module.js'
	export default {
		props:['value','d'],
		computed:{
			allActive(){
				if(this.d){
					return this.active.length==this.d.data.length;
				}
			}
		},
		watch:{
			value(newV){
				console.log(newV);
				this.acksxbd=newV;
			},
			acksxbd(newVal){
				this.$emit('input', newVal)
			}
		},
		mounted(){
			window.poper=this;
		},
		methods:{
			dingwei(item,index){
				markerClick.call(this,activeMarkers[index],item)
				var lnglat=item.lnglat;
				window.map.centerAndZoom(new T.LngLat(lnglat.x,lnglat.y), 12);
			},
			allSelect(){
				if(this.d){
					if(this.allActive){
						this.active=[];
					}else{
						this.active=[];
						this.d.data.forEach((item,index)=>{
							this.active.push(index);
						})
					}
				}
			},
			del(){
				this.active.forEach(item=>{
					this.$http.post('/del',{
						tid:this.d.tid,
						bid:this.d.data[item].bid
					})
					this.d.data.splice(item,1)
				})
				this.active=[];
			}
		},
		data(){
			return {
				acksxbd:false,
				active:[],
				oactive:-1,
				searchVal:'',
				bactive:false
			}
		}
	}
</script>
