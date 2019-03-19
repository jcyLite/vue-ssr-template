<template>
  <form ref="form" class="pot-form" :class="formClass" :action="action" @submit="submitHandler" @reset="resetHandler">
    <slot>
      <pot-form-group v-for="(group, index) in groups" :fields="group.fields" :legend="group.legend" :key="index" />
    </slot>
  </form>
</template>

<script>
  import { dispatchEvent } from '../../common/helpers/dom'
  import { cb2PromiseWithResolve } from '../../common/helpers/util'
  import potFormGroup from './form-group.vue'
  import LAYOUTS from './layouts'
  import mixin from './mixin'

  const COMPONENT_NAME = 'pot-form'
  const EVENT_SUBMIT = 'submit'
  const EVENT_RESET = 'reset'
  const EVENT_VALIDATE = 'validate'
  const EVENT_VALID = 'valid'
  const EVENT_INVALID = 'invalid'

  export default {
    name: COMPONENT_NAME,
    mixins: [mixin],
    props: {
      action: String,
      model: {
        type: Object,
        default() {
          /* istanbul ignore next */
          return {}
        }
      },
      schema: {
        type: Object,
        default() {
          /* istanbul ignore next */
          return {}
        }
      },
      options: {
        type: Object,
        default() {
          return {
            scrollToInvalidField: false,
            layout: LAYOUTS.STANDARD
          }
        }
      },
      immediateValidate: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        validatedCount: 0,
        dirty: false,
        firstInvalidField: null,
        firstInvalidFieldIndex: -1
      }
    },
    computed: {
      groups() {
        const schema = this.schema
        const groups = schema.groups || []
        if (schema.fields) {
          groups.unshift({
            fields: schema.fields
          })
        }
        return groups
      },
      layout() {
        const options = this.options
        const layout = (options && options.layout) || LAYOUTS.STANDARD
        return layout
      },
      formClass() {
        const invalid = this.invalid
        const valid = this.valid
        const layout = this.layout
        return {
          'pot-form_standard': layout === LAYOUTS.STANDARD,
          'pot-form_groups': this.groups.length > 1,
          'pot-form_validating': this.validating,
          'pot-form_pending': this.pending,
          'pot-form_valid': valid,
          'pot-form_invalid': invalid,
          'pot-form_classic': layout === LAYOUTS.CLASSIC,
          'pot-form_fresh': layout === LAYOUTS.FRESH
        }
      }
    },
    watch: {
      validatedCount() {
        this.$emit(EVENT_VALIDATE, {
          validity: this.validity,
          valid: this.valid,
          invalid: this.invalid,
          dirty: this.dirty,
          firstInvalidFieldIndex: this.firstInvalidFieldIndex
        })
      }
    },
    beforeCreate() {
      this.form = this
      this.fields = []
      this.validity = {}
    },
    mounted() {
      if (this.immediateValidate) {
        this.validate()
      }
    },
    methods: {
      submit() {
        dispatchEvent(this.$refs.form, 'submit')
      },
      reset() {
        dispatchEvent(this.$refs.form, 'reset')
      },
      submitHandler(e) {
        const submited = (submitResult) => {
          if (submitResult) {
            this.$emit(EVENT_VALID, this.validity)
            this.$emit(EVENT_SUBMIT, e, this.model)
          } else {
            e.preventDefault()
            this.$emit(EVENT_INVALID, this.validity)
          }
        }
        if (this.valid === undefined) {
          this._submit(submited)
          if (this.validating || this.pending) {
            // async validate
            e.preventDefault()
          }
        } else {
          submited(this.valid)
        }
      },
      resetHandler(e) {
        this._reset()
        this.$emit(EVENT_RESET, e)
      },
      _submit(cb) {
        this.validate(() => {
          if (this.invalid) {
            if (this.options.scrollToInvalidField && this.firstInvalidField) {
              this.firstInvalidField.$el.scrollIntoView()
            }
          }
          cb && cb(this.valid)
        })
      },
      _reset() {
        this.fields.forEach((fieldComponent) => {
          fieldComponent.reset()
        })
        this.setValidity()
        this.setValidating()
        this.setPending()
      },
      validate(cb) {
        const promise = cb2PromiseWithResolve(cb)
        if (promise) {
          cb = promise.resolve
        }
        let doneCount = 0
        const len = this.fields.length
        this.originValid = undefined
        this.fields.forEach((fieldComponent) => {
          fieldComponent.validate(() => {
            doneCount++
            if (doneCount === len) {
              // all done
              cb && cb(this.valid)
            }
          })
        })
        return promise
      },
      updateValidating() {
        const validating = this.fields.some((fieldComponent) => fieldComponent.validating)
        this.setValidating(validating)
      },
      updatePending() {
        const pending = this.fields.some((fieldComponent) => fieldComponent.pending)
        this.setPending(pending)
      },
      setValidating(validating = false) {
        this.validating = validating
      },
      setPending(pending = false) {
        this.pending = pending
      },
      updateValidity(modelKey, valid, result, dirty) {
        const curResult = this.validity[modelKey]
        if (curResult && curResult.valid === valid && curResult.result === result && curResult.dirty === dirty) {
          return
        }
        this.setValidity(modelKey, {
          valid,
          result,
          dirty
        })
      },
      setValidity(key, val) {
        let validity = {}
        if (key) {
          Object.assign(validity, this.validity)
          if (val === undefined) {
            delete validity[key]
          } else {
            validity[key] = val
          }
        }

        let dirty = false
        let invalid = false
        let valid = true
        let firstInvalidFieldKey = ''
        this.fields.forEach((fieldComponent) => {
          const modelKey = fieldComponent.fieldValue.modelKey
          if (modelKey) {
            const retVal = validity[modelKey]
            if (retVal) {
              if (retVal.dirty) {
                dirty = true
              }
              if (retVal.valid === false) {
                valid = false
              } else if (valid && !retVal.valid) {
                valid = retVal.valid
              }

              if (!invalid && retVal.valid === false) {
                // invalid
                invalid = true
                firstInvalidFieldKey = modelKey
              }
            } else if (fieldComponent.hasRules) {
              if (valid) {
                valid = undefined
              }
              validity[modelKey] = {
                valid: undefined,
                result: {},
                dirty: false
              }
            }
          }
        })
        this.validity = validity
        this.dirty = dirty
        this.originValid = valid
        this.setFirstInvalid(firstInvalidFieldKey)
        this.validatedCount++
      },
      setFirstInvalid(key) {
        if (!key) {
          this.firstInvalidField = null
          this.firstInvalidFieldIndex = -1
          return
        }
        this.fields.some((fieldComponent, index) => {
          if (fieldComponent.fieldValue.modelKey === key) {
            this.firstInvalidField = fieldComponent
            this.firstInvalidFieldIndex = index
            return true
          }
        })
      },
      addField(fieldComponent) {
        this.fields.push(fieldComponent)
      },
      destroyField(fieldComponent) {
        const i = this.fields.indexOf(fieldComponent)
        this.fields.splice(i, 1)
        this.setValidity(fieldComponent.fieldValue.modelKey)
      }
    },
    beforeDestroy() {
      this.form = null
      this.firstInvalidField = null
    },
    components: {
      potFormGroup
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @require "../../common/stylus/variable.styl"
  @require "../../common/stylus/mixin.styl"

  .pot-form
    position: relative
    font-size: $fontsize-large
    line-height: 1.429
    color: $form-color
    background-color: $form-bgc
  .pot-form_groups
    .pot-form-group-legend
      padding: 10px 15px
      &:empty
        padding-top: 5px
        padding-bottom: 5px
  .pot-form_standard
    .pot-form-item
      min-height: 46px
    .pot-form-field
      flex: 1
      font-size: $fontsize-medium
    .pot-validator
      display: flex
      align-items: center
      position: relative
    .pot-validator_invalid
      color: $form-invalid-color
    .pot-validator-content
      flex: 1
    .pot-validator-msg-def
      font-size: 0
    .pot-validator_invalid
      .pot-validator-msg
        &::before
          content: "\e614"
          padding-left: 5px
          font-family: "pot-icon"!important
          font-size: $fontsize-large-xx
          font-style: normal
          -webkit-font-smoothing: antialiased
          -webkit-text-stroke-width: 0.2px
          -moz-osx-font-smoothing: grayscale
    .pot-form-label
      width: 100px
      padding-right: 10px
    .pot-checkbox-group, .pot-radio-group
      &::before, &::after
        display: none
    .pot-input
      input
        padding: 13px 0
        background-color: transparent
      &::after
        display: none
    .pot-textarea-wrapper
      padding: 13px 0
      height: 20px
      &.pot-textarea_expanded
        height: 60px
        padding-bottom: 20px
        .pot-textarea-indicator
          bottom: 2px
      .pot-textarea
        padding: 0
        background-color: transparent
      &::after
        display: none
    .pot-select
      padding-left: 0
      background-color: transparent
      &::after
        display: none
    .pot-upload-def
      padding: 5px 0
      .pot-upload-btn, .pot-upload-file
        margin: 5px 10px 5px 0
  .pot-form_classic
    .pot-form-item
      display: block
      padding: 15px
      &:last-child
        padding-bottom: 30px
      &::after
        display: none
      .pot-validator-msg
        position: absolute
        margin-top: 3px
        &::before
          display: none
      .pot-validator-msg-def
        font-size: $fontsize-small
    .pot-form-item_btn
      padding-top: 0
      padding-bottom: 0
      &:last-child
        padding-bottom: 0
    .pot-form-label
      padding-bottom: 15px
  .pot-form_fresh
    .pot-form-item
      display: block
      padding: 2em 15px 10px
      &::after
        display: none
      .pot-validator-msg
        position: absolute
        top: 1em
        right: 15px
        bottom: auto
        margin-top: -.4em
        font-size: $fontsize-small
        &::before
          display: none
      .pot-validator-msg-def
        font-size: 100%
    .pot-form-item_btn
      padding-top: 0
      padding-bottom: 0
      &:last-child
        padding-bottom: 0
    .pot-form-label
      position: absolute
      top: 1em
      margin-top: -.4em
      font-size: $fontsize-small
</style>
