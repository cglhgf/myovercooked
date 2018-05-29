//菜
class Veggie extends Utils {
    /**
     * @param type 0:"蘑菇" ; 1:"西红柿" ;
     * @param state 0："生的"  1：”正在切的“ 2："切好的"
     */
    constructor({
        type
    }) {
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
    constructor({
        composition,
        state
    }) {
        super();
        this.composition = composition;
        this.state = state;
    }
}