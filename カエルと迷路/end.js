canv = null;
ctx = null;

<!--�y��-->
<!--�t���[��-->
frame = 1000/60;

logointerval = null;
keypressevent = null;

function init(){
	
		logoover();

}

function logoover(){
	starting();
}

<!--�X�^�[�g���[�r�[video-->
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
	document.onkeydown=function(e){  //?����?�ʕ���?�� 
	var keyNum=window.event ? e.keyCode :e.which;  //?�����I?? 

	if(keyNum==13){ 
	vide.pause();
		
		}
	} 	
}


