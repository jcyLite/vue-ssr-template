import potButton from '../button/button.vue'
import potCheckbox from '../checkbox/checkbox.vue'
import potCheckboxGroup from '../checkbox-group/checkbox-group.vue'
import potInput from '../input/input.vue'
import potRadio from '../radio/radio.vue'
import potRadioGroup from '../radio/radio-group.vue'
import potRate from '../rate/rate.vue'
import potSelect from '../select/select.vue'
import potSwitch from '../switch/switch.vue'
import potTextarea from '../textarea/textarea.vue'
import potUpload from '../upload/upload.vue'

const allComponents = [
  potButton,
  potCheckbox,
  potCheckboxGroup,
  potInput,
  potRadio,
  potRadioGroup,
  potRate,
  potSelect,
  potSwitch,
  potTextarea,
  potUpload
]

const components = {}
allComponents.forEach((Component) => {
  components[Component.name] = Component
})

export default components
