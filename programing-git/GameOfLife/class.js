class Grass {
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

class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
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

    getNewCoordinates() {
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
        this.getNewCoordinates();
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
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact && this.energy >= 12) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 2;
            let eater = new GrassEater(x, y);
            grEaterArr.push(eater);
            this.energy = 20;
        }
    }
    eat() {
        let found = this.chooseCell(1);
        let exact = random(found);
        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];
            for (var i = 0; i < grassArr.length; i++) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1)
                }

            }
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
            if (this.energy > 30) {
                this.mul();
            }

        } else {
            this.move()
        }
    }
    move() {
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact) {
            this.energy -= 5;
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
            if (this.energy < 0) {
                this.die();
            }

        } else {
            this.energy--;
            if (this.energy < 0) {
                this.die();
            }
        }
    }
    die() {
        for (var i = 0; i < grEaterArr.length; i++) {
            if (this.x == grEaterArr[i].x && this.y == grEaterArr[i].y) {
                grEaterArr.splice(i, 1)
            }
            matrix[this.y][this.x] = 0;
        }
    }
}

class Hunter {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
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
    getNewCoordinates() {
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
        this.getNewCoordinates();
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

    eat() {
        let found = this.chooseCell(1);
        let found2 = this.chooseCell(2);
        let exact = random(found);
        let exact2 = random(found2);

        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];
            for (var i = 0; i < grassArr.length; i++) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        } else if (exact2) {


            this.energy += 5;
            let x = exact2[0];
            let y = exact2[1];
            for (var i2 = 0; i2 < grEaterArr.length; i2++) {
                if (x == grEaterArr[i2].x && y == grEaterArr[i2].y) {
                    grEaterArr.splice(i2, 1);
                }

            }
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;

        } else {
            this.move()
        }

    }
    move() {
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact) {
            this.energy -= 5;
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
            if (this.energy < 0) {
                this.die();
            }

        } else {
            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
    }
    die() {
        for (var i = 0; i < huntArr.length; i++) {
            if (this.x == huntArr[i].x && this.y == huntArr[i].y) {
                huntArr.splice(i, 1)
            }
            matrix[this.y][this.x] = 0;
        }
    }

}

class Fire {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
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
    getNewCoordinates() {
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
        this.getNewCoordinates();
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
        this.energy += 5;
        let found = this.chooseCell(1);
        let exact = random(found);
        if (exact && this.energy >= 12) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 4;
            let fire = new Fire(x, y);
            fireArr.push(fire);
            this.energy = 20;
        }
    }

    born() {
        let found = this.chooseCell(1);
        let exact = random(found);

        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];
            for (var i = 0; i < grassArr.length; i++) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    let fire = new Fire(x, y);
                    fireArr.push(fire);
                    grassArr.splice(i, 1);
                }
            }
            matrix[y][x] = 4;
        } else if (this.energy < 0) {
            this.die();
        } else {
            this.energy -= 5;
        }

    }

    die() {
        for (var i = 0; i < fireArr.length; i++) {
            if (this.x == fireArr[i].x && this.y == fireArr[i].y) {
                fireArr.splice(i, 1)
            }
            matrix[this.y][this.x] = 5;
        }
    }

}

class Poison {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];

    }
}

class Mag {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
    getNewCoordinates() {
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
        this.getNewCoordinates();
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
    move() {
        let found = this.chooseCell(0);
        let exact = random(found);
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 7;
            matrix[this.y][this.x] = 1;
            this.y = y;
            this.x = x;
            let gr = new Grass(x, y);
            grassArr.push(gr);

        }
    }
}