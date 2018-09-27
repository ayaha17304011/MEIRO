canv = null;
ctx = null;

<!--框架-->
frame = 1000/60;

var beginx=0;//裁減圖片的X軸坐標。從左往右遞增的。
var beginy=0;//裁減圖片的X軸坐標。從左往右遞增的。

<!--規模-->
scale = 3;

<!--生成fuction-->
function init(){
	stage = 2;
	console.log("init");
<!--取得html中ID為canva的畫布,並設畫布為2D-->
	canv = document.getElementById("canva");
	ctx = canv.getContext("2d");
	<!--生成角色並放入角色圖片-->
	chara = new Image();
	chara.src = 'boy_1_stop.png';
	<!--生成陰影並放入圖片-->
	shadow = new Image();
	shadow.src = 'shadow1.png';
	
	<!--設置初始地圖-->
	setMap('forest');
	scale = 3;
	
	showlogo();
	<!--當按下任意鍵時起動後面function stoplogo-->
	window.addEventListener("keypress", function stoplogo(e){
		setChara();
		clearInterval(logointerval);
		<!--畫人物-->
		ctx.clearRect(0, 0, canv.width, canv.height);
		removeEventListener("keypress", stoplogo);
		start();
	}, false);
}
<!--設定一開始進去的頁面-->
<!--設定一開始進去的頁面-->
function showlogo(){
	var strtext = document.getElementById("tname");
		
	logointerval = setInterval( function() {
		ctx.clearRect(0, 0, canv.width, canv.height);
		
		<!--設定進入頁面畫布顏色-->
		ctx.fillStyle = "rgb(0, 0, 0)";
	}, 1000/60);
}
	var xoff = -850;
	var yoff = -4200;
	var charaspd = 4;
	var col1;
	<!--左-->
	var left = false;
	<!--右-->
	var right = false;
	<!--上-->
	var up = false;
	<!--下-->
	var down = false;
	<!--加速-->
	var speed = false;
	<!--設置上下左右的値,每個按鈕都有一個對應的回傳値-->
	<!--a回傳値是65,s回傳値是83,d回傳値是68,w回傳値是87-->
	<!--左回傳値是37,下s回傳値是38,右回傳値是39,上回傳値是40-->
	var aa=65; var ss=83; var dd=68; var ww=87;

var i = 0;
function changImages(){
            //讓i在 0到3之間變化
            i = i % 3;
            //名字變成字符串
}

<!--各方向のサイクル変数を設定-->
var upCycle=null;
var downCycle=null;
var leftCycle=null;
var rightCycle=null;
var speedCycle=null;

function start(){
<!--監聽鍵盤按鍵事件，並回傳所按的按鍵為何-->
	<!--設置按鍵功能keydown = 按下按鈕, keyup = 放開按鈕-->
	window.addEventListener("keydown", function(e){
		<!--取得按鈕的回傳値-->
		var ky = e.keyCode;
		if(ky==aa||ky==37){
			if(left == false){
				left = true;
				leftCycle = window.setInterval("changImages(i++);", 100);
				c=s.Lef;
				bgmstart();
				window.addEventListener("keyup", function(e){
					if(e.keyCode == aa||e.keyCode == 37){
						left = false;
						clearInterval(leftCycle);
						bgmstop();
					}
				}, false);
			}
		}
		if(ky==dd||ky==39){
			if(right == false){
				right = true;
				rightCycle = window.setInterval("changImages(i++);", 100);
				c=s.Righ;
				bgmstart();
				window.addEventListener("keyup", function(e){
					if(e.keyCode == dd||e.keyCode == 39){
						right = false;
						clearInterval(rightCycle);
						bgmstop();
					}
				}, false);
			}
		}
		if(ky==ww||ky==38){
			if(up == false){
				up = true;
				upCycle = window.setInterval("changImages(i++);", 130);
				c=s.Bac;
				bgmstart();
				window.addEventListener("keyup", function(e){
					if(e.keyCode == ww||e.keyCode == 38){
						up = false;
						clearInterval(upCycle);
						bgmstop();
					}
				}, false);
			}
		}
		if(ky==ss||ky==40){
			if(down == false){
				down = true;
				downCycle = window.setInterval("changImages(i++);", 130);
				c=s.Fron;
				bgmstart();
				window.addEventListener("keyup", function(e){
					if(e.keyCode == ss||e.keyCode == 40){
						down = false;
						clearInterval(downCycle);
						bgmstop();
					}
				}, false);
			}
		}
	}, false);
	<!--間隔-->
	setInterval( function(){
		drawMap();
		moving();
		if(speed==true){
			moving();
		}
		me();
	}, frame);
}

