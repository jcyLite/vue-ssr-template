<template>
  <div class="pot-form-group">
    <p class="pot-form-group-legend">{{legend}}</p>
    <div class="pot-form-group-content">
      <slot>
        <pot-form-item
          v-for="(field, index) in fields"
          :key="index"
          :field="field"
        />
      </slot>
    </div>
  </div>
</template>

<script>
  import potFormItem from './form-item.vue'

  const COMPONENT_NAME = 'pot-form-group'
  export default {
    name: COMPONENT_NAME,
    props: {
      legend: {
        type: String,
        default: ''
      },
      fields: {
        type: Array,
        default() {
          /* istanbul ignore next */
          return []
        }
      }
    },
    beforeCreate() {
      this.form = this.$parent.form
    },
    beforeDestroy() {
      this.form = null
    },
    components: {
      potFormItem
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @require "../../common/stylus/variable.styl"
  @require "../../common/stylus/mixin.styl"

  .pot-form-group
    overflow: hidden
  .pot-form-group-legend
    font-size: $fontsize-medium
    color: $form-group-legend-color
    background-color: $form-group-legend-bgc
</style>
