//菜单
class Menu {
    /**
     *
     * @param type
     * @param number
     * @param score
     */
    constructor({
        type,
        number,
        score
    }) {
        this.type = type;
        this.number = number;
        this.score = score;
        this.timer = {
            id: 0,
            totalTime: 60000,
            elapsedTime: 0
        };
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