<!--WALK AUTO-->
function bgmstart(){
	Orderprocessing1();
}
function Orderprocessing1(){
	var vid = document.getElementById("myVideo");//获取音频对象
	var start = 0;//定义循环的变量
	var times=100;//定于循环的次数
	vid.addEventListener("ended",function() {
		vid.play();//启动音频，也就是播放
		start++;//循环
		start == times && vid.pause();//也就是当循环的变量等于次数的时候，就会终止循环并且关掉音频
	});
	vid.play();
}
function bgmstop(){
	Orderprocessing2();
}
function Orderprocessing2(){
	var vid = document.getElementById("myVideo");//获取音频对象
	var start = 0;//定义循环的变量
	var times=100;//定于循环的次数
	vid.addEventListener("ended",function() {
		vid.play();//启动音频，也就是播放
		start++;//循环
		start == times && vid.pause();//也就是当循环的变量等于次数的时候，就会终止循环并且关掉音频
	});vid.pause();
}


map = new Image();

<!--設定地圖-->
function setMap(str){
	map.src = str+'.png';
}

<!--畫地圖-->
function drawMap(){
	<!--map=規定要使用的圖像畫布視頻-->
	<!--xoff=在畫布上放置圖像的x座標位置 = 50-->
	<!--yoff=在畫布上放置圖像的y座標位置 = -2400-->
	<!--map.width*scale=要使用的圖像的寬度-->
	<!--map.width*scale=要使用的圖像的高度-->
	ctx.drawImage(map, xoff, yoff, map.width*scale, map.height*scale);
}
<!--ステージで集める色の設定-->
function setChara(){
	chara_width_quarter = chara.width/4;
	chara_width_half = chara.width/2;
	canv_width_half = canv.width/2;
	
	chara_height_quarter = chara.height/4;
	chara_height_half = chara.height/2;
	canv_height_half = canv.height/2;

	me1 = canv.width/2 - chara.width/4;
	me2 = canv.height/2 - chara.height/2;
	me3 = chara.width/2;
	me4 = chara.height/2;
	me5 = canv_height_half-chara_height_half;
	
	sh1 = me2 + 70;
	sh2 = 20;
}	
	xplus=10;
	yplus=10;

	
var standard = false;
var lightblue = false;
var yellow = false;
var red = false;

