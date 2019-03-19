<template>
  <button
    class="pot-btn"
    :type="type"
    :class="btnClass"
    @click="handleClick">
    <i :class="icon" v-if="icon"></i>
    <slot></slot>
  </button>
</template>

<script>
  const COMPONENT_NAME = 'pot-button'
  export default {
    name: COMPONENT_NAME,
    props: {
      icon: {
        type: String,
        default: ''
      },
      active: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      inline: {
        type: Boolean,
        default: false
      },
      primary: {
        type: Boolean,
        default: false
      },
      outline: {
        type: Boolean,
        default: false
      },
      light: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'button'
      }
    },
    computed: {
      btnClass() {
        return {
          'pot-btn_active': this.active,
          'pot-btn_disabled': this.disabled,
          'pot-btn-inline': this.inline,
          'pot-btn-primary': this.primary,
          'pot-btn-outline': this.outline,
          'pot-btn-outline-primary': this.outline && this.primary,
          'pot-btn-light': this.light
        }
      }
    },
    methods: {
      handleClick(event) {
        if (this.disabled) {
          event.preventDefault()
          event.stopPropagation()
          return
        }
        this.$emit('click', event)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @require "../../common/stylus/variable.styl"
  @require "../../common/stylus/mixin.styl"
  btn-active($bg, $border = null)
    &.pot-btn_active, &:active
      background: $bg
      if $border != null
        border-1px($border)

  .pot-btn
    display: block
    margin: 0
    padding: 17px 16px
    width: 100%
    text-align: center
    white-space: nowrap
    cursor: pointer
    font-size: $fontsize-large
    line-height: 1
    color: $btn-color
    background: $btn-bgc
    outline: none
    border: none
    border-radius: 2px
    box-sizing: border-box
    -webkit-tap-highlight-color: transparent
    btn-active($btn-active-bgc)
    > i
      display: inline-block
      margin-right: 4px
      font-size: 100%
      transform: scale(1.13)
      transform-origin: right center

  .pot-btn-inline
    width: auto
    display: inline-block
    vertical-align: middle
    padding: 9px 10px
    font-size: $fontsize-small
    > i
      margin-right: 2px
      transform: scale(1.14)

  .pot-btn-primary
    color: $btn-primary-color
    background: $btn-primary-bgc
    btn-active($btn-primary-active-bgc)

  .pot-btn-light
    color: $btn-light-color
    background: $btn-light-bgc
    box-shadow: $box-shadow-content
    btn-active($btn-light-active-bgc)

  .pot-btn-outline
    color: $btn-outline-color
    background: $btn-outline-bgc
    border-1px($btn-outline-bdc)
    btn-active($btn-outline-active-bgc, $btn-outline-active-bdc)

  .pot-btn-outline-primary
    color: $btn-outline-primary-color
    background: $btn-outline-primary-bgc
    border-1px($btn-outline-primary-bdc)
    btn-active($btn-outline-primary-active-bgc, $btn-outline-primary-active-bdc)

  .pot-btn_disabled
    color: $btn-disabled-color
    background: $btn-disabled-bgc
    border-1px($btn-disabled-bdc)
    btn-active($btn-disabled-bgc, $btn-disabled-bdc)
</style>
