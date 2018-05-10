//人
class Person extends Utils {
    /**
     *
     * @param id
     * @param content
     * @param forward
     * @param position
     * @param {Pane} forward_object
     */
    constructor({id, content, forward, position, forward_object}) {
        super();
        this.id = id;
        this.action = 0;
        this.content = content;
        this.forward = forward;
        this.position = position;
        this.forward_object = forward_object;
    }

    put() {
        switch (this.forward_object.type) {
            /*普通的台子或者取菜台*/
            case 0:
            case 2:
                //没有东西
                if (this.forward_object.content === null) {
                    this.forward_object.content = this.content;
                    this.content = null;
                }
                else {
                    //上有锅之后还能继续放菜
                    let vessel = this.forward_object.content;
                    if (vessel.type === 3 && vessel.canPut()) {
                        //切好的菜
                        if ((this.content.type === 1 || this.content.type === 2) && this.content.state === 2) {
                            vessel.pushContent(this.content);
                            this.content = null;
                        }
                    }
                    //有盘子还能放Food
                    else if (vessel.type === 4 && vessel.canPut()) {
                        let pan = this.content;
                        if (pan.type === 3 && pan.canPick()) {
                            vessel.pushContent(pan.pickContent());
                        }
                    }
                }
                break;
            /*灶台*/
            case 1:
                //空灶台
                if (this.forward_object.content === null) {
                    if (this.content.type === 3) {
                        this.forward_object.content = this.content;
                        this.content = null;

                        let pan = this.forward_object.content;
                        pan.onhearh = true;
                        if (pan.status === 1) {
                            pan.startCooking();
                        }
                        if (pan.status === 2) {
                            pan.startOverCooking();
                        }
                    }
                } else {
                    //手里是切好的菜
                    if ((this.content.type === 1 || this.content.type === 2) && this.content.state === 2) {
                        this.forward_object.content.pushContent(this.content);
                        this.content = null;
                    }
                }
                break;
            //切菜口
            case 3:
                if (this.forward_object.content === null) {
                    if ((this.content.type === 1 || this.content.type === 2) && this.content.state === 0) {
                        this.forward_object.content.pushContent(this.content);
                        this.content = null;
                    }
                }
                break;
            //上菜口
            case 4:
                if (this.content.type === 4) {
                    this.forward_object.pushContent(this.content);
                }
                break;
            //垃圾桶
            case 5:
                if (this.content.type === 4 || this.content.type === 3) {
                    this.content.pickContent();
                } else {
                    this.content = null;
                }
                break;
        }
    }

    pick() {
        switch (this.forward_object.type) {
            /*普通的台子或者出盘口*/
            case 0:
            case 7:
                //有东西
                if (this.forward_object.content && this.content === null) {
                    this.content = this.forward_object.content;
                    this.forward_object.content = null;
                }
                break;
            /*灶台*/
            case 1:
                //灶台上有东西
                if (this.forward_object.content && this.content === null) {
                    let pan = this.forward_object.content;
                    //锅里的东西是空的或者糊的
                    if (pan.status === 0 || pan.status === 3) {
                        this.content = pan;
                        pan.onhearh = false;
                        this.forward_object.content = null;
                    }
                    //锅里的东西是正在煮的或者熟的（正在糊）
                    else {
                        if (pan.status === 1) {
                            pan.pauseCooking();
                            this.content = pan;
                            this.forward_object.content = null;
                        }
                        if (pan.status === 2) {
                            pan.pauseOverCooking();
                            this.content = pan;
                            this.forward_object.content = null;
                        }
                    }
                }
                break;
            //取菜台
            case 2:
                if (this.content === null) {
                    this.content = this.forward_object.pickContent();
                }
                break;
            //切菜口
            case 3:
                if (this.forward_object.content && this.content === null) {
                    let veggie = this.forward_object.content.type;
                    if (veggie.state === 0 || veggie.state === 2) {
                        this.content = veggie;
                        this.forward_object = null;
                    }
                }
                break;
        }
    }

