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
    constructor({
        id,
        content,
        forward,
        position,
        forward_object
    }) {
        super();
        this.id = id;
        this.action = 0;
        this.content = content || null;
        this.forward = forward || {
            y: -1,
            x: 0
        };
        this.position = position || {
            x: 1,
            y: 1
        };
        this.forward_object = forward_object || null;
    }

    put() {
        switch (this.forward_object.type) {
            /*普通的台子或者取菜台*/
            case 0:
            case 2:
                //没有东西
                if (this.forward_object.content.length === 0) {
                    this.forward_object.content = this.content;
                    this.content = null;
                } else {
                    //上有锅之后还能继续放菜
                    let vessel = this.forward_object.content[0];
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
                    if ((this.content.type === 1 || this.content.type === 0) && this.content.state === 2) {
                        this.forward_object.content.content.push(new Food({composition:[this.content],state:0}));
                        this.forward_object.content.status = 2
                        this.content = null;
                    }
                }
                break;
            //切菜口
            case 3:
                if (this.forward_object.content.length === 0) {
                    if ((this.content.type === 1 || this.content.type === 0) && this.content.state === 0) {
                        this.content.state=2;
                        this.forward_object.content.push(this.content);
                        this.content = null;
                    }
                }
                break;
            //上菜口
            case 4:
                if (this.content[0].type === 4) {
                    this.forward_object.pushContent(this.content);
                    this.content = null
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
        if(!(this.forward_object.id + 1)) {
            switch (this.forward_object.type) {
                /*普通的台子或者出盘口*/
                case 0:
                    //有东西
                    if (this.forward_object.content.length !== 0 && this.content === null) {
                        this.content = this.forward_object.content;
                        this.forward_object.content = [];
                    }
                    break;
                case 6:
                    //有东西
                    if (this.forward_object.content && this.content === null) {
                        this.content = this.forward_object.content;
                        this.forward_object.content = [];
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
                    if (this.forward_object.content.length !== 0 && this.content === null) {
                        let veggie = this.forward_object.content[0];
                        if (veggie.state === 0 || veggie.state === 2) {
                            this.content = veggie;
                            this.forward_object.content = [];
                        }
                    }
                    break;
            }
        }
        
    }

    //判断是取还是放
    chooseP(){
        if(this.content){
            this.put();
        }
        else {
            this.pick();
        }
        const {x, y} = this.position
        game.map[x][y].content.content = this.content
        render(game.map)
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
        if (forward) {
            this.position.x += forward.x;
            this.position.y += forward.y;
        } else {
            this.position.x += this.forward.x;
            this.position.y += this.forward.y;
        }
    }

    turn(forward) {
        this.forward = forward;
    }

    setForwardObject(obj) {
        this.forward_object = obj;
    }


}
