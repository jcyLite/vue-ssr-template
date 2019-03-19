<template>
  <li class="pot-rate-item" :class="{ 'pot-rate-item_active': index <= $parent.tempValue }">
    <slot>
      <div class="pot-rate-item-def"></div>
    </slot>
  </li>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'pot-rate-item'
  export default {
    name: COMPONENT_NAME,
    props: {
      index: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @require "../../common/stylus/mixin.styl"

  .pot-rate-item
    position: relative
    width: 32px
    flex: 0 1 auto
    margin-right: 6px
    &::after
      content: ""
      display: block
      padding: 50% 0
    &:last-child
      margin-right: 0
    .pot-rate-item-def
      position: absolute
      width: 100%
      height: 100%
      background-size: 100%
      background-repeat: no-repeat
      background-position: center
      bg-image("evaluation_icon_star_gray")
  .pot-rate-item_active
    .pot-rate-item-def
      bg-image("evaluation_icon_star")
</style>