    startCutting() {
        if (this.forward_object.type === 3 && this.forward_object.content && this.forward_object.content.state === 0) {
            let chop = this.forward_object;
            chop.startChop();
            this.action = 1;
        }
    }

    pauseCutting() {
        if (this.action === 1) {
            let chop = this.forward_object;
            this.action = 0;
            chop.pauseChop();
        }
    }

    move(forward) {
        this.turn(forward);
        this.position.x += this.forward.x;
        this.position.y += this.forward.y;
    }

    turn(forward) {
        this.forward = forward;
    }

    setForwardObject(obj) {
        this.forward_object = obj;
    }


}

//台子
class Pane extends Utils {
    /**
     *
     * @param type 0:普通； 1：灶台 ； 2：取菜台 ； 3：切菜台 ； 4：上菜口 ； 5 ：垃圾桶 ； 6：出盘口
     * @param enable_move
     * @param put_down
     * @param put_up
     * @param content vegggie||pan||plate
     */
    constructor({type, position, enable_move, put_down, pick_up, content = []}) {
        super();
        this.type = type;
        this.position = position;
        this.enable_move = enable_move;
        this.put_down = put_down;
        this.pick_up = pick_up;
        this.content = content;
    }

    setPosition(position) {
        this.position = position;
    }
}

//切菜台
class Chopping extends Pane {
    /**
     *
     * @param position
     */
    constructor({position}) {
        super({
            type: 3,
            position,
            enable_move: false,
            put_down: true,
            pick_up: true,
            content: null
        });
        this.timer = {id: 0, totalTime: 4000, elapsedTime: 0}
    }

    canOperate() {
        if (this.content && this.content.state !== 2) {
            return true;
        }
        else return false;
    }

    startChop() {

        if (this.timer.id === 0) {
            this.content.state = 1;
            let id = setInterval(() => {
                if (this.timer.totalTime <= this.timer.elapsedTime) {
                    this.stopChop();
                }
                this.timer.elapsedTime += 16;
            }, 16);
            this.timer.id = id;
        }
    }

    pauseChop() {
        clearInterval(this.timer.id);
        this.timer.id = 0;
    }

    stopChop() {
        clearInterval(this.timer.id);
        this.timer = {id: 0, totalTime: 4000, elapsedTime: 0};
        this.content.state = 2;
    }
}

//取菜台
class Warehouse extends Pane {
    /**
     *
     * @param veggie  0：蘑菇 1：西红柿
     */
    constructor({veggie, position}) {
        super({
            type: 2,
            position,
            enable_move: false,
            put_down: true,
            pick_up: true,
            content: null
        });
        this.veggie = veggie;
    }

    pickCotent() {
        if (!this.content) {
            return new Veggie({
                type: this.veggie,
                state: 0
            })
        }
        else {
            let result = this.content;
            this.content = null;
            return result;
        }
    }
}

//上菜口
class Output extends Pane {
    /**
     *
     * @param cupboard
     * @param position
     * @param score
     */
    constructor({cupboard, position, score}) {
        super({
            type: 4,
            position,
            enable_move: false,
            put_down: true,
            pick_up: false,
            content: null
        });
        this.score = score;
        this.cupboard = cupboard;
    }

    pushContent(content) {
        this.cupboard.addPlate();
        this.score.grade(content);
    }

}

//出盘口
class Cupboard extends Pane {
    constructor({position}) {
        super({
            type: 6,
            position,
            enable_move: false,
            put_down: false,
            pick_up: true,
            content: []
        });
    }

    addPlate() {
        this.content.push(new Plate())
    }
}

//菜
class Veggie extends Utils {
    /**
     * @param type 0:"蘑菇" ; 1:"西红柿" ;
     * @param state 0："生的"  1：”正在切的“ 2："切好的"
     */
    constructor({type}) {
        super();
        this.type = type;
        this.state = 0;
    }

}

