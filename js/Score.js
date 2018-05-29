//评分系统
class Score {
    constructor(menu) {
        this.score = 0;
        this.menus = menu;
    }

    grade(content) {
        // for (let i = 0; i < this.menus.length; i++) {
            // if (this.menus[i].isMatch(content)) {
                this.score += 10;
                document.querySelector('.score a').innerHTML = this.score
                // let menu = this.menus.splice(i, 1);
                // menu.stopTimer();
                return;
            // }
        // }
    }

    reduceGrade() {
        this.score -= 10;
    }


}