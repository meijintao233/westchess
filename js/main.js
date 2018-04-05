
var	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');

	
//初始化棋盘数据（0为白格，1为棋子1，2为棋子2，3为黑格）
var datas =[
	[0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,1],        
    [1,0,1,0,1,0,1,0,1,0],
    [0,3,0,3,0,3,0,3,0,3],
    [3,0,3,0,3,0,3,0,3,0],
    [0,2,0,2,0,2,0,2,0,2],
    [2,0,2,0,2,0,2,0,2,0],
    [0,2,0,2,0,2,0,2,0,2],
    [2,0,2,0,2,0,2,0,2,0]
    ];

//初始化
(function init(){
	//棋盘
	(function chessboard(){
		for (var i =0 ; i <= 1000 ;i +=60) {
			context.strokeStyle = 'black';
			context.lineWidth = 0.3;
			context.moveTo(i,0);
			context.lineTo(i,600);
			context.moveTo(0,i);
			context.lineTo(600,i);
			context.stroke();	
		}
		var html = '';
		for (var i=0;i<10;i++) 
			for (var j =0 ;j<10;j++) {
				if(i%2==0){
					if(j%2!=0){
						html+= '<li class=black>' + '</li> ';
					}else{
						html+= '<li class=white>' + '</li> ';
					}
				}else{
					if(j%2==0){
						html+= '<li class=black>' + '</li> ';
					}else{
						html+= '<li class=white>' + '</li> ';
					}
				}	
		}	
		$('.ul1').html(html);
	})();
	
	
	//棋子1
	(function chess1(){
		context.fillStyle = 'darkorange';
		for (var x =90 ; x <= 570 ;x +=120) {		
			for (var y =30 ; y <= 150 ;y +=120) {		
				context.beginPath();
				context.moveTo(x,y);
				context.arc(x,y,20,0,Math.PI*2,true);
				context.closePath();
				context.fill();
			}		
		}	
		for (var x =30 ; x <= 510 ;x +=120) {		
			for (var y =90 ; y <= 210 ;y +=120) {		
				context.beginPath();
				context.moveTo(x,y);
				context.arc(x,y,20,0,Math.PI*2,true);
				context.closePath();
				context.fill();
			}
		}
	})();
	
	
	//棋子2
	(function chess2(){
		context.fillStyle = 'palevioletred';	
		for (var x =90 ; x <= 570 ;x +=120) {		
			for (var y =390 ; y <= 510 ;y +=120) {		
				context.beginPath();
				context.moveTo(x,y);
				context.arc(x,y,20,0,Math.PI*2,true);
				context.closePath();
				context.fill();
			}
		}
		for (var x =30 ; x <= 510 ;x +=120) {	
			for (var y =450 ; y <= 570 ;y +=120) {		
				context.beginPath();
				context.moveTo(x,y);
				context.arc(x,y,20,0,Math.PI*2,true);
				context.closePath();
				context.fill();
			}
		}
	})();


	//给li编号
	var t=0;
	for (var i=0;i<10;i++) 
		for (var j =0 ;j<10;j++) {
			$('.ul1').find('li').eq(t).addClass('m'+i+j)
			t++;
		}
	
	//初始化数据
	(function initdatas(){
		var datas1 =[
		[0,1,0,1,0,1,0,1,0,1],
	    [1,0,1,0,1,0,1,0,1,0],
	    [0,1,0,1,0,1,0,1,0,1],        
	    [1,0,1,0,1,0,1,0,1,0],
	    [0,3,0,3,0,3,0,3,0,3],
	    [3,0,3,0,3,0,3,0,3,0],
	    [0,2,0,2,0,2,0,2,0,2],
	    [2,0,2,0,2,0,2,0,2,0],
	    [0,2,0,2,0,2,0,2,0,2],
	    [2,0,2,0,2,0,2,0,2,0]
	    ];
	
		for(var m=0;m<10;m++)
			datas[m]=datas1[m].slice(0,10);
	})();
})();

	
//获取鼠标在canvas上的坐标
function getCanvasPos(canvas,e){
    
    var rect = canvas.getBoundingClientRect();
    return {   
     x: e.clientX - rect.left * (canvas.width / rect.width),  
     y: e.clientY - rect.top * (canvas.height / rect.height)  
   };  
} 	


var count = 0;//记数，决定棋手及其动作