class Food extends Utils {
    /**
     *
     * @param composition  原材料[]
     * @param state  0 ：熟的  1：糊的
     */
    constructor({composition, state}) {
        super();
        this.composition = composition;
        this.state = state;
    }
}


//锅

class Pan extends Utils {
    /**
     *
     * @param content
     * @param onheard
     * @param status  0:空；1：正在煮；2：熟了；3：糊了
     * @param type
     */
    constructor({content = [], onheard = true, status = 0}) {
        super();
        this.type = 3; //锅
        this.content = content;
        this.onhearh = onhearh;
        this.timer1 = {id: 0, totalTime: 0, elapsedTime: 0};
        this.timer2 = {id: 0, totalTime: 4000, elapsedTime: 0};
        this.status = status;
    }

    pushContent(food) {
        this.content.push(food);
        this.timer1.totalTime += 4000;
        if (this.onhearh) {
            this.startCooking();
        }
    }

    pickContent() {
        this.timer1 = {id: 0, totalTime: 0, elapsedTime: 0};
        this.timer2 = {id: 0, totalTime: 4000, elapsedTime: 0};
        let result = this.content;
        this.content = null;
        this.status = 0;
        return result;
    }

    canPut() {
        if ((this.status === 1 || this.status === 0) && this.content.length < 3)
            return true;
        else
            return false;
    }

    canPick() {
        if (this.status === 2 || this.status === 3) {
            return true;
        }
        else return false;
    }

    startCooking() {

        if (this.timer1.id === 0) {
            let id = setInterval(() => {
                if (this.timer1.totalTime <= this.timer1.elapsedTime) {
                    this.stopCooking();
                }
                this.timer1.elapsedTime += 16;
            }, 16);
            this.timer1.id = id;
        }
    }

    pauseCooking() {
        clearInterval(this.timer1.id);
        this.onhearh = false;
        this.timer1.id = 0;
    }

    stopCooking() {
        clearInterval(this.timer1.id);
        this.timer1.id = 0;
        this.status = 2;

        this.content = new Food(this.content, 0);
        this.startOverCooking();
    }

    startOverCooking() {
        if (this.timer2.id === 0) {
            let id = setInterval(() => {
                if (this.timer2.totalTime <= this.timer2.elapsedTime) {
                    this.stopOverCooking();
                }

                this.timer2.elapsedTime += 16;
            }, 16);
            this.timer2.id = id;
        }
    }

    pauseOverCooking() {
        clearInterval(this.timer2.id);
        this.onhearh = false;
        this.timer2.id = 0;
    }

    stopOverCooking() {
        clearInterval(this.timer2.id);
        this.timer2.id = 0;
        this.status = 3;
        this.content.state = 1;
    }
}


//盘子
class Plate extends Utils {
    /**
     *
     * @param content
     * @param status  0:空的 1：有东西的
     */
    constructor({content = null}) {
        super();
        this.type = 4;
        this.content = content;

    }

    canPut() {
        if (!this.content) {
            return true;
        }
        else {
            return false;
        }
    }

}

class Ground {
    /**
     *
     * @param position
     */
    constructor(position) {
        this.type = 7;
        this.position = position;
    }
}

class Utils {
    constructor() {
    }

    pushContent(obj) {
        this.content = obj;
    }

    pickContent() {
        let result = this.content;
        this.content = null;
        return result;
    }

}

//菜单
class Menu {
    /**
     *
     * @param type
     * @param number
     * @param score
     */
    constructor({type, number, score}) {
        this.type = type;
        this.number = number;
        this.score = score;
        this.timer = {id: 0, totalTime: 60000, elapsedTime: 0};
        this.timer.id = setInterval(() => {
            if (this.timer.totalTime <= this.timer.elapsedTime) {
                this.score.reduceGrade();
                this.timer.elapsedTime = 0;
            }
            this.timer.elapsedTime += 16;
        }, 16);
    }

