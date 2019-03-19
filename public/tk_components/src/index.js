import ThankComponents from './components';
import ThankCommon from './common';
import './style/index.less';
const Thank={
  version:1.0,
  install(Vue){
  	Vue.use(ThankComponents)
  	Vue.use(ThankCommon)
  }
}
export default Thank;