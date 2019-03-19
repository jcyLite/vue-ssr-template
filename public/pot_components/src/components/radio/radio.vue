<template>
  <div class="pot-radio" :class="_containerClass" :data-pos="position">
    <label class="pot-radio-wrap" :class="_wrapClass">
      <input class="pot-radio-input" type="radio" :disabled="option.disabled" v-model="radioValue" :value="computedOption.value">
      <span class="pot-radio-ui potic-round-border">
        <i></i>
      </span>
      <slot>
        <span class="pot-radio-label">{{computedOption.label}}</span>
      </slot>
    </label>
  </div>
</template>

<script type="text/ecmascript-6">
const COMPONENT_NAME = 'pot-radio'
const EVENT_INPUT = 'input'

export default {
  name: COMPONENT_NAME,
  props: {
    value: [String, Number],
    option: {
      type: [String, Object],
      required: true
    },
    position: {
      type: String,
      default: 'left'
    },
    hollowStyle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      radioValue: this.value
    }
  },
  watch: {
    value(newV) {
      this.radioValue = newV
    },
    radioValue(newV) {
      if (typeof this.value === 'number') {
        newV = Number(newV)
      }
      this.$emit(EVENT_INPUT, newV)
    }
  },
  computed: {
    computedOption() {
      const option = this.option
      if (typeof option === 'string') {
        return {
          value: option,
          label: option
        }
      }
      return option
    },
    _containerClass() {
      const option = this.computedOption
      return {
        'pot-radio-hollow': this.hollowStyle,
        'pot-radio_selected': this.radioValue === option.value,
        'pot-radio_disabled': option.disabled,
        'border-right-1px': this.$parent.horizontal
      }
    },
    _wrapClass() {
      if (!this.$parent.horizontal) {
        return 'border-bottom-1px'
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @require "../../common/stylus/variable.styl"
  @require "../../common/stylus/mixin.styl"
  $ui-width = 1.42em
  .pot-radio
    position: relative
    padding: 0 16px
    text-align: left
    font-size: 100%
    color: $radio-color
    &[data-pos="right"]
      .pot-radio-ui
        margin-right: 0
        position: absolute
        right: 0
      .pot-radio-label
        margin-right: $ui-width
  .pot-radio-wrap
    position: relative
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    height: 100%
    padding: 11px 0
    line-height: 1.5
    word-break: break-word
    word-wrap: break-word
  .pot-radio-input
    z-index: 1
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    opacity: 0
  .pot-radio-ui
    position: relative
    width: 1em
    height: 1em
    margin-right: $ui-width - 1em
    line-height: 1
    color: transparent
    background-color: transparent
    border-radius: 50%
    &::before, i
      transition: all .2s
    &::before
      color: $radio-icon-color
      display: inline-block
      transform: scale(1.24)
    i
      position: absolute
      top: 0
      left: 0
      overflow: hidden
      width: 100%
      height: 100%
      border-radius: 50%
      transform: scale(.4)
      &::before
        content: ""
        position: absolute
        top: 50%
        left: 50%
        width: 50%
        height: 50%
        transform: translate(-50%, -50%) scale(.8)
        // background-color: transparent
        border-radius: 50%
  .pot-radio_selected
    .pot-radio-ui
      background-color: $radio-selected-icon-bgc
      &::before
        color: transparent
      i
        transform: scale(1)
        // color: $radio-selected-icon-color
        &::before
          background-color: $radio-selected-icon-color
  .pot-radio_disabled
    .pot-radio-ui
      background-color: $radio-disabled-icon-bgc
      &::before, i
        transition: none
      &::before
        color: transparent
  .pot-radio-hollow
    &.pot-radio_selected, &.pot-radio_disabled
      .pot-radio-ui
        background-color: transparent
        i::before
          transform: translate(-50%, -50%) scale(1)
    &.pot-radio_selected
      .pot-radio-ui
        &::before
          color: $radio-hollow-selected-icon-color
        i
          &::before
            background-color: $radio-hollow-selected-icon-color
    &.pot-radio_disabled
      .pot-radio-ui
        &::before
          color: $radio-hollow-disabled-icon-color
      &.pot-radio_selected
        .pot-radio-ui
          i
            &::before
              background-color: $radio-hollow-disabled-icon-color
</style>

