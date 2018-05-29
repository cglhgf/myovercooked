//锅

class Pan extends Utils {
    /**
     *
     * @param content
     * @param onhearh
     * @param status  0:空；1：正在煮；2：熟了；3：糊了
     * @param type
     */
    constructor({
        content=[],
        onhearh=true,
        status=0
    }) {
        super();
        this.type = 3; //锅
        this.content = content || [];
        this.onhearh = onhearh || true;
        this.timer1 = {
            id: 0,
            totalTime: 0,
            elapsedTime: 0
        };
        this.timer2 = {
            id: 0,
            totalTime: 4000,
            elapsedTime: 0
        };
        this.status = status || 0;
    }

    pushContent(food) {
        this.content.push(food);
        this.timer1.totalTime += 4000;
        if (this.onhearh) {
            this.startCooking();
        }
    }

    pickContent() {
        this.timer1 = {
            id: 0,
            totalTime: 0,
            elapsedTime: 0
        };
        this.timer2 = {
            id: 0,
            totalTime: 4000,
            elapsedTime: 0
        };
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
        } else return false;
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