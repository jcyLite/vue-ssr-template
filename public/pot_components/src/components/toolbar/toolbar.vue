<template>
  <div class="pot-toolbar">
    <ul
      class="pot-toolbar-group pot-toolbar-group-more"
      v-if="moreActions"
      v-show="showMore">
      <pot-toolbar-item
        v-for="(action, index) in moreActions"
        :key="index"
        :action="action"
        @click.native="itemClick(action)"></pot-toolbar-item>
    </ul>
    <ul class="pot-toolbar-group">
      <pot-toolbar-item
        v-for="(action, index) in basicActions"
        :key="index"
        :action="action"
        @click.native="itemClick(action)"></pot-toolbar-item>
    </ul>
  </div>
</template>

<script>
  import potToolbarItem from './toolbar-item.vue'

  const COMPONENT_NAME = 'pot-toolbar'
  const EVENT_CLICK = 'click'
  const EVENT_MORE_CLICK = 'more-click'

  export default {
    name: COMPONENT_NAME,
    components: {
      potToolbarItem
    },
    props: {
      actions: {
        type: Array,
        default() {
          /* istanbul ignore next */
          return []
        }
      },
      moreActions: {
        type: Array
      }
    },
    data() {
      return {
        showMore: false
      }
    },
    computed: {
      basicActions() {
        const basicActions = this.actions.slice()
        this.moreActions && basicActions.push({
          icon: 'potic-more',
          $potMore: true
        })
        return basicActions
      }
    },
    methods: {
      itemClick(action) {
        if (action.$potMore) {
          this.showMore = !this.showMore
          this.$emit(EVENT_MORE_CLICK, this.showMore)
        } else {
          this.$emit(EVENT_CLICK, action)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @require "../../common/stylus/variable.styl"
  @require "../../common/stylus/mixin.styl"

  $toolbar-spacing = 10px
  .pot-toolbar
    position: fixed
    left: $toolbar-spacing
    right: $toolbar-spacing
    bottom: $toolbar-spacing
    z-index: 2
    safe-area-mixin(padding-bottom, bottom)

  .pot-toolbar-group
    display: flex
    height: 44px
    overflow: hidden
    box-sizing: border-box
    border-radius: 2px
    box-shadow: 0 1px 6px rgba(0, 0, 0, .24)
    background-color: $toolbar-bgc
  .pot-toolbar-group-more
    margin-bottom: $toolbar-spacing
    .pot-toolbar-item
      &:last-child
        .pot-toolbar-down
          position: absolute
          top: 44px
          right: 9%
          height: $toolbar-spacing
          color: $toolbar-bgc
          font-size: $fontsize-large-xxx
          font-family: pot-icon
          font-style: normal
          text-shadow: 0 1px 3px $toolbar-active-bgc
          transform: scale(1.3)
          &::before
            content: "\E603"
            position: relative
            top: -10px
          &::after
            content: ""
            display: block
            position: absolute
            left: 30%
            top: 50%
            margin-top: -6px
            width: 40%
            height: 2px
            background-color: $toolbar-bgc
        &:active
          .pot-toolbar-down
            color: $toolbar-active-bgc
            &::after
              background-color: $toolbar-active-bgc
</style>
