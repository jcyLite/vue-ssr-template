<template>
  <div class="tk-popup" @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove" :class="rootClass" v-show="isVisible">
    <div class="tk-popup-mask" @touchmove.prevent @click="maskClick">
      <slot name="mask"></slot>
    </div>
	  <!--<div class="tk-popup-content" @touchmove.prevent v-if="$slots.default">-->
	    <slot></slot>
	    
	  <!--</div>--> 
  </div>
</template>

<script type="text/ecmascript-6">
  import visibilityMixin from './visibility'
  import popupMixin from './popup.js'
  const EVENT_MASK_CLICK = 'mask-click'
  export default {
    name: 'tk-popup',
    mixins: [visibilityMixin, popupMixin],
    props: {
      type: {
        type: String,
        default: ''
      },
      mask: {
        type: Boolean,
        default: true
      },
      content: {
        type: String,
        default: ''
      },
      center: {
        type: Boolean,
        default: true
      },
      position: {
        type: String,
        default: ''
      }
    },
    computed: {
      rootClass() {
        const cls = {
          'tk-popup_mask': this.mask
        }
        if (this.type) {
          cls[`pot-${this.type}`] = true
        }
        return cls
      },
      containerClass() {
        const center = this.center
        const position = this.position
        if (position) {
          return {
            [`tk-popup-${position}`]: true
          }
        }
        if (center) {
          return {
            'tk-popup-center': true
          }
        }
      }
    },
    methods: {
      maskClick(e) {
        this.$emit(EVENT_MASK_CLICK, e)
        if (this.maskClosable) {
          this.hide()
        }
      },
      touchmove(e){
      	this.$emit('touchmove',e)
      },
      touchstart(e){
      	this.$emit('touchstart',e)
      },
      touchend(e){
      	this.$emit('touchend',e)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @require "./variable.styl"
  .tk-popup
    position: fixed
    left: 0
    right:0
    top: 0
    bottom: 0
    z-index: 100000
    pointer-events: none
  .tk-popup_mask
    pointer-events: auto
    .tk-popup-mask
      display: block
  .tk-popup-mask, .tk-popup-container
    position: absolute
    width: 100%
    height: 100%
  .tk-popup-mask
    display: none
    overflow: hidden
    background-color: $popup-mask-bgc
    opacity: $popup-mask-opacity
    pointer-events: auto
    // fix some android webview opacity render bug
    &::before
      content: "."
      display: block
      width: 1px
      height: 1px
      background-color: rgba(0, 0, 0, .1)
      margin-left: -10px
  .tk-popup-container
    transform: translate(100%, 100%)
  .tk-popup-content
    width: 100%
    box-sizing: border-box
    pointer-events: auto
  .tk-popup-center,
  .tk-popup-right,
  .tk-popup-left
    .tk-popup-content
      top: -50%
      left: -50%
      width: auto
      max-width: 100%
      transform: translate(0, 0)
  .tk-popup-right,
  .tk-popup-left
    .tk-popup-content
      height: 100%
      top: -100%
  .tk-popup-center
      .tk-popup-content
        transform: translate(-50%, -50%)
  .tk-popup-top
    .tk-popup-content
      top: -100%
      left: -100%
      transform: translate(0, 0)
  .tk-popup-right
    .tk-popup-content
      top: -100%
      right: 100%
  .tk-popup-left
    .tk-popup-content
      left: -100%
</style>
