//js Module
import CreateAPI from 'vue-create-api'
//vue Module
import detailTextarea from './detail-textarea'
import buttonGroup from './button/group.vue'
import container from './container'
import header from './header'
import Button from './button';
import sign from './sign';
import content from './content'
import Form from './Form/Form.vue';
import menu from './menu';
import popup from './popup/popup.vue'
import Detail from './detail'
import addMinus from './add-minus'
import Textarea from './textarea'
import Cellfour from './Cell/Cell_Four.vue';
import cellThree from './Cell/Cell_three.vue';
import Switch from './Switch/Switch.vue';
import PopShoppingCar from './pop-shopping-car'
import Scroll from './scroll'
import CellWithImage from './cell/cell-with-image.vue';
import cellBox from './cell/cell-box.vue'
import search from './search'
import popBottom from './pop-bottom'
import selectTime from './Form/select-time.vue'
import popRight from './pop-right'
import filter from './filter'
import fiterItem from './filter/item.vue'
import Image from './image'
import imageCell from './image/cell.vue'
//add to vue.prototype
import Bottom from './Poper/Bottom';
import Tip from './Poper/Tip';
import Voice from './Cordova_Plugin/Voice';
import popMiddle from './pop-middle'
import title from './title'
import uploadAudio from './upload-audio'
import uploadVideo from './upload-video'
import uploadPhoto from './upload-photo'
import detailAudio from './detail-audio'
import detailVideo from './detail-video'
import detailPhoto from './detail-photo'
import playVideo from './play-video'
import nodata from './nodata'
import cellOne from './Cell/cell-one.vue'
//style Module
import './Style/Style.less';
function useCreateAPI(options){
	
}
const ThankComponents={
  version:1.0,
  install(Vue){
  	Vue.use(CreateAPI,{componentPrefix: 'tk-'})
  	Vue.component('tk-pop-shopping-car',PopShoppingCar)
  	Vue.createAPI(PopShoppingCar,['confirm', 'cancel', 'close', 'btn-click', 'link-click'], true)
  	Vue.component('tk-pop-bottom',popBottom)
  	Vue.createAPI(popBottom,['data'],true)
  	Vue.extend(popMiddle);
  	Vue.component('tk-pop-middle',popMiddle)
  	Vue.createAPI(popMiddle,['data'],true)
  	Vue.component('tk-play-video',playVideo)
  	Vue.createAPI(playVideo,['data'],true)
  	Vue.component('tk-detail',Detail)
  	Vue.component('tk-header',header)
  	Vue.component('tk-popup',popup)
  	Vue.component('tk-form',Form)
  	Vue.component('tk-menu',menu)
  	Vue.component('tk-switch',Switch)
	Vue.component('tk-button',Button)
	Vue.component('tk-detail-textarea',detailTextarea)
	Vue.component('tk-button-group',buttonGroup)
  	Vue.component('tk-add-minus',addMinus)
  	Vue.component('tk-scroll',Scroll)
  	Vue.component('tk-textarea',Textarea)
  	Vue.component('tk-cell-four',Cellfour)
  	Vue.component('tk-cell-three',cellThree)
  	Vue.component('tk-search',search)
  	Vue.component('tk-sign',sign)
  	Vue.component('tk-container',container)
  	Vue.component('tk-cell-with-image',CellWithImage)
  	Vue.component('tk-content',content)
  	Vue.component('tk-select-time',selectTime)
  	Vue.component('tk-pop-right',popRight)
  	Vue.component('tk-filter',filter);
  	Vue.component('tk-filter-item',fiterItem)
  	Vue.component('tk-title',title)
  	Vue.component('tk-cell-box',cellBox)
  	Vue.component('tk-image',Image)
  	Vue.component('tk-image-cell',imageCell)
  	Vue.component('tk-upload-photo',uploadPhoto)
  	Vue.component('tk-upload-audio',uploadAudio)
  	Vue.component('tk-upload-video',uploadVideo)
  	Vue.component('tk-detail-photo',detailPhoto)
  	Vue.component('tk-detail-audio',detailAudio)
  	Vue.component('tk-detail-video',detailVideo)
  	Vue.component('tk-nodata',nodata)
  	Vue.component('tk-cell-one',cellOne)
  }
}
export default ThankComponents;