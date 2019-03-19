require('./index.less');
var $=require('jquery')

function Bottom(options){
	options=options||{};
	options.btn=options.btn||['1','2'];
	options.confirm=options.confirm||function(){};
	var btn=options.btn;
	var confirm=options.confirm;
	var div=document.createElement('div');
	div.className="bottom";
	div.innerHTML=require('./index.tpl')({btn});
	document.body.appendChild(div);
	function cancel(){
		if(!div) return;
		div.className="bottom active";
		setTimeout(()=>{
			$(div).remove();
			delete Bottom.cancel;
		},250)
	}
	$(div).click(function(e){
		cancel()
		if($(e.target).hasClass('btn')){
			var index=$(e.target).attr('data');
			confirm&&confirm.call(this,index)
		}
	})
	Bottom.cancel=cancel
}

export default Bottom;