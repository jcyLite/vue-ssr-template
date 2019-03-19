<template>
  <li class="pot-toolbar-item border-right-1px">
    <pot-button :icon="action.icon">
      <pot-checkbox
        class="pot-toolbar-chb"
        v-model="action.checked"
        v-if="action.type == 'checkbox'"
        :label="action.text">
      </pot-checkbox>
      <span v-else v-html="action.text"></span>
    </pot-button>
    <i class="pot-toolbar-down"></i>
  </li>
</template>

<script>
  import potButton from '../button/button'
  import potCheckbox from '../checkbox/checkbox'

  const COMPONENT_NAME = 'pot-toolbar-item'

  export default {
    name: COMPONENT_NAME,
    components: {
      potButton,
      potCheckbox
    },
    props: {
      action: {
        type: Object,
        default() {
          /* istanbul ignore next */
          return {}
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @require "../../common/stylus/variable.styl"
  @require "../../common/stylus/mixin.styl"

  .pot-toolbar-item
    display: flex
    flex-fix()
    align-items: center
    background-color: $toolbar-bgc
    &:last-child
      position: static
      &::after
        display: none
    &:active
      background-color: $toolbar-active-bgc
    &:active
      &::after
        border-color: transparent

    /* reset pot-checkbox style */
    .pot-toolbar-chb
      height: 44px
      padding: 0
      font-size: $fontsize-small
      background-color: transparent
      .pot-checkbox-wrap
        padding: 0
        justify-content: center
        .pot-checkbox-ui
          position: relative
          left: auto
          margin-right: .42em

    /* reset pot-btn style */
    .pot-btn
      position: relative
      padding: 0 5px
      background-color: transparent
      border: 0 none
      color: $color-grey
      font-size: $fontsize-small
      &:active
        background-color: transparent
      &:active::after
        display: none
      i
        margin-right: 0
        &.potic-more
          color: $color-light-grey
          font-size: $fontsize-large
</style>
