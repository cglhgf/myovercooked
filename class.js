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
        this.content = content;
        this.foward = forward;
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

    cut() {
        if (this.forward_object.type === 3 && this.forward_object.content && this.forward_object.content.type === 0) {
            let veggie = this.forward_object.content;
            let id = setInterval(() => {

            }, 16);
        }
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
    constructor({type, enable_move, put_down, pick_up, content = []}) {
        super();
        this.type = type;
        this.enable_move = enable_move;
        this.put_down = put_down;
        this.pick_up = pick_up;
        this.content = content;
    }
}

//切菜台
class Chopping extends Pane {
    constructor() {
        super({
            type: 3,
            enable_move: false,
            put_down: true,
            pick_up: true,
            content: null
        });
        this.timer = {id: 0, totalTime: 4000, elapsedTime: 0}
    }

    canOperate(){
        if(this.content&&this.content.state !== 2){
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
        this.timer= {id: 0, totalTime: 4000, elapsedTime: 0};
        this.content.state = 2;
    }
}

//取菜台
class Warehouse extends Pane {
    /**
     *
     * @param veggie  0：蘑菇 1：西红柿
     */
    constructor(veggie) {
        super({
            type: 2,
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
    constructor(cupboard) {
        super({
            type: 4,
            enable_move: false,
            put_down: true,
            pick_up: false,
            content: null
        });
        this.cupboard = cupboard;
    }

    pushContent(content) {
        //todo 对菜进行评价计分
        this.cupboard.addPlate();
    }
}

//出盘口
class Cupboard extends Pane {
    constructor() {
        super({
            type: 6,
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
    constructor({type, state}) {
        super();
        this.type = type;
        this.state = state;
    }

}

class Food extends Utils {
    /**
     *
     * @param composition  原材料
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
    constructor({content = [], onheard, status}) {
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


class Utils {
    constructor() {
    }

    pushContent(obj) {
        this.content = obj;
    }

    pickCotent() {
        let result = this.content;
        this.content = null;
        return result;
    }

}

const map = [];

