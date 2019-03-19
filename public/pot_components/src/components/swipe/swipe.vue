<template>
  <div class="pot-swipe">
    <slot>
      <transition-group name="pot-swipe" tag="ul">
        <li v-for="(item, index) in data" :key="item.item.value">
          <pot-swipe-item
            :btns="item.btns"
            :item="item.item"
            :index="index"
            :auto-shrink="autoShrink" />
        </li>
      </transition-group>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import potSwipeItem from './swipe-item.vue'

  const COMPONENT_NAME = 'pot-swipe'
  const EVENT_ITEM_CLICK = 'item-click'
  const EVENT_BTN_CLICK = 'btn-click'

  export default {
    name: COMPONENT_NAME,
    provide() {
      return {
        swipe: this
      }
    },
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      },
      autoShrink: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.activeIndex = -1
      this.items = []
    },
    methods: {
      addItem(item) {
        this.items.push(item)
      },
      removeItem(item) {
        const index = this.items.indexOf(item)
        this.items.splice(index, 1)
      },
      onItemClick(item, index) {
        this.$emit(EVENT_ITEM_CLICK, item, index)
      },
      onBtnClick(btn, index) {
        const item = this.data[index]
        this.$emit(EVENT_BTN_CLICK, btn, index, item)
      },
      onItemActive(index) {
        if (index === this.activeIndex) {
          return
        }
        if (this.activeIndex !== -1) {
          const activeItem = this.items[this.activeIndex]
          activeItem.shrink()
        }
        this.activeIndex = index
      }
    },
    components: {
      potSwipeItem
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .pot-swipe
    overflow: hidden

  .pot-swipe-enter-active, .pot-swipe-leave-active
    transition: all 0.3s
    .pot-swipe-item-inner
      transition: all 0.3s

  .pot-swipe-enter, .pot-swipe-leave-to
    .pot-swipe-item-inner
      height: 0
</style>
