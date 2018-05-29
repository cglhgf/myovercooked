//取菜台
class Warehouse extends Pane {
    /**
     *
     * @param veggie  0：蘑菇 1：西红柿
     */
    constructor({
        veggie,
        position
    }) {
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

    pickContent() {
        if (this.content.length === 0) {
            return new Veggie({
                type: this.veggie,
                state: 0
            })
        } else {
            let result = this.content;
            this.content = null;
            return result;
        }
    }
}