canv = null;
ctx = null;
<!--框架-->
<!--フレーム-->
frame = 1000/60;

keypressevent = null;

var beginx=0;//裁減圖片的X軸坐標。從左往右遞增的。今の時点では使われていない
var beginy=0;//裁減圖片的X軸坐標。從左往右遞增的。何かに使うかも

<!--規模-->
<!--迷路の画像を何倍拡大させるか-->
scale = 2;

<!--生成fuction-->
function init(){
	
<!--新地圖測試生成-->
<!--ステージ1->
map_stage1 = new Image();
map_stage1.src = 'stage1.png';

stage = 1;
console.log("init");
	
<!--取得html中ID為canva的畫布,並設畫布為2D-->
canv = document.getElementById("canva");
ctx = canv.getContext("2d");
	
<!--生成角色並放入角色圖片-->
<!--キャラクタを生成して、画像を入れ-->
chara = new Image();
chara.src = 'boy_1_stop.png';
	
<!--生成陰影並放入圖片-->
<!--当たり判定の影を生成-->
shadow = new Image();
shadow.src = 'shadow1.png';
	
<!--設置初始地圖-->
<!--最初のマップを設定-->
setMap('stage1');
scale = 1.3;
	
setChara();
ctx.clearRect(0, 0, canv.width, canv.height);
start();
}

var xoff = -700;
var yoff = -2000;
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
<!--aのキーコードは65,sのキーコードは83,dのキーコードは68,wのキーコードは87-->
<!--左回傳値是37,下回傳値是38,右回傳値是39,上回傳値是40-->
<!--左のキーコードは37,下のキーコードは38,右のキーコードは39,上のキーコードは40-->
var aa=65; var ss=83; var dd=68; var ww=87;

//iを0から3の間変化		
var i = 0;
function changImages(){
	//讓i在 0到3之間變化
	i = i % 3;
}

<!--各方向のサイクル変数を設定-->
<!--各方向のサイクル変数を設定-->
var upCycle=null;
var downCycle=null;
var leftCycle=null;
var rightCycle=null;
var speedCycle=null;

function start(){
	<!--監聽鍵盤按鍵事件，並回傳所按的按鍵為何-->

	<!--設置按鍵功能keydown = 按下按鈕, keyup = 放開按鈕-->
	<!--キーの機能を設定keydown = キーを押す, keyup = キーを放す-->
	window.addEventListener("keydown", function(e){
		<!--取得按鈕的回傳値-->
		var ky = e.keyCode;
		if(ky==aa||ky==37){
			if(left == false){
				left = true;
				leftCycle = window.setInterval("changImages(i++);", 100);
				c=s.Lef;
				window.addEventListener("keyup", function(e){
					if(e.keyCode == aa||e.keyCode == 37){
						left = false;
						clearInterval(leftCycle);
					}
				}, false);
			}
		}
		if(ky==dd||ky==39){
			if(right == false){
				right = true;
				rightCycle = window.setInterval("changImages(i++);", 100);
				c=s.Righ;
				window.addEventListener("keyup", function(e){
					if(e.keyCode == dd||e.keyCode == 39){
						right = false;
						clearInterval(rightCycle);
					}
				}, false);
			}
		}
		if(ky==ww||ky==38){
			if(up == false){
				up = true;
				upCycle = window.setInterval("changImages(i++);", 130);
				c=s.Bac;
				window.addEventListener("keyup", function(e){
					if(e.keyCode == ww||e.keyCode == 38){
						up = false;
						clearInterval(upCycle);
					}
				}, false);
			}
		}
		
		if(ky==ss||ky==40){
			if(down == false){
				down = true;
				downCycle = window.setInterval("changImages(i++);", 130);
				c=s.Fron;
				window.addEventListener("keyup", function(e){
					if(e.keyCode == ss||e.keyCode == 40){
						down = false;
						clearInterval(downCycle);
					}
				}, false);
			}
		}
	}, false);
	setInterval( function(){
		drawMap();
		moving();
		if(speed==true){
			moving();
		}
		me();
	}, frame);
}

map1 = new Image();

<!--設定地圖-->
function setMap(str){
	<!--載入網頁時起動function-->
	map1.src = str+'_alter.png';
	map = map1;
}

