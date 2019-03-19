<template>
  <transition name="pot-image-preview-fade">
    <pot-popup type="image-preview" :z-index="zIndex" :center="false" v-show="isVisible">
      <div class="pot-image-preview-container">
        <div class="pot-image-preview-header">
          <slot name="header" :current="currentPageIndex"></slot>
        </div>
        <pot-slide
          ref="slide"
          v-if="isVisible"
          :data="imgs"
          :initial-index="currentPageIndex"
          :auto-play="false"
          :loop="loop"
          :speed="speed"
          :options="options"
          @change="slideChangeHandler"
        >
          <pot-slide-item
            v-for="(img, index) in imgs"
            :key="index"
          >
            <div class="pot-image-preview-item" @click="itemClickHandler">
              <pot-scroll
                ref="items"
                :options="scrollOptions"
                @dblclick.native="dblclickHandler(index, $event)"
              >
                <img class="pot-image-preview-img" :src="img" @load="imgLoad(index)">
              </pot-scroll>
            </div>
          </pot-slide-item>
          <template slot="dots"><i></i></template>
        </pot-slide>
        <div class="pot-image-preview-footer">
          <slot name="footer" :current="currentPageIndex">
            <span class="pot-image-preview-counter">{{currentPageIndex + 1}}/{{imgs.length}}</span>
          </slot>
        </div>
      </div>
    </pot-popup>
  </transition>
