<template>
  <transition name="pot-drawer-move">
    <div class="pot-drawer-panel" v-show="isVisible">
      <div class="pot-drawer-scroll-wrapper">
        <pot-scroll ref="scroll" :data="data">
          <ul class="pot-drawer-list">
            <slot>
              <pot-drawer-item v-for="(item, i) in data" :item="item" :key="i" :index="i" />
            </slot>
          </ul>
        </pot-scroll>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import visibilityMixin from '../../common/mixins/visibility'
  import potScroll from '../scroll/scroll.vue'
  import potDrawerItem from './drawer-item.vue'

  const COMPONENT_NAME = 'pot-drawer-panel'

  export default {
    name: COMPONENT_NAME,
    mixins: [visibilityMixin],
    props: {
      data: {
        type: Array,
        default() {
          /* istanbul ignore next */
          return []
        }
      },
      index: {
        type: Number,
        default: -1
      }
    },
    computed: {
      selectedIndex() {
        const selectedIndex = this.$parent.selected[this.index]
        return selectedIndex === undefined ? -1 : selectedIndex
      }
    },
    watch: {
      data() {
        this.scrollToTop()
      },
      isVisible() {
        this.$nextTick(() => {
          this.refresh()
        })
      }
    },
    mounted() {
      this.$parent.addPanel(this)
    },
    beforeDestroy() {
      this.$parent.removePanel(this)
    },
    methods: {
      refresh() {
        this.$refs.scroll.refresh()
      },
      scrollToTop() {
        this.$refs.scroll.scroll && this.$refs.scroll.scroll.scrollTo(0, 0, 0)
      },
      itemClickHandler(item, index) {
        if (this.selectedIndex !== index) {
          this.$parent.changeHandler(this.index, item, index)
        }
      }
    },
    components: {
      potScroll,
      potDrawerItem
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @require "../../common/stylus/variable.styl"
  @require "../../common/stylus/mixin.styl"

  .pot-drawer-panel
    position: relative
    z-index: 1
    flex: 1
    width: 170px
    overflow: hidden
    background-color: $drawer-panel-bgc
    box-shadow: 0 1px 2px rgba(0, 0, 0, .2)
    + .pot-drawer-panel
      margin-left: -67px
    &:first-child
      box-shadow: none
  .pot-drawer-scroll-wrapper // fix flex item height: 100% bug in android
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%

  .pot-drawer-move-enter, .pot-drawer-move-leave-to
    transform: translate(67px, 0)
  .pot-drawer-move-enter-active, .pot-drawer-move-leave-active
    transition: transform .3s ease-in-out
</style>
