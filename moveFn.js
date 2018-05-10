//付禹陶 2018.05.08
/*
	实现功能:
		按 WSAD 时，Player1 移动
		按上下左右时，Player2 移动

	需要有两个人物的实体 ==> Ply1    Ply2
	对应有两个人物的元素 ==> Player1 Player2  (全局对象)

	每进行一步移动操作，都会修改 Player1 或 Player2 中属性的值
	然后，实体 Ply1 和 Ply2 根据 Player1和Player2的属性来移动

*/

//”AAA“表示边界，”BBB“表示地板
MapArray=[
	"AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA",
	"AAA","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","AAA",
	"AAA","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","AAA",
	"AAA","BBB","BBB","AAA","AAA","AAA","BBB","BBB","AAA","AAA","AAA","BBB","BBB","AAA","AAA","AAA","BBB","BBB","AAA",
	"AAA","BBB","BBB","BBB","BBB","AAA","BBB","BBB","AAA","BBB","BBB","BBB","BBB","AAA","BBB","AAA","BBB","BBB","AAA",
	"AAA","BBB","BBB","BBB","BBB","AAA","BBB","BBB","AAA","BBB","BBB","BBB","BBB","AAA","BBB","AAA","BBB","BBB","AAA",
	"AAA","BBB","BBB","AAA","AAA","AAA","BBB","BBB","AAA","AAA","AAA","BBB","BBB","AAA","BBB","AAA","BBB","BBB","AAA",
	"AAA","BBB","BBB","BBB","BBB","AAA","BBB","BBB","AAA","BBB","AAA","BBB","BBB","AAA","BBB","AAA","BBB","BBB","AAA",
	"AAA","BBB","BBB","BBB","BBB","AAA","BBB","BBB","AAA","BBB","AAA","BBB","BBB","AAA","BBB","AAA","BBB","BBB","AAA",
	"AAA","BBB","BBB","AAA","AAA","AAA","BBB","BBB","AAA","AAA","AAA","BBB","BBB","AAA","AAA","AAA","BBB","BBB","AAA",
	"AAA","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","AAA",
	"AAA","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","BBB","AAA",
	"AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA","AAA"
];

//需要提前给出地图的宽度
len=19;  //宽度为19个格子



//初始化两个人物对象的信息
Player1={
	"id": "Player1",
	//"content": {},
	"forward": "Down",
	"position": [1,3],
	"forwardObject": "BBB",
	"img":"url(images/left-1.png)"
};
Player2={
	"id": "Player2",
	"content": {},
	"forward": "Down",
	"position": [3,2],
	"forwardObject": "BBB",
	"img":"url(images/left-1.png)"
};
var box=document.getElementById("box");
box.style.width=len*50+"px";

//初始化游戏，创建两个人物的实体节点
function initGame(){
	for(var index=0;index<MapArray.length;index++){
		var node=document.createElement("div");
		node.className=MapArray[index];
		box.appendChild(node);
	}
//创建Player1
	var node1=document.createElement("div");
	node1.id="P1";
	node1.style.left=Player1.position[1]*50+"px";
	node1.style.top=Player1.position[0]*50+"px";
	box.appendChild(node1);
//创建Player2
	var node2=document.createElement("div");
	node2.id="P2";
	node2.style.left=Player2.position[1]*50+"px";
	node2.style.top=Player2.position[0]*50+"px";
	box.appendChild(node2);
}
initGame();

var Ply1=document.getElementById("P1");
var Ply2=document.getElementById("P2");




/*
MapArray=new Map();
Player1=new person();
Player2=new person();


需要知道每个格子的宽度=？px
*/


document.onkeyup=function(e){
	var e=window.event||e;
	alert(e.keyCode);
	switch(e.keyCode){
	//Player2按键
		case 37:
			throttle(moving(Player2,Player1,"Left",Ply2,Ply1),200);
			break;
		case 38:
			throttle(moving(Player2,Player1,"Up",Ply2,Ply1),200);
			break;
		case 39:
			throttle(moving(Player2,Player1,"Right",Ply2,Ply1),200);
			break;
		case 40:
			throttle(moving(Player2,Player1,"Down",Ply2,Ply1),200);
			break;
	//Player1按键
		case 65:
			throttle(moving(Player1,Player2,"Left",Ply1,Ply2),200);
			break;
		case 87:
			throttle(moving(Player1,Player2,"Up",Ply1,Ply2),200);
			break;
		case 68:
			throttle(moving(Player1,Player2,"Right",Ply1,Ply2),200);
			break;
		case 83:
			throttle(moving(Player1,Player2,"Down",Ply1,Ply2),200);
			break;
	}
}

function moving(obj1,obj2,direction,item1,item2){
//1》判断按键方向与人物2的 "forward" 是否一致    如果不一致，需要先转动（改变人物2的 "forward" 属性和 "img" 属性）
	if(obj1.forward!=direction){
		obj1.forward=direction;
		//obj1.img=url();
		obj1.forwardObject=findForwardObj(obj1.position,direction)[1];
	}
//2》判断人物面前是否可以移动    1、根据地图矩阵判断 2、判断另一个人物的位置
	if(obj1.forwardObject==="BBB"){
		if(findForwardObj(obj1.position,direction)[0][0]!==obj2.position[0]||findForwardObj(obj1.position,direction)[0][1]!==obj2.position[1]){
			obj1.position=findForwardObj(obj1.position,direction)[0];
			var indexposition=findForwardObj(obj1.position,direction)[0];
			obj1.forwardObject=MapArray[indexposition[0]*len+indexposition[1]];
			//操作 html 中的对象实体
			switch(direction){
				case "Left":
					item1.style.left=obj1.position[1]*50+"px";
					//item1.style.background=obj1.img;
					break;
				case "Up":
					item1.style.top=obj1.position[0]*50+"px";
					break;
				case "Right":
					item1.style.left=obj1.position[1]*50+"px";
					break;
				case "Down":
					item1.style.top=obj1.position[0]*50+"px";
					break;
			}
		}else{
		//两人物之间发生碰撞，会将对方推走
			var judgeArr=findForwardObj(obj2.position,direction);
			if( judgeArr[1]==="BBB" ){
				obj2.position=judgeArr[0];
				obj1.position=findForwardObj(obj1.position,direction)[0];
			//操作 html 中的对象实体
				switch(direction){
					case "Left":
						item1.style.left=obj1.position[1]*50+"px";
						item2.style.left=obj2.position[1]*50+"px";
						break;
					case "Up":
						item1.style.top=obj1.position[0]*50+"px";
						item2.style.top=obj2.position[0]*50+"px";
						break;
					case "Right":
						item1.style.left=obj1.position[1]*50+"px";
						item2.style.left=obj2.position[1]*50+"px";
						break;
					case "Down":
						item1.style.top=obj1.position[0]*50+"px";
						item2.style.top=obj2.position[0]*50+"px";
						break;
				}
			}
		}
	}
}

function findForwardObj(arr,forward){
	// arr==>坐标[x,y]  forward==>按键方向
	var i=arr[0],j=arr[1];
	switch(forward){
		case "Left":
			j--; break;
		case "Up":
			i--; break;
		case "Right":
			j++; break;
		case "Down":
			i++; break;
	}
	return [[i,j],MapArray[i*len+j]];
}

function throttle(fn, time = 200){
  let timer;
  return function(...args){
    if(timer == null){
      fn.apply(this,  args);
      timer = setTimeout(() => {
        timer = null;
      }, time)
    }
  }
}



