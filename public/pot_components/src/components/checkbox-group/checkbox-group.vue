<template>
  <div class="pot-checkbox-group" ref="group" :class="groupClass" :data-horz="horizontal">
    <slot>
      <pot-checkbox
        v-for="(option, index) in options"
        :key="index"
        :option="option"
        :shape="shape"
        :position="position"
        :hollow-style="hollowStyle" />
    </slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import potCheckbox from '../checkbox/checkbox.vue'
  const COMPONENT_NAME = 'pot-checkbox-group'

  const EVENT_INPUT = 'input'
  const EVENT_CHECKED = 'checked'
  const EVENT_CANCLE_CHECKED = 'cancel-checked'

  export default {
    name: COMPONENT_NAME,
    props: {
      value: {
        type: Array
      },
      horizontal: {
        type: Boolean,
        default: false
      },
      shape: {
        type: String,
        default: 'circle'
      },
      position: {
        type: String,
        default: 'left'
      },
      hollowStyle: {
        type: Boolean,
        default: false
      },
      options: {
        type: Array,
        default() {
          return []
        }
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: Infinity
      }
    },
    data () {
      return {
        _value: [],
        _checkboxGroup: true
      }
    },
    computed: {
      groupClass() {
        if (!this.horizontal) {
          return 'border-top-1px border-bottom-1px'
        }
      }
    },
    watch: {
      value: {
        immediate: true,
        handler (newValue, oldValue) {
          this._value = this.value.concat()
        }
      }
    },
    mounted () {
      this.$on(EVENT_CHECKED, (value) => {
        if (this._value.length < this.max) {
          this._value.push(value)
        }
        this.$emit(EVENT_INPUT, this._value)
      })
      this.$on(EVENT_CANCLE_CHECKED, (value) => {
        if (this._value.length > this.min) {
          const index = this._value.indexOf(value)
          this._value.splice(index, 1)
        }
        this.$emit(EVENT_INPUT, this._value)
      })
    },
    components: {
      potCheckbox
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @require "../../common/stylus/variable.styl"
  @require "../../common/stylus/mixin.styl"

  .pot-checkbox-group
    z-index: 1
    overflow: hidden
    background-color: $checkbox-group-bgc
    .pot-checkbox
      &:last-child
        .pot-checkbox-wrap
          border-none()
  .pot-checkbox-group[data-horz="true"]
    display: flex
    padding-left: 0
    border-1px($checkbox-group-horizontal-bdc, 2px)
    border-radius: 2px
    .pot-checkbox
      flex-fix()
      text-align: center
      padding-left: 10px
      padding-right: 10px
      &:after
        border-color: $checkbox-group-horizontal-bdc
      &:last-child
        border-none()
      &[data-pos="right"]
        .pot-checkbox-ui
          position: relative
          margin-left: .42em
          order: 1
        .pot-checkbox-label
          margin-right: 0
    .pot-checkbox-wrap
      justify-content: center
</style>
