export function getFormatTime(time,onlyDate){
	var a=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+(time.getDate());
	var b=time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
	if(onlyDate) return a;
	return a+' '+b
}