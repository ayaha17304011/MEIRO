canv = null;
ctx = null;

<!--框架-->
<!--フレーム-->
frame = 1000/60;

logointerval = null;
keypressevent = null;

function init(){
	showlogo();
	<!--當按下任意鍵時起動後面function stoplogo-->
	<!--キーを押すとstoplogoを起動する>
	window.addEventListener("keypress", function stoplogo(e){
		
		clearInterval(logointerval);
		
		removeEventListener("keypress", stoplogo);
		logoover();
	}, false);
}
<!--設定一開始進去的頁面-->
<!--トップページを設定(変更予定)-->
function showlogo(){
	logointerval = setInterval( function() {
		
		
	
		
		<!--設定進入頁面畫布顏色-->
		<!--トップ画面の設定-->
		
	
	}, 1000/60);
	
}
function logoover(){
	starting();
}

<!--スタートムービーvideo-->
function starting(){
	var videe = document.getElementById("videe");
	videe.className += ' aaa';
	videe.play();
	
	videe.addEventListener('ended',function(){
		videe.className = '';
		videe.ended = window.location.href="stage1.html" ; 

	
	});
videe.addEventListener('pause',function(){
		videe.className = '';
		videe.pause = window.location.href="stage1.html" ; 
	});	
	document.onkeydown=function(e){  //对整个页面文档监听 
	var keyNum=window.event ? e.keyCode :e.which;  //获取被按下的键值 

	if(keyNum==13){ 
	videe.pause();
		
		}
	} 	
}