<!--マップ-->
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
var purple = false;
	
function standard1(){
	standard = false
	if(purple == true){
		standard = true;
	}
}
<!--当たり判定->
function me(){
	<!--設置圖片drawImage(圖片,起始x座標,起始y座標,使用圖像的寬度, 使用圖像的寬度);-->
	ctx.drawImage(shadow, me1+38, sh1+55, me3, sh2);
	ctx.drawImage(img,sx[c[i][0]],sy[c[i][1]],sWidth,sHeight, me1,sh1-100,sWidth/1.5,sHeight/1.5);
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
		if(col1[0] >=250 && col1[sh2*1-4] >=250 && col1[sh2*2-4] >=250 && col1[sh2*3-4] >=250 && col1[sh2*4-4] >=250){
			xoff+=charaspd;
		<!--到達設定的顏色就過關-->
		}else if( (col1[0] < 179 && col1[2] >= 231) || (col1[sh2*4-4] < 179 && col1[sh2*4-2] >= 231) ){
			gameOverStandard();
		}else if(col1[0] == 211 && col1[1] == 143 && col1[2] == 254){
			getPurple();
		}else if(col1[0] < 250){
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
		col1 = ctx.getImageData(me1 + me3 -1, me5+120, 1, sh2).data;
		
		if(col1[0] >=250 && col1[sh2*1-4] >=250 && col1[sh2*2-4] >=250 && col1[sh2*3-4] >=250 && col1[sh2*4-4] >=250){
			xoff-=charaspd;
		}else if( (col1[0] < 179 && col1[2] >= 231) || (col1[sh2*4-4] < 179 && col1[sh2*4-2] >= 231) ){
			gameOverStandard();
		}else if(col1[0] == 211 && col1[1] == 143 && col1[2] == 254){
			getPurple();
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
		col1 = ctx.getImageData(me1+30, me5+120, me3, 20).data;
		if(col1[0] >=250 && col1[me3*1-4] >=250 && col1[me3*2-4] >=250 && col1[me3*3-4] >=250 && col1[me3*4-4] >=250){
			yoff+=charaspd;
		}else if( (col1[0] < 179 && col1[2] >= 231) || (col1[me3*4-4] < 179 && col1[me3*4-2] >= 231) ){
			gameOverStandard();
		}else if(col1[0] == 211 && col1[1] == 143 && col1[2] == 254){
			getPurple();
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
		col1 = ctx.getImageData(me1+35, me5+150 , me3, -10).data;
		
		if(col1[0] >=250 && col1[me3*1-4] >=250 && col1[me3*2-4] >=250 && col1[me3*3-4] >=250 && col1[me3*4-4] >=250){
			yoff-=charaspd;
		}else if( (col1[me3*4-4] < 179 && col1[me3*4-2] >= 231) ){
			gameOverStandard();
		}else if(col1[0] == 211 && col1[1] == 143 && col1[2] == 254){
			getPurple();
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
	if(purple == true){
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

function getPurple(){
	if(purple == true){
		if(confirm("もうこの花は集めてるよ")==true){
			
			allFalse();
			clearInterval(rightCycle);
			clearInterval(upCycle);
			clearInterval(downCycle);
			clearInterval(leftCycle);
			yoff-=50;
		}
	}else{
		if(confirm("むらさきの花をてにいれた")==true){
			purple = true;
			allFalse();
			clearInterval(rightCycle);
			clearInterval(upCycle);
			clearInterval(downCycle);
			clearInterval(leftCycle);
			yoff-=50;
		}
	}
	clearInterval(rightCycle);
	clearInterval(upCycle);
	clearInterval(downCycle);
	clearInterval(leftCycle);
}

function gameclear(){
	<!--ステージ１をクリアしたらリンク先に飛ぶ-->
	document.location.href="stage2.html";
}

function entrance(xx, yy){
	xoff = xx;
	yoff = yy;
}
<!--第二關結束-->
function gameover(){
	ending();
}

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
        Bac:[[3,1],[4,1],[5,1],[4,0]],
        Righ:[[3,2],[4,2],[5,2],[5,0]],
        Fron:[[0,1],[1,1],[2,1],[1,0]],
        Lef:[[0,2],[1,2],[2,2],[2,0]],
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