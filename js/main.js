/*var popAds =document.getElementById('pop-ads');
var adClose = document.getElementById('ad-close');
adClose.onclick = function () {
	popAds.className = "hide";
}*/
window.onload = function() {
	var popAds = getElement('#pop-ads');
	var addHeight = 1; //每次循环增加的高度
	popAds.style.bottom = '-180px';
	var timer = setInterval(function(){
		var bottoms = parseInt(popAds.style.bottom);
		popAds.style.bottom = bottoms + addHeight + 'px';
		if (parseInt(popAds.style.bottom) === 0) {
			clearInterval(timer);
		}
	},10)

	var adClose = getElement('#ad-close');
	adClose.addEventListener('click',function(){ //指定元素添加事件
		if (this.timer) {
			clearInterval(this.timer);
		}
		var timers = setInterval(function(){
			var bottomss = parseInt(popAds.style.bottom);
			popAds.style.bottom = bottoms + addHeight + 'px';
			if (parseInt(popAds.style.bottom) === -180) {
				clearInterval(timers);
			}
		},10)
	})
}

//判断是ID还是class类，获取元素
function getElement(el) {
	var ele = el.substr(1);
	return el.substr(0,1) === '#' ? document.getElementById(ele) : document.getElementsByClassName(ele)[0];
}