</template>
<script type="text/ecmascript-6">
  import potPopup from '../popup/popup.vue'
  import potSlide from '../slide/slide.vue'
  import potSlideItem from '../slide/slide-item.vue'
  import potScroll from '../scroll/scroll.vue'
  import visibilityMixin from '../../common/mixins/visibility'
  import popupMixin from '../../common/mixins/popup'
  import { isAndroid } from '../../common/helpers/env'

  const COMPONENT_NAME = 'pot-image-preview'
  const EVENT_CHANGE = 'change'
  const EVENT_HIDE = 'hide'

  export default {
    name: COMPONENT_NAME,
    mixins: [visibilityMixin, popupMixin],
    props: {
      initialIndex: {
        type: Number,
        default: 0
      },
      imgs: {
        type: Array,
        default() {
          /* istanbul ignore next */
          return []
        }
      },
      loop: {
        type: Boolean,
        default: true
      },
      speed: {
        type: Number,
        default: 400
      },
      preventDefault: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        currentPageIndex: this.initialIndex,
        options: {
          observeDOM: false,
          bounce: {
            left: true,
            right: true
          },
          useTransition: !isAndroid,
          probeType: 3,
          preventDefault: this.preventDefault
        },
        scrollOptions: {
          observeDOM: false,
          zoom: true,
          bindToWrapper: true,
          freeScroll: true,
          scrollX: true,
          scrollY: true,
          probeType: 3,
          bounce: false,
          click: false,
          dblclick: true,
          bounceTime: 300,
          preventDefault: this.preventDefault
        }
      }
    },
    watch: {
      initialIndex(newIndex) {
        this.setPageIndex(newIndex)
      }
    },
    methods: {
      show() {
        this.isVisible = true
        this.$nextTick(() => {
          this._listenSlide()
          this._listenScroll()
        })
      },
      _listenSlide() {
        // waiting slide initial
        this.$nextTick(() => {
          const slide = this.$refs.slide.slide
          slide.on('scrollStart', this.slideScrollStartHandler)
          slide.on('scrollEnd', this.slideScrollEndHandler)
        })
      },
      _listenScroll() {
        // waiting scroll initial
        this.$nextTick(() => {
          this.$refs.items.forEach((scrollItem) => {
            const scroll = scrollItem.scroll
            scroll.on('zoomStart', this.zoomStartHandler.bind(this, scroll))
            scroll.on('beforeScrollStart', this.beforeScrollHandler)
            scroll.on('scroll', this.checkBoundary.bind(this, scroll))
            scroll.on('scrollEnd', this.scrollEndHandler.bind(this, scroll))
          })
        })
      },
      hide() {
        this.isVisible = false
        this.$emit(EVENT_HIDE)
      },
      prev() {
        const slide = this.$refs.slide.slide
        slide && slide.prev()
      },
      next() {
        const slide = this.$refs.slide.slide
        slide && slide.next()
      },
      goTo(index) {
        const slide = this.$refs.slide.slide
        slide && slide.goToPage(index, 0)
      },
      imgLoad(i) {
        /* istanbul ignore if */
        if (this.isVisible && this.$refs.items) {
          this.$refs.items[i].scroll.refresh()
        }
      },
      setPageIndex(currentPageIndex) {
        if (this.currentPageIndex >= 0 && this.currentPageIndex !== currentPageIndex) {
          const item = this.$refs.items[this.currentPageIndex]
          if (item) {
            const scroll = item.scroll
            /* istanbul ignore if */
            if (scroll.scale !== 1) {
              scroll.scale = 1
              scroll.lastcale = 1
              scroll.refresh()
            }
          }
        }
        this.currentPageIndex = currentPageIndex
      },
      slideChangeHandler(currentPageIndex) {
        this.setPageIndex(currentPageIndex)
        this.slideScrollEndHandler()
        this.$emit(EVENT_CHANGE, currentPageIndex)
      },
      slideScrollStartHandler() {
        const slide = this.$refs.slide.slide
        if (this._scrolling && !this._hasEnableSlide) {
          slide.disable()
        } else {
          slide.enable()
        }
      },
      slideScrollEndHandler() {
        this.$refs.items.forEach((scrollItem) => {
          this.scrollEndHandler(scrollItem.scroll)
        })
      },
      _scroll(scroll) {
        const slide = this.$refs.slide.slide
        slide.disable()
        slide.refresh()
        scroll.enable()
      },
      _slide(scroll) {
        this.$refs.slide.slide.enable()
        scroll.disable()
      },
      beforeScrollHandler() {
        // for touchstart scrollEnd
        // cancel it, do not enable slide
        clearTimeout(this.enableSlideTid)
      },
      scrollEndHandler(scroll) {
        clearTimeout(this.enableSlideTid)
        if (this.dblZooming) {
          this.dblZooming = false
          clearTimeout(this.clickTid)
        }
        this._hasEnableSlide = false
        this._scrolling = false
        scroll.enable()
        this.enableSlideTid = setTimeout(() => {
          this.$refs.slide.slide.enable()
        })
      },
      checkBoundary(scroll, pos) {
        if (scroll.distX && Math.abs(scroll.distX) > Math.abs(scroll.distY)) {
          this._scrolling = true
          const reached = scroll.distX > 0 ? pos.x >= scroll.minScrollX : pos.x <= scroll.maxScrollX
          if (reached) {
            this._hasEnableSlide = true
            this._slide(scroll)
          } else {
            if (!this._hasEnableSlide) {
              this._scroll(scroll)
            }
          }
        } else if (scroll.distY) {
          this._scrolling = true
          this._scroll(scroll)
        }
      },
      zoomStartHandler(scroll) {
        this._scroll(scroll)
      },
      dblclickHandler(index, e) {
        const scroll = this.$refs.items[index].scroll
        this.dblZooming = true
        this.zoomTo(scroll, scroll.scale > 1 ? 1 : 2, e)
        scroll.disable()
      },
      itemClickHandler() {
        clearTimeout(this.clickTid)
        this.clickTid = setTimeout(() => {
          !this.dblZooming && this.hide()
        }, this.scrollOptions.bounceTime)
      },
      zoomTo(scroll, scale, e) {
        scroll.zoomTo(scale, e.pageX, e.pageY)
      }
    },
    components: {
      potPopup,
      potSlide,
      potSlideItem,
      potScroll
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @require "../../common/stylus/variable.styl"

  .pot-image-preview-fade-enter, .pot-image-preview-fade-leave-active
    opacity: 0
  .pot-image-preview-fade-enter-active, .pot-image-preview-fade-leave-active
    transition: all .3s ease-in-out

  .pot-image-preview
    .pot-popup-mask
      opacity: .6
    .pot-popup-content
      width: 100%
      height: 100%
    .pot-slide-item
      display: flex
      align-items: center
      justify-content: center
      overflow: hidden
  .pot-image-preview-container
    height: 100%
    margin: 0 -10px
  .pot-image-preview-header,
  .pot-image-preview-footer
    position: absolute
    left: 0
    right: 0
  .pot-image-preview-header
    top: 0
  .pot-image-preview-footer
    bottom: 0
  .pot-image-preview-counter
    position: absolute
    bottom: 50px
    width: 100%
    text-align: center
    font-size: $fontsize-medium
    color: $image-preview-counter-color
  .pot-image-preview-item
    position: relative
    padding: 0 10px
    width: 100%
    height: 100%
    .pot-scroll-wrapper
      display: flex
      align-items: center
      justify-content: center
    .pot-image-preview-img
      display: block
      height: auto
      max-width: 100%
      max-height: 100%
</style>
