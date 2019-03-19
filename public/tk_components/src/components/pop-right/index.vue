<template>
	<transition name="tk-picker-fade">
		<popup
		  class="tk-pop-right"
	      type="picker"
	      :mask="true"
	      :center="false"
	      :z-index="100"
	      v-show="isVisible"
	      @touchmove.prevent="touchmove"
	      @touchstart="touchstart"
	      @touchend="touchend"
	      @mask-click="maskClick">
	      <transition name="tk-pop-right-move">
	        <div ref="rightBox" class="tk-pop-right-box" v-show="isVisible" @click.stop>
	        	<pot-scroll v-if="scroll" ref="scroll">
	        		<slot></slot>
	        	</pot-scroll>
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
		props:{
			scroll:{
				type:Boolean,
				default:true
			},
			height:{
				type:[String,Number],
				default:400
			}
		},
		components:{popup},
		mounted(){
			window.rightBox=this.$refs.rightBox
		},
		data(){
			return {
				startX:0,
				moveX:0
			}
		},
		methods:{
			maskClick(){
				this.hide()
			},
			touchstart(e){
			},
			touchmove(e){
				
			},
			touchend(e){
				
			}
		}
	}
</script>

<style lang="less">
	.tk-pop-right-top{
		border-bottom:1px solid #ddd;
	}
	.tk-mask{
		z-index: 100;
		width:100%;
		height:100%;
		background-color:#25262d;
		opacity:.4;
	}
	.tk-pop-right-box {
		z-index: 101;
		position:fixed;
		bottom:0;
		top:0;
		right:0;
		width:240px;
		background:#fafafa;
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
	
	.tk-pop-right-move-enter,
	.tk-pop-right-move-leave-active{
		transform: translateX(100%);
	} 
	.tk-pop-right-move-enter-active,.tk-pop-right-move-leave-active{
		 transition: all .3s ease-in-out;
	}
</style>