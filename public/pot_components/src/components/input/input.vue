<template>
  <div class="pot-input" :class="{'pot-input_active': isFocus}">
    <div class="pot-input-prepend" v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </div>
    <div class="pot-search-icon" :style="{'background-image':`url(${require('./search.png')})`}" v-if="type=='search'">
    </div>
    <input
      class="pot-input-field"
      ref="input"
      v-model="inputValue"
      v-bind="$props"
      :type="_type"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="changeHander"
    >
    <div class="pot-input-append" v-if="$slots.append || _showClear || _showPwdEye">
      <div class="pot-input-clear" v-if="_showClear" @click="handleClear">
        <i class="potic-wrong"></i>
      </div>
      <div class="pot-input-eye" v-if="_showPwdEye" @click="handlePwdEye">
        <i :class="eyeClass"></i>
      </div>
      <slot name="append"></slot>
    </div>
  </div> 
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'pot-input'
  const EVENT_INPUT = 'input'
  const EVENT_CHANGE = 'change'
  const EVENT_BLUR = 'blur'
  const EVENT_FOCUS = 'focus'

  export default {
    name: COMPONENT_NAME,
    props: {
      value: [String, Number],
      type: {
        type: String,
        default: 'text'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      placeholder: String,
      readonly: {
        type: Boolean,
        default: false
      },
      autofocus: {
        type: Boolean,
        default: false
      },
      autocomplete: {
        type: [Boolean, String],
        default: false
      },
      name: String,
      id: String,
      form: String,
      minlength: Number,
      maxlength: Number,
      resize: String,
      min: Number,
      max: Number,
      step: Number,
      tabindex: String,
      clearable: {
        type: [Boolean, Object],
        default: true
      },
      eye: {
        type: [Boolean, Object],
        default: false
      }
    },
    data() {
      return {
        inputValue: this.value,
        isFocus: false,
        formatedClearable: {
          visible: false,
          blurHidden: true
        },
        formatedEye: {
          open: false,
          reverse: false
        }
      }
    },
    computed: {
      _type() {
        const type = this.type
        if (type === 'password' && this.eye && this.pwdVisible) {
          return 'text'
        }
        return type
      },
      _showClear() {
        let visible = this.formatedClearable.visible && this.inputValue && !this.readonly && !this.disabled
        if (this.formatedClearable.blurHidden && !this.isFocus) {
          visible = false
        }
        return visible
      },
      _showPwdEye() {
        return this.type === 'password' && this.eye && !this.disabled
      },
      pwdVisible() {
        const eye = this.formatedEye
        return eye.reverse ? !eye.open : eye.open
      },
      eyeClass() {
        return this.formatedEye.open ? 'potic-eye-visible' : 'potic-eye-invisible'
      }
    },
    watch: {
      value(newValue) {
        this.inputValue = newValue
      },
      inputValue(newValue) {
        this.$emit(EVENT_INPUT, newValue)
      },
      clearable: {
        handler() {
          this.formatClearable()
        },
        deep: true,
        immediate: true
      },
      eye: {
        handler() {
          this.formateEye()
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      changeHander(e) {
        this.$emit(EVENT_CHANGE, e)
      },
      formatClearable() {
        if (typeof this.clearable === 'boolean') {
          this.formatedClearable.visible = this.clearable
        } else {
          Object.assign(this.formatedClearable, this.clearable)
        }
      },
      formateEye() {
        if (typeof this.eye === 'boolean') {
          this.formatedEye.open = this.eye
        } else {
          Object.assign(this.formatedEye, this.eye)
        }
      },
      handleFocus(e) {
        this.$emit(EVENT_FOCUS, e)
        this.isFocus = true
      },
      handleBlur(e) {
        this.$emit(EVENT_BLUR, e)
        this.isFocus = false
      },
      handleClear(e) {
        this.inputValue = ''
        this.$refs.input.focus()
      },
      handlePwdEye() {
        this.formatedEye.open = !this.formatedEye.open
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @require "../../common/stylus/variable.styl"
  @require "../../common/stylus/mixin.styl"
  @require "./index.less";
  .pot-input
    display: flex
    align-items: center
    font-size: $fontsize-medium
    line-height: 1.429
    background-color: $input-bgc
  .pot-input-field
    display: block
    flex: 1
    width: 100%
    padding: 10px
    padding-left:19px
    box-sizing: border-box
    color: $input-color
    line-height: inherit
    background-color: inherit
    border-radius: 2px
    outline: none
    &::-webkit-input-placeholder
      color: $input-placeholder-color!important
      text-overflow: ellipsis
    + .pot-input-append
      .pot-input-clear, .pot-input-eye
        &:first-child
          margin-left: -5px
  .pot-input_active
    &::after
      border-color: $input-focus-border-color
  .pot-input-prepend, .pot-input-append
    display: flex
    align-items: center
  .pot-input-clear, .pot-input-eye
    width: 1em
    height: 1em
    line-height: 1
    padding: 10px
    box-sizing: content-box
    color: $input-clear-icon-color
    > i
      display: inline-block
      transform: scale(1.2)
  .pot-input-eye
    >
      .potic-eye-invisible, .potic-eye-visible
        transform: scale(1.4)
</style>
