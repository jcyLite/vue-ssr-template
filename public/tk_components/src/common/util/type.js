var o = {};
"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(item=>{
	o["[object " + item + "]"] = item.toLowerCase()
})
const type = {
	type:function(obj) {
		if(obj == null) {
			return obj + ""
		};
		var a=function(){
			if(typeof obj === "object" || typeof obj === "function"){
				return o[Object.prototype.toString.call(obj)] || "object"
			}else{
				return typeof obj
			}
		}();
		return a;
	},
	isFunction: function(val) {
		return type.type(val) === 'function'
	},
	isUndefined: function(val) {
		return typeof val === 'undefined'
	},
	isObject: function(val) {
		return type.type(val) === 'object'
	},
	isString: function(val) {
		return type.type(val) === 'string'
	},
	isArray: function(val) {
		return type.type(val) === 'array'
	},
	isNumber: function(val) {
		return type.type(val) === 'number'
	},
	isDate: function(val) {
		return type.type(val) === 'date'
	},
	isRegExp: function(val) {
		return type.type(val) === 'regexp'
	},
	isWindow: function(obj) {
		return obj != null && obj == obj.window
	},
	isInstance: function(a, b) {
		return a instanceof b
	},
	isDocument: function(obj) {
		return !!(obj != null && obj.nodeType && obj.nodeType == obj.DOCUMENT_NODE)
	},
	isDom: function(obj) {
		if(obj === doc) {
			return true
		} else {
			return obj instanceof HTMLElement
		}
	},
	isNative: function(e) { //检测e函数是否为原生函数
		return "function" == typeof e && /native code/.test(e.toString())
	}
}
export default type;