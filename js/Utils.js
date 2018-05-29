class Utils {
    constructor() {}

    pushContent(obj) {
        this.content = obj;
    }

    pickContent() {
        let result = this.content;
        this.content = null;
        return result;
    }

}