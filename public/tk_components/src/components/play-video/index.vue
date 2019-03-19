<template>
	<transition name="tk-dialog-fade">
		<popup
			class="tk-play-video"
			type="dialog"
			:mask="true"
			v-show="isVisible"
			@touchmove.prevent
	      	@mask-click="hide">
			<video 
				class="tk-dialog-main"
				:src="src"
				controls="controls"
				autoplay="autoplay">
			</video>
		</popup>
	</transition>
</template>

<script>
	import popup from '../popup/popup.vue'
	import visibilityMixin from './visibility.js';
	export default{
		mixins: [visibilityMixin],
		name:'tk-play-video',
		components:{popup},
		props:{
			src:{
				type:String,
				default:''
			}
		}
	}
</script>

<style lang="less">
	.tk-dialog-fade-enter-active{
		animation: dialog-fadein .4s;
		.tk-dialog-main{
    		animation: dialog-zoom .4s
    	}
	}
    
  @keyframes dialog-fadein{
  	0%{
    	opacity: 0;
    }
    100%{
    	opacity: 1;
    }
  }
    
      
  @keyframes dialog-zoom{
  	0%{
  		transform: scale(0.5);
  	}
    100%{
    	transform: scale(1);
    }
  }
    	
	video.tk-dialog-main{
		position:absolute;
		top:0;
		width:100%;
		right:0px;
		bottom:0;
		left:0;
		margin:auto;
		z-index:101;
		
	}
</style>