//点击事件，下棋
$('#canvas').on('click',function(e){

	//胜利条件
	function isP1Win1(){
		var result;
		for(var i=0;i<10;i++){
			for(var j=0;j<10;j++){				
				if(datas[i][j]!=2){
					result = true;	
				}else {
					result = false;
					break;
				}			
			}
			if(!result){
				break;
			}			
		}
		console.log('result:' + result);
		return result;
	}
	
	
	function isP1Win2(){
		var result;
		for(var i=0;i<10;i++){
			for(var j=0;j<10;j++){
				if(datas[i][j]==2){
					result = false;
					if(Boolean(datas[i-1][j-1]==3)
					||(Boolean(datas[i-2][j-2]==3)&&Boolean(datas[i-1][j-1]==1))
					||Boolean(datas[i-1][j+1]==3)
					||(Boolean(datas[i-2][j+2]==3)&&Boolean(datas[i-1][j+1]==1))){
						result = true;
						break;
					}	
				}
			}
			if(result){
			break;
			}	
		}
		console.log('result:' + result);
		return result;
	}
	
	
	function isP2Win1(){
		var result;
		for(var i=0;i<10;i++){
			for(var j=0;j<10;j++){
				if(datas[i][j]!=1){
					result = true;				
				}else{
					result = false;
					break;
				}
			}
			if(!result){
				break;
			}
		}
		console.log('result:' + result);
		return result;
		
	}
	
	
	function isP2Win2(){
		var result;
		for(var i=0;i<10;i++){
			for(var j=0;j<10;j++){
				if(datas[i][j]==1){
					result = false;
					if(Boolean(datas[i+1][j+1]==3)
					||(Boolean(datas[i+2][j+2]==3)&&Boolean(datas[i+1][j+1]==2))
					||Boolean(datas[i+1][j-1]==3)
					||(Boolean(datas[i+2][j-2]==3)&&Boolean(datas[i+1][j-1]==2))){
						result = true;
						break;
					}	
				}
			}
			if(result){
				break;
			}
		}
		console.log('result:' + result);
		return result;
	}
	
	
	//记录点击坐标
	var pos=getCanvasPos(canvas,e);
	
	//判断左上
	function isMoveLeftTop2(){
		if(Boolean(datas[Math.floor(pos.y/60)-1][Math.floor(pos.x/60)-1]==3)||(Boolean(datas[Math.floor(pos.y/60)-2][Math.floor(pos.x/60)-2]==3)&&Boolean(datas[Math.floor(pos.y/60)-1][Math.floor(pos.x/60)-1]==1))){
			return true;
		}	
	}
	
	//判断右上
	function isMoveRightTop2(){	
		if(Boolean(datas[Math.floor(pos.y/60)-1][Math.floor(pos.x/60)+1]==3)||(Boolean(datas[Math.floor(pos.y/60)-2][Math.floor(pos.x/60)+2]==3)&&Boolean(datas[Math.floor(pos.y/60)-1][Math.floor(pos.x/60)+1]==1))){
			return true;
		}	
	}
	
	 //判断右下
	function isMoveRightBottom1(){		
		if(Boolean(datas[Math.floor(pos.y/60)+1][Math.floor(pos.x/60)+1]==3)||(Boolean(datas[Math.floor(pos.y/60)+2][Math.floor(pos.x/60)+2]==3)&&Boolean(datas[Math.floor(pos.y/60)+1][Math.floor(pos.x/60)+1]==2))){
			return true;
		}	
	}
	
	//判断左下
	function isMoveLeftBottom1(){
		if(Boolean(datas[Math.floor(pos.y/60)+1][Math.floor(pos.x/60)-1]==3)||(Boolean(datas[Math.floor(pos.y/60)+2][Math.floor(pos.x/60)-2]==3)&&Boolean(datas[Math.floor(pos.y/60)+1][Math.floor(pos.x/60)-1]==2))){
			return true;
		}	
	}
	
	//棋子1清除
	function player1clear(){
		var fun = {};
			fun = getCanvasPos(canvas,e);
		var cx=Math.floor(fun.x/60)*60+30,//当前棋子圆心的x
			cy=Math.floor(fun.y/60)*60+30;//当前棋子圆心的y
			context.clearRect(cx-20,cy-20,40,40);
		console.log('当前该棋格的信息：' + datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]);
		//修改棋格信息
		if(datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]!=3&&datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]!=0){
		datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)] = 3;
		}
		console.log('修改后该棋格的信息：' + datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]);	        
		ry=Math.floor(fun.x/60);//记录该棋子当前的列数
		rx=Math.floor(fun.y/60);//记录该棋子当前的行数
		console.log('棋子当前的行列(x，y)：' + rx,ry);
	}
	
	//棋子1放置操作
		tag = true;//标记棋子放置是否符合规则，若符合（true），则按操作重绘，若不符合（false），则棋子在原清除处重绘
	function player1move(x1,y1){
		var fun = {};
		fun = getCanvasPos(canvas,e);
		//判断点击的放置是否符合游戏规则，以下为符合的情况
		if(Boolean(Math.floor(fun.y/60)==x1+1)&&Boolean(Math.floor(fun.x/60)==y1+1)||Boolean(Math.floor(fun.y/60)==x1+1)&&Boolean(Math.floor(fun.x/60)==y1-1)
		||Boolean(Math.floor(fun.y/60)==x1+2)&&Boolean(Math.floor(fun.x/60)==y1+2)||Boolean(Math.floor(fun.y/60)==x1+2)&&Boolean(Math.floor(fun.x/60)==y1-2)
		){
			//进一步判断放置是否符合游戏规则，以下为不符合的情况
			if((Boolean(datas[x1+1][y1+1]==3)&&Boolean(datas[x1+2][y1+2]==3))
			&&(Boolean(Math.floor(fun.y/60)==x1+2)&&Boolean(Math.floor(fun.x/60)==y1+2))
			||(Boolean(datas[x1+1][y1-1]==3)&&Boolean(datas[x1+2][y1-2]==3))
			&&(Boolean(Math.floor(fun.y/60)==x1+2)&&Boolean(Math.floor(fun.x/60)==y1-2))//33的情况
			
			||(Boolean(datas[x1+1][y1+1]==3)&&Boolean(datas[x1+2][y1+2]==2))
			&&(Boolean(Math.floor(fun.y/60)==x1+2)&&Boolean(Math.floor(fun.x/60)==y1+2))
			||(Boolean(datas[x1+1][y1-1]==3)&&Boolean(datas[x1+2][y1-2]==2))
			&&(Boolean(Math.floor(fun.y/60)==x1+2)&&Boolean(Math.floor(fun.x/60)==y1-2))//32的情况
			
			||(Boolean(datas[x1+1][y1-1]==2)&&Boolean(datas[x1+2][y1-2]==2))
			&&(Boolean(Math.floor(fun.y/60)==x1+2)&&Boolean(Math.floor(fun.x/60)==y1-2))
			||(Boolean(datas[x1+1][y1+1]==2)&&Boolean(datas[x1+2][y1+2]==2))
			&&(Boolean(Math.floor(fun.y/60)==x1+2)&&Boolean(Math.floor(fun.x/60)==y1+2))//22的情况
			
			||(Boolean(datas[x1+1][y1+1]==2)&&Boolean(datas[x1+2][y1+2]==3))
			&&(Boolean(Math.floor(fun.y/60)==x1+1)&&Boolean(Math.floor(fun.x/60)==y1+1))
			||(Boolean(datas[x1+1][y1-1]==2)&&Boolean(datas[x1+2][y1-2]==3))
			&&(Boolean(Math.floor(fun.y/60)==x1+1)&&Boolean(Math.floor(fun.x/60)==y1-1))//23的情况
			){
				tag = false;
				console.log('tag：'+tag);
			}else{//判断点击的是否为无棋子的棋格，若是，按操作重绘
				if(datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]==3&&datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]!=2){
					var cx2=Math.floor(fun.x/60)*60+30,//该位置棋子圆心的x
						cy2=Math.floor(fun.y/60)*60+30;//该位置棋子圆心的y
						
						ax1 =Math.floor(fun.y/60);//记录该棋子当前的行数
						ay1 =Math.floor(fun.x/60);//记录该棋子当前的列数
						
						context.fillStyle ='darkorange';//棋子的颜色
						context.beginPath();
						context.arc(cx2,cy2,20,0,Math.PI*2,true);
						context.closePath();
						context.fill();
						datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]=1;
				}
				//修改棋格信息
				console.log('当前该棋格的信息：' + datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]);
				if(datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]!=3&&datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]!=0&&datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]!=1){
				datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)] = 3;
				}
				console.log('修改后该棋格的信息：' + datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]);
			}
			
		}else{
			tag = false;
			console.log('tag：'+tag);
		}	
	}	
		
	//棋子2清除
	function player2clear(){
		var fun = {};
			fun = getCanvasPos(canvas,e)
		var cx=Math.floor(fun.x/60)*60+30,//当前棋子圆心的x
			cy=Math.floor(fun.y/60)*60+30;//当前棋子圆心的y
			context.clearRect(cx-20,cy-20,40,40);
		console.log('当前该棋格的信息：' + datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]);
		//修改棋格信息
		if(datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]!=3&&datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]!=0){
		datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)] = 3;
		}
		console.log('修改后该棋格的信息：' + datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]);
		ry2=Math.floor(fun.x/60);//记录该棋子当前的列数
		rx2=Math.floor(fun.y/60);//记录该棋子当前的行数
		console.log('棋子当前的行列(x，y)：' + rx2,ry2);
	}
			
	//棋子2放置操作	
		tag2 = true;//标记棋子放置是否符合规则，若符合（true），则按操作重绘，若不符合（false），则棋子在原清除处重绘
		ax1 = ay1 = 2;
		ax2 = ay2 = 2;
	function player2move(x2,y2){
		var fun = {};
		fun = getCanvasPos(canvas,e);
		//判断点击的放置是否符合游戏规则，以下为符合的情况
		if(Boolean(Math.floor(fun.y/60)==x2-1)&&Boolean(Math.floor(fun.x/60)==y2-1)||Boolean(Math.floor(fun.y/60)==x2-1)&&Boolean(Math.floor(fun.x/60)==y2+1)
		||Boolean(Math.floor(fun.y/60)==x2-2)&&Boolean(Math.floor(fun.x/60)==y2-2)||Boolean(Math.floor(fun.y/60)==x2-2)&&Boolean(Math.floor(fun.x/60)==y2+2)
		){
			//进一步判断放置是否符合游戏规则，以下为不符合的情况
			if((Boolean(datas[x2-1][y2-1]==3)&&Boolean(datas[x2-2][y2-2]==3))
			&&(Boolean(Math.floor(fun.y/60)==x2-2)&&Boolean(Math.floor(fun.x/60)==y2-2))
			||(Boolean(datas[x2-1][y2+1]==3)&&Boolean(datas[x2-2][y2+2]==3))
			&&(Boolean(Math.floor(fun.y/60)==x2-2)&&Boolean(Math.floor(fun.x/60)==y2+2))//33的情况
				
			||(Boolean(datas[x2-1][y2-1]==3)&&Boolean(datas[x2-2][y2-2]==1))
			&&(Boolean(Math.floor(fun.y/60)==x2-2)&&Boolean(Math.floor(fun.x/60)==y2-2))
			||(Boolean(datas[x2-1][y2+1]==3)&&Boolean(datas[x2-2][y2+2]==1))
			&&(Boolean(Math.floor(fun.y/60)==x2-2)&&Boolean(Math.floor(fun.x/60)==y2+2))//31的情况
				
			||(Boolean(datas[x2-1][y2-1]==1)&&Boolean(datas[x2-2][y2-2]==1))
			&&(Boolean(Math.floor(fun.y/60)==x2-2)&&Boolean(Math.floor(fun.x/60)==y2-2))
			||(Boolean(datas[x2-1][y2+1]==1)&&Boolean(datas[x2-2][y2+2]==1))
			&&(Boolean(Math.floor(fun.y/60)==x2-2)&&Boolean(Math.floor(fun.x/60)==y2+2))//11的情况
				
			||(Boolean(datas[x2-1][y2-1]==1)&&Boolean(datas[x2-2][y2-2]==3))
			&&(Boolean(Math.floor(fun.y/60)==x2-1)&&Boolean(Math.floor(fun.x/60)==y2-1))
			||(Boolean(datas[x2-1][y2+1]==1)&&Boolean(datas[x2-2][y2+2]==3))
			&&(Boolean(Math.floor(fun.y/60)==x2-1)&&Boolean(Math.floor(fun.x/60)==y2+1))//13的情况
			){
				tag2 = false;
				console.log('tag：'+tag2);
			}else{//判断点击的是否为无棋子的棋格，若是，按操作重绘
				if(datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]==3&&datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]!=1){
					var cx1=Math.floor(fun.x/60)*60+30,//该位置棋子圆心的x
						cy1=Math.floor(fun.y/60)*60+30;//该位置棋子圆心的y
						
						ax2=Math.floor(fun.y/60);//记录该棋子当前的行数
						ay2=Math.floor(fun.x/60);//记录该棋子当前的列数
					
						context.fillStyle ='palevioletred';//棋子的颜色
						context.beginPath();
						context.arc(cx1,cy1,20,0,Math.PI*2,true);
						context.closePath();
						context.fill();
						datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]=2;
				}
				//修改棋格信息
				console.log('当前该棋格的信息：' + datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]);
				if(datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]!=3&&datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]!=0&&datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]!=2){
					datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)] = 3;
				}
				console.log('修改后该棋格的信息：' + datas[Math.floor(fun.y/60)][Math.floor(fun.x/60)]);
			}
				
		}else{
			tag2 = false;
			console.log('tag：'+tag2);
		}			
	}
	
	//判断是否点击白格，若是，弹出error
	if(datas[Math.floor(getCanvasPos(canvas,e).y/60)][Math.floor(getCanvasPos(canvas,e).x/60)]!=0){
			var val;
		//判断棋手及其动作
			if(count%4==0){
				val=0;
				console.log('count：'+count);
				console.log('当前操作：棋子1清除');
			}else if(count%4==1){
						val=1;
						console.log('count：'+count);
						console.log('当前操作：棋子1放置');
					}else if(count%4==2){
								val=2;
								console.log('count：'+count);
								console.log('当前操作：棋子2清除');
							}else if(count%4==3){
										val=3;
										console.log('count：'+count);
										console.log('当前操作：棋子2放置');
									}
		
			switch (val){
			
			
			case 0:
				//判断是否可以移动和选中的是棋子1
				if((isMoveLeftBottom1()||isMoveRightBottom1())&&datas[Math.floor(getCanvasPos(canvas,e).y/60)][Math.floor(getCanvasPos(canvas,e).x/60)]==1){
					flag=false;//标记
					player1clear();
					//判断左下和右下的棋格中是否有棋子2，若有，flag为true，否则，为false
					if(datas[Math.floor(getCanvasPos(canvas,e).y/60)+1][Math.floor(getCanvasPos(canvas,e).x/60)-1]==2||
					datas[Math.floor(getCanvasPos(canvas,e).y/60)+1][Math.floor(getCanvasPos(canvas,e).x/60)+1]==2){
						flag = true;
					}
					x1 =Math.floor(getCanvasPos(canvas,e).y/60),//记录该棋子当前的行数
					y1 =Math.floor(getCanvasPos(canvas,e).x/60);//记录该棋子当前的列数
					count++;//表示操作已经完成
					x2=2;
					y2=2;
				}
			break;
					
		
			case 1:
				//判断清除的棋子1是否能移动
				if(Boolean(datas[x1+1][y1+1]==3)||Boolean(datas[x1+1][y1-1]==3)||(Boolean(datas[x1+1][y1+1]==2)&&Boolean(datas[x1+2][y1+2]==3))||(Boolean(datas[x1+1][y1-1]==2)&&Boolean(datas[x1+2][y1-2]==3))){
				player1move(x1,y1);
				console.log('flag： ' +flag);
					if(tag){
						//判断是否能吃棋子2（右下）
						if(flag&&datas[x1+1][y1+1]==2&&datas[ax1-1][ay1-1]==2){
							context.clearRect((ay1+y1)*30+10,(ax1+x1)*30+10,40,40);
							datas[ax1-1][ay1-1]=3;
							flag = false;
							console.log('2');
						}				
						//判断是否能吃棋子2（左下）
						if(flag&&datas[x1+1][y1-1]==2&&datas[ax1-1][ay1+1]==2){
							console.log('1');
							context.clearRect((ay1+y1)*30+10,(ax1+x1)*30+10,40,40);
							datas[ax1-1][ay1+1]=3;
						}
						//若所选棋子不理想，可放回重选															
						if(x1==Math.floor(getCanvasPos(canvas,e).y/60)&&y1==Math.floor(getCanvasPos(canvas,e).x/60)){
							count--;
						}else{
							count++;
						//判断吃子后该棋子是否还能继续吃子	
							if((Boolean(datas[ax1+1][ay1+1]==2)&&Boolean(datas[ax1+2][ay1+2]==3))
							||(Boolean(datas[ax1+1][ay1-1]==2)&&Boolean(datas[ax1+2][ay1-2]==3))){
								if((Boolean(ax1==x1+1)&&Boolean(ay1==y1+1))
							||(Boolean(ax1==x1+1)&&Boolean(ay1==y1-1))){
									count+=2;
								}
								count-=2;
							}
						}
					}else{
						//下棋的位置违反规则，在原清除位置重绘该棋子，并重新选择
						context.fillStyle ='darkorange';
						context.beginPath();
						context.arc(ry*60+30,rx*60+30,20,0,Math.PI*2,true);
						context.closePath();
						context.fill();
						datas[rx][ry]=1;
						count--;
					}						
				}		
			break;
		
			
			case 2:
				//判断是否可以移动和选中的是棋子2
				if((isMoveLeftTop2()||isMoveRightTop2())&&datas[Math.floor(getCanvasPos(canvas,e).y/60)][Math.floor(getCanvasPos(canvas,e).x/60)]==2){
					flag1=false;//标记
					player2clear();
					//判断左上和右上的棋格中是否有棋子1，若有，flag为true，否则，为false
					if(datas[Math.floor(getCanvasPos(canvas,e).y/60)-1][Math.floor(getCanvasPos(canvas,e).x/60)-1]==1||
					datas[Math.floor(getCanvasPos(canvas,e).y/60)-1][Math.floor(getCanvasPos(canvas,e).x/60)+1]==1){
						flag1 = true;
					}
					x2 =Math.floor(getCanvasPos(canvas,e).y/60),//记录该棋子当前的行数
					y2 =Math.floor(getCanvasPos(canvas,e).x/60);//记录该棋子当前的列数
					count++;//表示操作已经完成			
				}	
			break;
				
						
			case 3:
				//判断清除的棋子2是否能移动
				if(Boolean(datas[x2-1][y2-1]==3)||Boolean(datas[x2-1][y2+1]==3)||(Boolean(datas[x2-1][y2-1]==1)&&Boolean(datas[x2-2][y2-2]==3))||(Boolean(datas[x2-1][y2+1]==1)&&Boolean(datas[x2-2][y2+2]==3))){
					player2move(x2,y2);
					console.log('flag： ' +flag1);
					if(tag2){
						//判断是否能吃棋子1（右上）
						if(flag1&&datas[x2-1][y2+1]==1&&datas[ax2+1][ay2-1]==1){
							context.clearRect((y2+ay2)*30+10,(ax2+x2)*30+10,40,40);
							datas[ax2+1][ay2-1]=3;
							flag1 = false;
						}
						//判断是否能吃棋子1（左上）
						if(flag1&&datas[x2-1][y2-1]==1&&datas[ax2+1][ay2+1]==1){
							context.clearRect((ay2+y2)*30+10,(ax2+x2)*30+10,40,40);
							datas[ax2+1][ay2+1]=3;
						}
						//若所选棋子不理想，可放回重选	
						if(x2==Math.floor(getCanvasPos(canvas,e).y/60)&&y2==Math.floor(getCanvasPos(canvas,e).x/60)){
							count--;
						}else{
							count++;
							//判断吃子后该棋子是否还能继续吃子
							if((Boolean(datas[ax2-1][ay2-1]==1)&&Boolean(datas[ax2-2][ay2-2]==3))				
							||(Boolean(datas[ax2-1][ay2+1]==1)&&Boolean(datas[ax2-2][ay2+2]==3))){								
								if((Boolean(ax2==x2-1)&&Boolean(ay2==y2+1))
							||(Boolean(ax2==x2-1)&&Boolean(ay2==y2-1))){
									count+=2;
								}
								
								count-=2;						
							
							}
						}			
					}else{
						//下棋的位置违反规则，在原清除位置重绘该棋子，并重新选择
						context.fillStyle ='palevioletred';
						context.beginPath();
						context.arc(ry2*60+30,rx2*60+30,20,0,Math.PI*2,true);
						context.closePath();
						context.fill();
						datas[rx2][ry2]=2;
						count--;
					}
				}		
			break;	
			}
		
		console.log(datas);
		
		
		if(isP1Win1()||!isP1Win2()){
			alert('player1,WIN');
			init();
		}else if(isP2Win1()||!isP2Win2()){
			alert('player2,WIN');
			init();
		}

	}else{
		alert('error!');
	}
});



























