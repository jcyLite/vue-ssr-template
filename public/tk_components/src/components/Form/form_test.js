export default {
	methods:{
		blur(name,val){
			console.log(1212);
			var regular = /^[\s]*$/;
			if(!val){
				this.$createDialog({
					type: 'alert',
					title:'错误提示',
					content:'请输入'+name+'的内容',
					icon: 'cubeic-alert'
				}).show()
				return false;
			}else if(regular.test(val)) {
		 		this.$createDialog({
					type: 'alert',
					title:'错误提示',
					content:'输入'+name+'不能全部为空',
					icon: 'cubeic-alert'
				}).show()
				return false;
		    }else{
		    	return true
		    }
		}
	}
}
