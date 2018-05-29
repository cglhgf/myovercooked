class Game {
    constructor(map) {
        this.menus = [];
        this.player1 = new Person({
            id: 0,
        });
        this.player2 = new Person({
            id: 1,
        });
        this.score = new Score(this.menus);
        this.cupboard = new Cupboard({
            x: 0,
            y: 0
        });
        this.output = new Output({
            cupboard: this.cupboard,
            position: {
                x: 0,
                y: 1
            },
            score: this.score
        });
        this.map = this.initMap(map);
        this.timer = {
            id: 0,
            totalTime: 120000,
            elapsedTime: 0
        };
    }

    initMap(map) {
        //  map = [[1, 1, 2, 1], [1, 1, 2, 1], [1, 1, 2, 1], [1, 1, 2, 1]];
        // 0:普通； 1：灶台 ； 2：取菜台（8：蘑菇 9：西红柿） ； 3：切菜台 ； 4：上菜口 ； 5 ：垃圾桶 ； 6：出盘口 7：地砖
        //11 边界  12 player1  13 player2
        let result = [];
        for (let i = 0; i < map.length; i++) {
            result.push([]);
            for (let j = 0; j < map[0].length; j++) {
                switch (map[i][j]) {
                    case 0:
                        result[i][j] = new Pane({
                            type: 0,
                            position: {
                                x: i,
                                y: j
                            },
                            enable_move: false,
                            put_down: true,
                            pick_up: true,
                            content: null
                        });
                        break;
                    case 1:
                        result[i][j] = new Pane({
                            type: 1,
                            position: {
                                x: i,
                                y: j
                            },
                            enable_move: false,
                            put_down: true,
                            pick_up: true,
                            content: new Pan({})
                        });
                        break;
                        //取菜口2有两种菜，所以分成8和9( 8 蘑菇  9 西红柿)
                    case 3:
                        result[i][j] = new Chopping({
                            position: {
                                x: i,
                                y: j
                            }
                        });
                        break;
                    case 4:
                        result[i][j] = this.output;
                        break;
                    case 5:
                        result[i][j] = new Pane({
                            type: 5,
                            position: {
                                x: i,
                                y: j
                            },
                            enable_move: false,
                            put_down: true,
                            pick_up: false,
                            content: null
                        });
                        break;
                    case 6:
                        result[i][j] = this.cupboard;
                        this.cupboard.setPosition({
                            x: i,
                            y: j
                        });
                        break;
                    case 7:
                        result[i][j] = new Pane({
                            type: 7,
                            position: {
                                x: i,
                                y: j
                            },
                            enable_move: true,
                            put_down: false,
                            pick_up: false,
                            content: null
                        });
                        break;
                    case 8:
                        result[i][j] = new Warehouse({
                            veggie: 0,
                            position: {
                                x: i,
                                y: j
                            }
                        });
                        break;
                    case 9:
                        result[i][j] = new Warehouse({
                            veggie: 1,
                            position: {
                                x: i,
                                y: j
                            }
                        });
                        break;
                    case 10:
                        result[i][j] = new Pane({
                            type: 0,
                            position: {
                                x: i,
                                y: j
                            },
                            enable_move: false,
                            put_down: true,
                            pick_up: true,
                            content: new Plate({})
                        });
                        break;
                    case 11:
                        result[i][j] = new Pane({
                            type: 0,
                            position: {
                                x: i,
                                y: j
                            },
                            enable_move: false,
                            put_down: false,
                            pick_up: false,
                            content: null
                        });
                        break;
                    case 12:
                        result[i][j] = new Pane({
                            type: 7,
                            position: {
                                x: i,
                                y: j
                            },
                            enable_move: true,
                            put_down: false,
                            pick_up: false,
                            content: this.player1
                        });
                        this.player1.position = {
                            x: i,
                            y: j
                        };
                        this.player1.forward_object = result[i + this.player1.forward.x][j + this.player1.forward.y];
                        break;
                    case 13:
                        result[i][j] = new Pane({
                            type: 7,
                            position: {
                                x: i,
                                y: j
                            },
                            enable_move: true,
                            put_down: false,
                            pick_up: false,
                            content: this.player2
                        });
                        this.player2.position = {
                            x: i,
                            y: j
                        };
                        this.player2.forward_object = result[i + this.player2.forward.x][j + this.player2.forward.y];
                        break;

                }
            }
        }
        return result;
    }

    start() {
        starta()
        let id = setInterval(() => {
            if (this.timer.totalTime <= this.timer.elapsedTime) {
                this.end();
            }
            if (this.timer.elapsedTime % 10000 === 0) {
                if (this.menus.length <= 3) {
                    let type = Math.floor(Math.random());
                    let number = Math.floor(Math.random() * 2) + 1;
                    this.menus.push(new Menu({
                        type,
                        number,
                        score: this.score
                    }));
                }
            }
            this.timer.elapsedTime += 16;
        }, 16);
        this.timer.id = id;
    }

    end() {

        clearInterval(this.timer.id);
        alert('游戏结束')
        clearInterval(timer)
        bar.style.width = 0
        a=0;
        this.timer = {
            id: 0,
            totalTime: 120000,
            elapsedTime: 0
        };
        init()
    }

    player1Moving(forward) {
        this.moving(this.player1, this.player2, forward);
    }
    player2Moving(forward) {
        this.moving(this.player2, this.player1, forward);
    }
    moving(obj1, obj2, forward) {
        //1》判断按键方向与人物2的 "forward" 是否一致    如果不一致，需要先转动（改变人物2的 "forward" 属性和 "img" 属性）
        //var urlStr=obj1.forward.+obj1.img.+".png";
        //obj1.img=urlStr;
        const originP = {x: obj1.position.x, y: obj1.position.y}
        if (obj1.forward.x != forward.x || obj1.forward.y != forward.y) {
            obj1.forward.x = forward.x;
            obj1.forward.y = forward.y;
            //obj1.img=url();
            obj1.forward_object = this.findForwardObj(obj1.position, forward);
        }
        //2》判断人物面前是否可以移动    1、根据地图矩阵判断 2、判断另一个人物的位置
        if (obj1.forward_object.enable_move === true ) {
            if (obj1.forward_object.content.length === 0) {
                this.map[obj1.forward_object.position.x][obj1.forward_object.position.y].content = [];
                obj1.move();
                this.map[obj1.forward_object.position.x][obj1.forward_object.position.y].content = obj1;
                obj1.forward_object = this.findForwardObj(obj1.position, forward);
                this.map[originP.x][originP.y].content = [];
            } else {
                //两人物之间发生碰撞，会将对方推走
                const obj2Aim = this.findForwardObj(obj2.position,obj1.forward)
                if(obj2Aim.enable_move===true){
                    this.map[obj2.position.x][obj2.position.y].content = [];
                obj2.move(obj1.forward);
                this.map[obj2Aim.position.x][obj2Aim.position.y].content = obj2;
                obj2.forward_object = this.findForwardObj(obj2.position, obj2.forward);
                this.map[obj1.position.x][obj1.position.y].content = [];
                obj1.move();
                this.map[obj1.forward_object.position.x][obj1.forward_object.position.y].content = obj1;
                obj1.forward_object = this.findForwardObj(obj1.position, forward);
                }
                
            }
        }
        render(this.map)
    }
    findForwardObj(obj, forward) {
        var newObj = { ...obj};
        newObj.x += forward.x;
        newObj.y += forward.y;
        return this.map[newObj.x][newObj.y]

    }

    showEnding() {
        alert("最终分数：" + this.score);
    }
}