//上菜口
class Output extends Pane {
    /**
     *
     * @param cupboard
     * @param position
     * @param score
     */
    constructor({
        cupboard,
        position,
        score
    }) {
        super({
            type: 4,
            position,
            enable_move: false,
            put_down: true,
            pick_up: false,
            content: null
        });
        this.score = score;
        this.cupboard = cupboard;
    }

    pushContent(content) {
        this.cupboard.addPlate();
        this.score.grade(content);
    }

}