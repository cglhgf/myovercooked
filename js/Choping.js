//切菜台
class Chopping extends Pane {
    /**
     *
     * @param position
     */
    constructor({
        position
    }) {
        super({
            type: 3,
            position,
            enable_move: false,
            put_down: true,
            pick_up: true,
            content: null
        });
        this.timer = {
            id: 0,
            totalTime: 4000,
            elapsedTime: 0
        }
    }

    canOperate() {
        if (this.content && this.content.state !== 2) {
            return true;
        } else return false;
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
        this.timer = {
            id: 0,
            totalTime: 4000,
            elapsedTime: 0
        };
        this.content.state = 2;
    }
}