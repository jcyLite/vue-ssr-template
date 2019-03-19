<template>
  <div class="pot-radio-group" :class="_groupClass" :data-horz="horizontal">
    <slot>
      <pot-radio
        v-for="(option, index) in options"
        :key="index"
        :option="option"
        :position="position"
        :hollow-style="hollowStyle"
        v-model="radioValue">
      </pot-radio>
    </slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import potRadio from './radio.vue'
  const COMPONENT_NAME = 'pot-radio-group'

  const EVENT_INPUT = 'input'

  export default {
    name: COMPONENT_NAME,
    props: {
      value: [String, Number],
      options: {
        type: Array,
        default() {
          return []
        }
      },
      position: {
        type: String,
        default: 'left'
      },
      horizontal: {
        type: Boolean,
        default: false
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
        this.$emit(EVENT_INPUT, newV)
      }
    },
    computed: {
      _groupClass() {
        if (!this.horizontal) {
          return 'border-top-1px border-bottom-1px'
        }
      }
    },
    components: {
      potRadio
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @require "../../common/stylus/variable.styl"
  @require "../../common/stylus/mixin.styl"

  .pot-radio-group
    z-index: 1
    overflow: hidden
    background-color: $radio-group-bgc
    .pot-radio
      &:last-child
        .pot-radio-wrap
          border-none()
  .pot-radio-group[data-horz="true"]
    display: flex
    padding-left: 0
    border-1px($radio-group-horizontal-bdc, 2px)
    border-radius: 2px
    .pot-radio
      flex-fix()
      text-align: center
      padding-left: 10px
      padding-right: 10px
      &:after
        border-color: $radio-group-horizontal-bdc
      &:last-child
        border-none()
      &:last-child
        border-none()
      &[data-pos="right"]
        .pot-radio-ui
          position: relative
          margin-left: .42em
          order: 1
        .pot-radio-label
          margin-right: 0
    .pot-radio-wrap
      justify-content: center
</style>
