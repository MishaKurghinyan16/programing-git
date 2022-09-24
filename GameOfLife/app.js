var io = io();

var side = 50;
var fireArr = [];
var grassArr = [];
var grEaterArr = [];
var huntArr = [];
var poisonArr = [];
var magArr = [];




function setup() {
    frameRate(6);
    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
    background('#acacac');
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            } else if (matrix[y][x] == 2) {
                var greater = new GrassEater(x, y);
                grEaterArr.push(greater)
            } else if (matrix[y][x] == 3) {
                var hunter = new Hunter(x, y);
                huntArr.push(hunter);
            } else if (matrix[y][x] == 4) {
                var fire = new Fire(x, y);
                fireArr.push(fire);
            } else if (matrix[y][x] == 6) {
                var poison = new Poison(x, y);
                poisonArr.push(poison);
            } else if (matrix[y][x] == 7) {
                var mag = new Mag(x, y);
                magArr.push(mag);
            }

        }
    }
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("#f61");
            } else if (matrix[y][x] == 5) {
                fill("#111")
            } else if (matrix[y][x] == 6) {
                fill("#3caf");
            } else if (matrix[y][x] == 7) {
                fill("#41ef");
            }

            rect(x * side, y * side, side, side);


            fill("white");

        }

    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i2 in grEaterArr) {
        grEaterArr[i2].eat();
    }
    for (var i3 in huntArr) {
        huntArr[i3].eat()
    }
    for (var i4 in fireArr) {
        fireArr[i4].born();
    }
    for (var i5 in magArr) {
        magArr[i5].move();
    }
}