function standard3(){
	standard = false
	if(lightblue == true && yellow == true && red == true){
		standard = true;
	}
}
<!--当たり判定->
function me(){

	<!--設置圖片drawImage(圖片,起始x座標,起始y座標,使用圖像的寬度, 使用圖像的寬度);-->
	ctx.drawImage(shadow, me1, sh1, me3, sh2);
	ctx.drawImage(img,sx[c[i][0]],sy[c[i][1]],sWidth,sHeight, me1-15,sh1-110,sWidth/2,sHeight/2);
	lamp.style.left = (-(xoff  - canv.width/2) * 100 / map1.width * 1/scale)+'%';
	lamp.style.top = (-(yoff - canv.height/2) * 100 / map1.height * 1/scale)+'%';
	
}
<!--移動-->
<!--色にぶつかる->
function moving(){
	
		<!--getImageData() 方法返回 ImageData該對象copy了畫布指定矩形的像素數據。-->
		<!--getImageData(複製點的x座標,複製點的y座標,要複製的矩形的寬度,要複製的矩形的高度)-->
		<!--getImageData(x,y,width,height).data為陣列-->
		<!--red = getImageData(x,y,width,height).data[0]-->
		<!--green = getImageData(x,y,width,height).data[1]-->
		<!--blue = getImageData(x,y,width,height).data[2]-->
		<!--alpha = getImageData(x,y,width,height).data[3]		alpha 通道 (0-255; 0 是透明的，255 是完全可见的)-->

	if(left == true){	
		col1 = ctx.getImageData(me1+40 , sh1+35, 1, 25).data;
		<!--設定可以行走的顏色,第一個R第二個G第三個B第四個透度-->
		if(col1[0] ==250 && col1[sh2*1-4] ==250 && col1[sh2*2-4] ==250 && col1[sh2*3-4] ==250 && col1[sh2*4-4] >=250){
			xoff+=charaspd;
		<!--到達設定的顏色就過關-->
		}else if( (col1[0] < 179 && col1[2] == 231) || (col1[sh2*4-4] < 179 && col1[sh2*4-2] == 231) ){
			gameOverStandard();
		}else if(col1[0] == 255 && col1[1] == 56 && col1[2] == 56){
			getRed();
		}else if(col1[0] == 186 && col1[1] == 236 && col1[2] == 236){
			getLightBlue();
		}else if(col1[0] == 255 && col1[1] == 225 && col1[2] == 102){
			getYellow();
		}else if(col1[0] == 250){
			xoff-=charaspd;
			yoff-=charaspd;
		}else if(col1[0] >=250 && col1[sh2*4-4] < 250){
			xoff-=charaspd;
			yoff+=charaspd;
		<!--往左-->
		}else{
			xoff-=charaspd;
		}
	}
	if(right == true){
		col1 = ctx.getImageData(me1 + me3 -1, sh1, 1, sh2).data;
		
		if(col1[0] ==250 && col1[sh2*1-4] ==250 && col1[sh2*2-4] ==250 && col1[sh2*3-4] ==250 && col1[sh2*4-4] >=250){
			xoff-=charaspd;
		}else if( (col1[0] < 179 && col1[2] == 231) || (col1[sh2*4-4] < 179 && col1[sh2*4-2] == 231) ){
			gameOverStandard();
		}else if(col1[0] == 255 && col1[1] == 56 && col1[2] == 56){
			getRed();
		}else if(col1[0] == 186 && col1[1] == 236 && col1[2] == 236){
			getLightBlue();
		}else if(col1[0] == 255 && col1[1] == 225 && col1[2] == 102){
			getYellow();
		}else if(col1[0] < 250 && col1[sh2*4-4] >=250){
			xoff+=charaspd;
			yoff-=charaspd;
		}else if(col1[0] >=250 && col1[sh2*4-4] < 250){
			xoff+=charaspd;
			yoff+=charaspd;
		}else{
			xoff+=charaspd;
		}
	}
	if(up == true){
		col1 = ctx.getImageData(me1+80, sh1, me3, -1).data;
		if(col1[0] ==250 && col1[me3*1-4] ==250 && col1[me3*2-4] == 250 && col1[me3*3-4] ==250 && col1[me3*4-4] ==250){
			yoff+=charaspd;
		}else if( (col1[0] < 179 && col1[2] >= 231) || (col1[me3*4-4] < 179 && col1[me3*4-2] == 231) ){
			gameOverStandard();
		}else if(col1[0] == 255 && col1[1] == 56 && col1[2] == 56){
			getRed();
		}else if(col1[0] == 186 && col1[1] == 236 && col1[2] == 236){
			getLightBlue();
		}else if(col1[0] == 255 && col1[1] == 225 && col1[2] == 102){
			getYellow();
		}else if(col1[0] < 250 && col1[me3*4-4] >=250){
			xoff-=charaspd;
			yoff-=charaspd;
		}else if(col1[0] >=250 && col1[me3*4-4] < 250){
			xoff+=charaspd;
			yoff-=charaspd;
		}else{
			yoff-=charaspd;
		}
	}
	if(down == true){
		col1 = ctx.getImageData(me1+70, sh1+70 , me3, 1).data;
		
		if(col1[0] ==250 && col1[me3*1-4] ==250 && col1[me3*2-4] ==250 && col1[me3*3-4] ==250 && col1[me3*4-4] ==250){
			yoff-=charaspd;
		}else if( (col1[me3*4-4] < 179 && col1[me3*4-2] == 231) ){
			gameOverStandard();
		}else if(col1[0] == 255 && col1[1] == 56 && col1[2] == 56){
			getRed();
		}else if(col1[0] == 186 && col1[1] == 236 && col1[2] == 236){
			getLightBlue();
		}else if(col1[0] == 255 && col1[1] == 225 && col1[2] == 102){
			getYellow();
		}else if(col1[0] < 250 && col1[me3*4-4] >=250){
			xoff-=charaspd;
			yoff+=charaspd;
		}else if(col1[0] >=250 && col1[me3*4-4] < 250){
			xoff+=charaspd;
			yoff+=charaspd;
		}else{
			yoff+=charaspd;
		}
	}
}

function allFalse(){
	up = false;
	left = false;
	right = false;
	down = false;
	clearInterval(rightCycle);
	clearInterval(upCycle);
	clearInterval(downCycle);
	clearInterval(leftCycle);
}

