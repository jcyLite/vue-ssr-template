import createAPI from '../../common/helpers/create-api'
import { tip } from '../../common/helpers/debug'

export default function addSelectFriend(Vue, SelectFriend) {
  const SelectFriendAPI = createAPI(Vue, SelectFriend, ['select', 'value-change', 'cancel', 'change'])
  SelectFriendAPI.before((data, renderFn, single) => {
    if (single) {
      tip('Picker component can not be a singleton.')
    }
  })
}