    stopTimer() {
        clearInterval(this.timer.id);
    }

    isMatch(plate) {
        if (plate.status === 0) {
            return false;
        }
        if (plate.content.state === 1) {
            return false;
        }
        if (plate.content.composition.length !== this.number) {
            return false;
        }
        return plate.content.composition.every((veggie) => {
            if (veggie === this.type)
                return true;
            else return false;
        })
    }


}

//评分系统
class Score {
    constructor(menu) {
        this.score = 0;
        this.menus = menu;
    }

    grade(content) {
        for (let i = 0; i < this.menus.length; i++) {
            if (this.menus[i].isMatch(content)) {
                this.score += 10;
                let menu = this.menus.splice(i, 1);
                menu.stopTimer();
                return;
            }
        }
    }

    reduceGrade() {
        this.score -= 10;
    }


}


class Game {
    constructor(map) {
        this.menus = [];
        this.score = new Score(this.menus);
        this.cupboard = new Cupboard();
        this.output = new Output({cupboard: this.cupboard, position: {x: 0, y: 1}, score: this.score});
        this.map = this.initMap(map);
        this.timer = {id: 0, totalTime: 120000, elapsedTime: 0};
    }

    initMap(map) {
        // let map = [[1, 1, 2, 1], [1, 1, 2, 1], [1, 1, 2, 1], [1, 1, 2, 1]];
        // 0:普通； 1：灶台 ； 2：取菜台（8：蘑菇 9：西红柿） ； 3：切菜台 ； 4：上菜口 ； 5 ：垃圾桶 ； 6：出盘口 7：地砖

        let result = [];
        for (let i = 0; i < 4; i++) {
            result.push([]);
            for (let j = 0; j < 4; j++) {
                switch (map[i][j]) {
                    case 0:
                        result[i][j] = new Pane({
                            type: 0,
                            position: {x: i, y: j},
                            enable_move: false,
                            put_down: true,
                            pick_up: true,
                            content: null
                        });
                        break;
                    case 1:
                        result[i][j] = new Pane({
                            type: 1,
                            position: {x: i, y: j},
                            enable_move: false,
                            put_down: true,
                            pick_up: true,
                            content: new Pan()
                        });
                        break;
                    //取菜口2有两种菜，所以分成8和9( 8 蘑菇  9 西红柿)
                    case 3:
                        result[i][j] = new Chopping({position: {x: i, y: j}});
                        break;
                    case 4:
                        result[i][j] = this.output;
                        break;
                    case 5:
                        result[i][j] = new Pane({
                            type: 5,
                            position: {x: i, y: j},
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
                            position: {x: i, y: j},
                            enable_move: true,
                            put_down: false,
                            pick_up: false,
                            content: null
                        });
                        break;
                    case 8:
                        result[i][j] = new Warehouse({
                            veggie: 0,
                            position: {x: i, y: j}
                        });
                        break;
                    case 9:
                        result[i][j] = new Warehouse({
                            veggie: 1,
                            position: {x: i, y: j}
                        });
                        break;

                }
            }
        }
        return result;
    }

    start() {

        let id = setInterval(() => {
            if (this.timer.totalTime <= this.timer.elapsedTime) {
                this.end();
            }
            if (this.timer.elapsedTime % 10000 === 0) {
                if (this.menus.length <= 3) {
                    let type = Math.floor(Math.random());
                    let number = Math.floor(Math.random() * 2) + 1;
                    this.menus.push(new Menu({type, number, score: this.score}));
                }
            }
            this.timer.elapsedTime += 16;
        }, 16);
        this.timer.id = id;
    }

    end() {
        clearInterval(this.timer.id);
        this.timer = {id: 0, totalTime: 120000, elapsedTime: 0};
    }

    showEnding(){
        alert("最终分数："+this.score);
    }
}