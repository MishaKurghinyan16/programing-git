var LivingCreature = require("./LivingCreature")
module.exports = class Grass extends LivingCreature{
    mul() {
        this.multiplay += 5;
        let found = super.chooseCell(0);
        let found2 = super.chooseCell(6);
        let exact = found[Math.random()* found.length]
        let exact2 = found[Math.random()* found2.length]

        if (exact && this.multiplay > 1) {
            let x = exact[0];
            let y = exact[1];
            let grass = new Grass(x, y)
            matrix[y][x] = 1;
            grassArr.push(grass);
            this.multiplay = 0;
        }
        if (exact2) {
            let x = exact2[0];
            let y = exact2[1];
            let grass = new Grass(x, y);
            matrix[y][x] = 1;
            grassArr.push(grass);
            this.multiplay -= 50;

            for (var i = 0; i <= poisonArr.length; ++i) {
                if (x == poisonArr[i].x && y == poisonArr[i].y) {
                    poisonArr.splice(i, 1);
                }
            }

        }
    }
}