
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
    constructor({
        type,
        position,
        enable_move,
        put_down,
        pick_up,
        content
    }) {
        super();
        this.type = type;
        this.position = position;
        this.enable_move = enable_move;
        this.put_down = put_down;
        this.pick_up = pick_up;
        this.content = content || [];
    }

    setPosition(position) {
        this.position = position;
    }
}