<template>
  <div class="pot-popup" :style="{'z-index': zIndex}" :class="rootClass" v-show="isVisible">
    <div class="pot-popup-mask" @touchmove.prevent @click="maskClick">
      <slot name="mask"></slot>
    </div>
    <div class="pot-popup-container" @touchmove.prevent :class="containerClass">
      <div class="pot-popup-content" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="pot-popup-content" v-else v-html="content">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import visibilityMixin from '../../common/mixins/visibility'
  import popupMixin from '../../common/mixins/popup'
  const EVENT_MASK_CLICK = 'mask-click'
  export default {
    name: 'pot-popup',
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
          'pot-popup_mask': this.mask
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
            [`pot-popup-${position}`]: true
          }
        }
        if (center) {
          return {
            'pot-popup-center': true
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @require "../../common/stylus/variable.styl"
  .pot-popup
    position: fixed
    left: 0
    right:0
    top: 0
    bottom: 0
    z-index: 100
    pointer-events: none
  .pot-popup_mask
    pointer-events: auto
    .pot-popup-mask
      display: block
  .pot-popup-mask, .pot-popup-container
    position: absolute
    width: 100%
    height: 100%
  .pot-popup-mask
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
  .pot-popup-container
    transform: translate(100%, 100%)
  .pot-popup-content
    position: absolute
    top: 0
    left: 0
    width: 100%
    box-sizing: border-box
    transform: translate(-100%, -100%)
    pointer-events: auto
  .pot-popup-center,
  .pot-popup-right,
  .pot-popup-left
    .pot-popup-content
      top: -50%
      left: -50%
      width: auto
      max-width: 100%
      transform: translate(0, 0)
  .pot-popup-right,
  .pot-popup-left
    .pot-popup-content
      height: 100%
      top: -100%
  .pot-popup-center
      .pot-popup-content
        transform: translate(-50%, -50%)
  .pot-popup-top
    .pot-popup-content
      top: -100%
      left: -100%
      transform: translate(0, 0)
  .pot-popup-right
    .pot-popup-content
      top: -100%
      right: 100%
  .pot-popup-left
    .pot-popup-content
      left: -100%
</style>
