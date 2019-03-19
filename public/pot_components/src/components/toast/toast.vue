<template>
  <transition name="pot-toast-fade">
    <pot-popup
      type="toast"
      :z-index="zIndex"
      :mask="mask"
      v-show="isVisible"
      @mask-click="maskClick"
      >
      <i v-if="!isLoading && iconClass.length" class="pot-toast-icon" :class="iconClass"></i>
      <pot-loading v-if="isLoading"></pot-loading>
      <div v-show="txt" class="pot-toast-tip" v-html="txt"></div>
    </pot-popup>
  </transition>
</template>
<script type="text/ecmascript-6">
  import potLoading from '../loading/loading.vue'
  import potPopup from '../popup/popup.vue'
  import visibilityMixin from '../../common/mixins/visibility'
  import popupMixin from '../../common/mixins/popup'

  const COMPONENT_NAME = 'pot-toast'

  const EVENT_TIMEOUT = 'timeout'

  export default {
    name: COMPONENT_NAME,
    mixins: [visibilityMixin, popupMixin],
    props: {
      type: {
        type: String,
        default: '正在加载...'
      },
      icon: {
        type: String,
        default: ''
      },
      mask: {
        type: Boolean,
        default: false
      },
      txt: {
        type: String,
        default: ''
      },
      time: {
        type: Number,
        default: 3000
      },
      // By default, Toast has the bigest z-index among popoup-based components.
      zIndex: {
        type: Number,
        default: 900
      }
    },
    computed: {
      iconClass() {
        const iconClass = []
        if (this.icon) {
          iconClass.push(this.icon)
        }
        const classMap = {
          correct: 'potic-right',
          error: 'potic-wrong',
          warn: 'potic-warn'
        }
        const icon = classMap[this.type]
        if (icon) {
          iconClass.push(icon)
        }
        return iconClass
      },
      isLoading() {
        return this.type === 'loading'
      }
    },
    methods: {
      maskClick() {
        this.maskClosable && this.hide()
      },
      show() {
        this.isVisible = true
        this.clearTimer()
        this.$nextTick(() => {
          if (this.time !== 0) {
            this.timer = setTimeout(() => {
              this.hide()
              this.$emit(EVENT_TIMEOUT)
            }, this.time)
          }
        })
      },
      hide() {
        this.isVisible = false
        this.clearTimer()
      },
      clearTimer() {
        clearTimeout(this.timer)
        this.timer = null
      }
    },
    components: {
      potPopup,
      potLoading
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @require "../../common/stylus/variable.styl"
  .pot-toast
    &.pot-popup
      z-index: 900
    .pot-popup-content
      display: flex
      align-items: center
      padding: 13px 16px
      color: $toast-color
      background-color: $toast-bgc
      border-radius: 2px
  .pot-toast-icon
    width: 24px
    height: 24px
    font-size: $fontsize-large-xxx
  .pot-toast-tip
    line-height: 20px
    font-size: $fontsize-medium
    max-width: 12em
    max-height: 40px
    overflow: hidden
  .pot-toast-icon, .pot-loading
    ~ .pot-toast-tip
      margin-left: 8px

  .pot-toast-fade-enter-active
    animation: toast-in .2s
  .pot-toast-fade-leave-active
    animation: toast-out .2s

  @keyframes toast-in
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes toast-out
    0%
      opacity: 1
    100%
      opacity: 0
</style>
