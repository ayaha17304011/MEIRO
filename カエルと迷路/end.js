canv = null;
ctx = null;

<!--框架-->
<!--フレーム-->
frame = 1000/60;

logointerval = null;
keypressevent = null;

function init(){
	
		logoover();

}

function logoover(){
	starting();
}

<!--スタートムービーvideo-->
function starting(){
	var vide = document.getElementById("vide");
	vide.className += ' on';
	vide.play();
	
	vide.addEventListener('ended',function(){
		vide.className = '';
		vide.ended = window.location.href="gamestart.html" ; 

	
	});
vide.addEventListener('pause',function(){
		vide.className = '';
		vide.pause = window.location.href="gamestart.html" ; 
	});	
	document.onkeydown=function(e){  //?整个?面文档?听 
	var keyNum=window.event ? e.keyCode :e.which;  //?取被按下的?? 

	if(keyNum==13){ 
	vide.pause();
		
		}
	} 	
}


