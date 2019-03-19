import SelectFriend from '../../components/select-friend/select-friend.vue'
import addSelectFriend from './api'
import Locale from '../../common/locale'

SelectFriend.install = function (Vue) {
  Vue.component(SelectFriend.name, SelectFriend)
  Locale.install(Vue)
  addSelectFriend(Vue, SelectFriend)
}

export default SelectFriend
