//盘子
class Plate extends Utils {
    /**
     *
     * @param content
     * @param status  0:空的 1：有东西的
     */
    constructor({
        content
    }) {
        super();
        this.type = 4;
        this.content = content || null;

    }

    canPut() {
        if (!this.content) {
            return true;
        } else {
            return false;
        }
    }

}