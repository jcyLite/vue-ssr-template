<template>
	<transition name="tk-picker-fade">
		<popup
		  class="tk-pop-bottom"
	      type="picker"
	      :mask="true"
	      :center="false"
	      :z-index="100"
	      v-show="isVisible"
	      @touchmove.prevent
	      @mask-click="maskClick">
	      <transition name="pot-picker-move">
	        <div :style="{height:height+'px'}" class="tk-pop-bottom-box" v-show="isVisible" @click.stop>
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
		methods:{
			maskClick(){
				this.hide()
			}
		}
	}
</script>

<style lang="less">
	.tk-pop-bottom-top{
		border-bottom:1px solid #ddd;
	}
	.tk-mask{
		z-index: 100;
		width:100%;
		height:100%;
		background-color:#25262d;
		opacity:.4;
	}
	.tk-pop-bottom-box {
		z-index: 101;
		position:fixed;
		bottom:0;
		left:0;
		right:0;
		height:400px;
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
	
	.tk-picker-move-enter,
	.tk-picker-move-leave-active{
		transform: translateY(100%);
	} 
	.tk-picker-move-enter-active,.tk-picker-move-leave-active{
		 transition: all .3s ease-in-out;
	}
</style>