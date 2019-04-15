/*var popAds =document.getElementById('pop-ads');
var adClose = document.getElementById('ad-close');
adClose.onclick = function () {
	popAds.className = "hide";
}*/
function popAd() {
	var popAds = getElement('#pop-ads');
	var addHeight = 1; //每次循环增加的高度
	popAds.style.bottom = '-180px';
	var timer = setInterval(function(){
		var bottoms = parseInt(popAds.style.bottom);
		popAds.style.bottom = bottoms + addHeight + 'px';
		if (parseInt(popAds.style.bottom) === 0) {
			clearInterval(timer);
		}
	},5)

	var adClose = getElement('#ad-close');
	adClose.addEventListener('click',function(){ //指定元素添加事件
		if (this.timer) {
			clearInterval(this.timer);
		}
		var timers = setInterval(function(){
			var bottomss = parseInt(popAds.style.bottom);
			popAds.style.bottom = bottomss - addHeight + 'px';
			if (parseInt(popAds.style.bottom) === -180) {
				clearInterval(timers);
			}
		},5)
	})
}

//右侧悬浮在线客服
//onresize 事件会在窗口或框架被调整大小时发生
//onscroll 事件在元素滚动条在滚动时触发
window.onload = window.onresize = window.onscroll = function(){
    var rSlider = document.getElementById("right-slide");
    var iScrollTop = document.documentElement.scrollTop || document.body.scrollTop; //获取页面往下滚动时被卷去的距离
    setTimeout(function() {
		clearInterval(rSlider.timer); //首先需要关闭定时器, rSlider.timer的写法是给自身加了个timer属性，相当于定时器私有化了，这样写的好处是当事件发生太快时，不用争抢定时器了，尤其在多物体运动时
		var iTop = parseInt((document.documentElement.clientHeight - rSlider.offsetHeight) / 2) + iScrollTop ; //定义变量iTop表示(当前页面的显示高度-目标元素的高度)/2 + 页面滚动时滚去的高度，其实就是目标元素居中的起始top值
		rSlider.timer = setInterval(function() { //定义定时器，30ms执行一次
		var iSpeed = (iTop - rSlider.offsetTop) / 8; //定义速度，后面除以的数值可以自定义，表示动画运行的速度
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed); //由于缓冲运动要取整，如果速度>0的话向上取整否则向下取整
		rSlider.offsetTop == iTop ? clearInterval(rSlider.timer) : (rSlider.style.top = rSlider.offsetTop + iSpeed + "px"); //如果目标元素的top值等于居中位置所在的top值则清除浮动，否则目标元素的高就等于自身在当前版面的offsetTop值+速度，这里速度可能就是负值了（向下滚动时）
		},
		30)},100)
}

//判断是ID还是class类，获取元素
function getElement(el) {
	var ele = el.substr(1);
	return el.substr(0,1) === '#' ? document.getElementById(ele) : document.getElementsByClassName(ele)[0];
}

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function" ) {
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

addLoadEvent(popAd);
addLoadEvent(rSlider);
