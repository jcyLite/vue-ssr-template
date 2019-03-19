<style lang="less">
	.pot-scroll-nav-panel-title{
	    display: flex;
	    padding-left:13px;
	    margin-left:0;
	    height:40px;
	    line-height:40px;
	    position: relative;
	    background:#fff;
	    .pot-scroll-nav-panel-icon{
	        margin-top:12px;
	        width:3px;
	        height:18px;
	        background:#3172D6;
	        border-radius:2px;
	    }
	    .pot-scroll-nav-panel-left{
	        margin-left:10px;
	        font-family: sans-serif;
	        font-size:16px;
	        color:#333;
	    }
    }
</style>
<template>
  <div class="pot-scroll-nav-panel">
    <pot-sticky-ele :ele-key="label">
    	<div class="pot-scroll-nav-panel-title">
			<div class="pot-scroll-nav-panel-icon"></div>
			<span class="pot-scroll-nav-panel-left"
				v-html="title"
				></span>
		</div>  
    </pot-sticky-ele>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import potStickyEle from '../sticky/sticky-ele.vue'

  const COMPONENT_NAME = 'pot-scroll-nav-panel'

  export default {
    name: COMPONENT_NAME,
    inject: ['scrollNav'],
    props: {
      label: {
        type: [String, Number],
        required: true
      },
      title: {
        type: [String, Number],
        default() {
          /* istanbul ignore next */
          return this.label
        }
      }
    },
    mounted() {
      this.scrollNav.addPanel(this)
    },
    beforeDestroy() {
      this.scrollNav.removePanel(this)
    },
    components: {
      potStickyEle
    }
  }
</script>
