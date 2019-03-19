import Popup from '../../components/popup/popup.vue'
import addPopup from './api'

Popup.install = function (Vue) {
	console.log(Popup.name)
  Vue.component(Popup.name, Popup)
  addPopup(Vue, Popup)
}

export default Popup
