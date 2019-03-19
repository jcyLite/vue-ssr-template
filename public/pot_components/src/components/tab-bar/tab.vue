<template>
  <div
    class="pot-tab"
    :class="{'pot-tab_active': isActive}"
    @click="handleClick">
    <slot name="icon">
      <i :class="icon"></i>
    </slot>
    <slot>
      <div v-html="label"></div>
    </slot>
  </div>
</template>
<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'pot-tab'

  export default {
    name: COMPONENT_NAME,
    props: {
      label: {
        type: [String, Number],
        required: true
      },
      icon: {
        type: String,
        default: ''
      }
    },
    mounted () {
      this.$parent.addTab(this)
    },
    destroyed () {
      this.$parent.removeTab(this)
    },
    computed: {
      isActive () {
        return this.$parent.value === this.label
      }
    },
    methods: {
      handleClick (item) {
        this.$parent.trigger(this.label)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @require "../../common/stylus/variable.styl"

  .pot-tab
    flex: 1
    padding: 7px 0
    color: $tab-color
    text-align: center

  .pot-tab_active
    color: $tab-active-color
</style>
