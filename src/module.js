export function markerClick(marker,obj){//点击标注时触发事件
	var that=this;
	var lnglat=obj.lnglat;
	var sContent = require('./components/dialog.tpl')();
	var InfoContent=new T.InfoWindow();
	InfoContent.setContent(sContent);
	marker.openInfoWindow(InfoContent,lnglat);
	$(()=>{
		scbc.call(that,marker)
	})
};
export function scbc(overLay,type){
	var that=this;
	$('.buttons .sc').click(function(){//点击删除
		that.$http.post('/del',{
			bid:overLay.bid,
			tid:overLay.tid
		})
		map.removeOverLay(overLay);
		map.closeInfoWindow()
	})
	$(".buttons .bj").click(function(){//点击编辑
		console.log($('.dialogb'))
		$('.dialogb').find('input').attr('disabled',false)
		$('.dialogb').find('select').attr('disabled',false)
	})
	$('.buttons .bc').click(function(){//点击保存
		if(!type){//点
			console.log(overLay.getLngLat())
			that.$http.post('/save',{
				
			})
		}else if(type=='xian'){
			console.log(overLay.getLngLats())
		}
	})
}