function gameOverStandard(){
	if(red == true && lightblue == true && yellow == true){
		standard = true;
	}
	if(standard == true){
		gameclear();
	}else{
		if(confirm("色が足りないみたい")==true){
			allFalse();
			clearInterval(rightCycle);
			clearInterval(upCycle);
			clearInterval(downCycle);
			clearInterval(leftCycle);
			yoff+=10;
		}else{
		}
	}
}

function getRed(){
	if(red== true){
		if(confirm("もうこの花は集めてるよ")==true){
			allFalse();
			clearInterval(rightCycle);
			clearInterval(upCycle);
			clearInterval(downCycle);
			clearInterval(leftCycle);
			yoff-=0;
		}
	}else{
		if(confirm("赤色の花をてにいれた")==true){
			red = true;
			allFalse();
			clearInterval(rightCycle);
			clearInterval(upCycle);
			clearInterval(downCycle);
			clearInterval(leftCycle);
			yoff-=0;
		}
	}
	clearInterval(t);
}

function getLightBlue(){
	if(lightblue == true){
		if(confirm("もうこの花は集めてるよ")==true){
			
			allFalse();
			clearInterval(rightCycle);
			clearInterval(upCycle);
			clearInterval(downCycle);
			clearInterval(leftCycle);
			yoff-=0;
		}
	}else{
		if(confirm("水色の花をてにいれた")==true){
			lightblue = true;
			allFalse();
			clearInterval(rightCycle);
			clearInterval(upCycle);
			clearInterval(downCycle);
			clearInterval(leftCycle);
			yoff-=0;
		}
	}
			clearInterval(rightCycle);
			clearInterval(upCycle);
			clearInterval(downCycle);
			clearInterval(leftCycle);
}

function getYellow(){
	if(yellow == true){
		if(confirm("もうこの花は集めてるよ")==true){
			
			allFalse();
			clearInterval(rightCycle);
			clearInterval(upCycle);
			clearInterval(downCycle);
			clearInterval(leftCycle);
			yoff-=0;
		}
	}else{
		if(confirm("黄色の花をてにいれた")==true){
			yellow = true;
			allFalse();
			clearInterval(rightCycle);
			clearInterval(upCycle);
			clearInterval(downCycle);
			clearInterval(leftCycle);
			yoff-=0;
		}
	}
			clearInterval(rightCycle);
			clearInterval(upCycle);
			clearInterval(downCycle);
			clearInterval(leftCycle);
}
function gameclear(){
	<!--清除給定矩形内的像素(要清除矩形左上x座標,要清除矩形左上y座標,寬度,高度)-->
	document.location.href="end.html";
}

function entrance(xx, yy){
	xoff = xx;
	yoff = yy;
}
<!--第二關結束-->
<!--
function gameover(){
	ending();
}
-->
<!--結束video-->
<!--
function ending(){
	var vide = document.getElementById("vide");
	vide.className += ' on';
	vide.play();
	vide.addEventListener('ended',function(){
		vide.className = '';
		videe.ended = window.location.href="gamestart.html" ; 
	});
videe.addEventListener('pause',function(){
		videe.className = '';
		videe.pause = window.location.href="gamestart.html" ; 
	});	
	document.onkeydown=function(e){  //对整个页面文档监听 
	var keyNum=window.event ? e.keyCode :e.which;  //获取被按下的键值 

	if(keyNum==13){ 
	videe.pause();
		
		}
	} 	
}
-->


<!--訊息提示-->
function sleep(d){
  for(var t = Date.now();Date.now() - t <= d;);
}

<!--キャラクタ分割-->
var LEF=37,U=38,RIGH=39,DOW=40;//KeyCode
            var isKeyDown=false;
            var speed=2;
var sx=[0,250,500,750,1000,1250],sy=[0,250,500];//切片位置
			var sWidth=250,sHeight=250;//切片大小
			var x=240,y=135;//顯示位置
            var dx=10,dy=10;//座標偏移
            var s={
        Bac:[[3,1],[4,1],[5,1]],
        Righ:[[3,2],[4,2],[5,2]],
        Fron:[[0,1],[2,1],[1,1]],
        Lef:[[0,2],[1,2],[2,2]],
        leftstop:[[1,2]]
            };//人物状態
            var i=1;
            var c=s.Fron;//默認朝前方

            var draw=function(){
                    ctx.clearRect(0,0,480,272);
                    ctx.drawImage(img,sx[c[i][0]],sy[c[i][1]],sWidth,sHeight,x-dx,y-dy,sWidth,sHeight);
            };

            var img=new Image();
            img.src="boy_wark.png";