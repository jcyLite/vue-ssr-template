import {
  /* eslint-disable no-unused-vars */
  Style,
  // locale
  Locale,
  // basic
  Button,
  Loading,
  Tip,
  Toolbar,
  TabBar,
  TabPanels,
  Header,
  Container,
  // form
  Checkbox,
  CheckboxGroup,
  Checker,
  Radio,
  RadioGroup,
  Input,
  Textarea,
  Select,
  Switch,
  Rate,
  Validator,
  Upload,
  Form,
  // popup
  Popup,
  Toast,
  Picker,
  CascadePicker,
  DatePicker,
  TimePicker,
  SegmentPicker,
  Dialog,
  ActionSheet,
  Drawer,
  ImagePreview,
  // scroll
  Scroll,
  Slide,
  IndexList,
  Swipe,
  Sticky,
  ScrollNav,
  ScrollNavBar,
  // module
  BetterScroll,
  createAPI
} from './module'
import { processComponentName } from './common/helpers/util'

const components = [
  // locale
  Locale,
  // basic
  Button,
  Loading,
  Tip,
  Toolbar,
  TabBar,
  TabPanels,
  Header,
  Container,
  // form
  Checkbox,
  CheckboxGroup,
  Checker,
  Radio,
  RadioGroup,
  Input,
  Textarea,
  Select,
  Switch,
  Rate,
  Validator,
  Upload,
  Form,
  // popup
  Popup,
  Toast,
  Picker,
  CascadePicker,
  DatePicker,
  TimePicker,
  SegmentPicker,
  Dialog,
  ActionSheet,
  Drawer,
  ImagePreview,
  // scroll
  Scroll,
  Slide,
  IndexList,
  Swipe,
  Sticky,
  ScrollNav,
  ScrollNavBar
]

function install(Vue) {
  if (install.installed) {
    return
  }
  install.installed = true
  components.forEach((Component) => {
    // ignore radio
    if (Component === Radio) {
      return
    }
    Component.install(Vue)
  })
}

const Pot = {
  /* eslint-disable no-undef */
  version: 1.0,
  install,
  BScroll: BetterScroll,
  createAPI
}

components.forEach((Component) => {
  const name = processComponentName(Component, {
    firstUpperCase: true
  })
  Pot[name] = Component
})

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default Pot
