import type from './util/type.js'

const ThankCommon={
	install(Vue){
		Vue.prototype.$tkType=type;
	}
}
export default ThankCommon