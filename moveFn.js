//付禹陶 2018.05.10
/*
	实现功能:
		按 WSAD 时，Player1 移动
		按上下左右时，Player2 移动

	需要有两个人物的实体 ==> Ply1    Ply2
	对应有两个人物的元素 ==> Player1 Player2  (全局对象)

	每进行一步移动操作，都会修改 Player1 或 Player2 中属性的值
	然后，实体 Ply1 和 Ply2 根据 Player1和Player2的属性来移动

*/

//	"img":"url(images/left-1.png)"
/*
constructor({id, content, forward, position, forward_object}) {
        super();
        this.id = id;
        this.content = content;
        this.foward = forward;
        this.position = position;
        this.forward_object = forward_object;
    }
*/


MapArray=new Map();
len=MapArray[0].length;  //宽度为19个格子
Player1=new Person("id","content","forward","position","forward_object");
Player2=new Person();

document.onkeyup=function(e){
	var e=window.event||e;
	switch(e.keyCode){
	//Player2按键
		case 37:
			throttle(moving(Player2,Player1,"Left"),200);
			break;
		case 38:
			throttle(moving(Player2,Player1,"Up"),200);
			break;
		case 39:
			throttle(moving(Player2,Player1,"Right"),200);
			break;
		case 40:
			throttle(moving(Player2,Player1,"Down"),200);
			break;
		/*
		case :
			break;
		case :
			break;
		*/
	//Player1按键
		case 65:
			throttle(moving(Player1,Player2,"Left"),200);
			break;
		case 87:
			throttle(moving(Player1,Player2,"Up"),200);
			break;
		case 68:
			throttle(moving(Player1,Player2,"Right"),200);
			break;
		case 83:
			throttle(moving(Player1,Player2,"Down"),200);
			break;
		/*
		case 70:
			//F
			switch(judgeForward()){
				case:
				case:
			}
			break;
		case 71:
			//G
			break;
		*/
	}
}

function moving(obj1,obj2,direction){
//1》判断按键方向与人物2的 "forward" 是否一致    如果不一致，需要先转动（改变人物2的 "forward" 属性和 "img" 属性）
	var urlStr=obj1.forward.+obj1.img.+".png";
	obj1.img=urlStr;
	if(obj1.forward!=direction){
		obj1.forward=direction;
		//obj1.img=url();
		obj1.forward_object=findForwardObj(obj1.position,direction)[1];
	}
//2》判断人物面前是否可以移动    1、根据地图矩阵判断 2、判断另一个人物的位置
	if(obj1.forward_object===0){
		if(findForwardObj(obj1.position,direction)[0][0]!==obj2.position[0]||findForwardObj(obj1.position,direction)[0][1]!==obj2.position[1]){
			obj1.position=findForwardObj(obj1.position,direction)[0];
			var indexposition=findForwardObj(obj1.position,direction)[0];
			obj1.forward_object=MapArray[indexposition[0]][indexposition[1]];
		}else{
		//两人物之间发生碰撞，会将对方推走
			var judgeArr=findForwardObj(obj2.position,direction);
			if( judgeArr[1]===0 ){
				obj2.position=judgeArr[0];
				obj1.position=findForwardObj(obj1.position,direction)[0];
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
	return [[i,j],MapArray[i][j]];
}

function throttle(fn,time=200){
  let timer;
  return function(...args){
    if(timer == null){
      fn.apply(this,args);
      timer = setTimeout(() => {
        timer = null;
      }, time)
    }
  }
}



