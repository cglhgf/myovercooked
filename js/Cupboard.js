//出盘口
class Cupboard extends Pane {
    constructor(position) {
        super({
            type: 6,
            position,
            enable_move: false,
            put_down: false,
            pick_up: true,
        });
        this.content = []
        this.addPlate()
    }

    addPlate() {
        this.content.push(new Plate({}))
    }
}