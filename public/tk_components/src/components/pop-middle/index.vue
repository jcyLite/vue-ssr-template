<template>
	<transition name="tk-picker-fade">
		<popup
		  class="tk-pop-middle"
	      type="picker"
	      :mask="true"
	      :center="false"
	      :z-index="100"
	      v-show="isVisible"
	      @touchmove.prevent
	      @mask-click="maskClick">
	      <transition name="tk-picker-bigger">
	        <div :style="{height:height+'px'}" :class="{shock:shockVal}" class="tk-pop-middle-box" v-show="isVisible" @click.stop>
	        	<pot-scroll v-if="scroll" ref="scroll">
	        		<slot></slot>
	        		<div class="box" ref="box"></div>
	        	</pot-scroll>
	        	<slot name="bottom"></slot>
	        	<slot v-if="!scroll"></slot>
	        </div>
	      </transition>
	    </popup>
	</transition>
</template>

<script>
	import visibilityMixin from './visibility.js';
	import popup from '../popup/popup.vue'
	export default {
		mixins: [visibilityMixin],
		data(){
			return {
				shockVal:false
			}
		},
		template:'.tk-pop-middle .box',
		render(h){
			console.log(h)
		},
		props:{
			scroll:{
				type:Boolean,
				default:true
			},
			component:{
				default:()=>{
					return ()=>{
						return {then:()=>{}}
					}
				}
			},
			height:{
				type:[String,Number],
				default:300
			},
			maskClickAble:{
				type:Boolean,
				default:true
			}
		},
		components:{
			popup
		},
		methods:{
			maskClick(){
				this.maskClickAble&&this.hide()
			},
			shock(){
				
			}
			
		}
	}
</script>

<style lang="less">
	.tk-pop-middle-top{
		border-bottom:1px solid #ddd;
	}
	.tk-mask{
		z-index: 100;
		width:100%;
		height:100%;
		background-color:#25262d;
		opacity:.4;
	}
	.tk-pop-middle-box {
		z-index: 101;
		position:fixed;
		bottom:0;
		left:0;
		right:0;
		top:0;
		width:300px;
		margin:auto;
		height:300px;
		background:#fff;
	}
	
	.tk-picker-fade-enter,
	.tk-picker-fade-leave-active {
		opacity: 0;
		z-index:99;
	}
	
	.tk-picker-fade-enter-active,
	.tk-picker-fade-leave-active {
		transition: all .3s ease-in-out;
	}
	
	.tk-picker-bigger-enter,
	.tk-picker-bigger-leave-active{
		transform: translateY(100%);
	} 
	.tk-picker-bigger-enter-active,.tk-picker-bigger-leave-active{
		 transition: all .3s ease-in-out;
	}
</style>