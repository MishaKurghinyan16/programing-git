class Grass extends LivingCreature{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiplay = 0;

        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }
    chooseCell(char) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiplay += 5;
        let found = this.chooseCell(0);
        let found2 = this.chooseCell(6);
        let exact = random(found);
        let exact2 = random(found2);
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