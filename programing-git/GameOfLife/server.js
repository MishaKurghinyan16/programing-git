var express = require("express")
var app = express()
var server = require("http").Server(app)

var io = require("socket.io")(server);

var fs = require("fs")


app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);

function gener(n, m) {
    var matrix = []
    for (var i = 0; i <= n; ++i) {
        matrix.push([]);
        for (var j = 0; j <= m; ++j) {
            matrix[i].push(Math.round(Math.random() * 3));
        }
    }
    return matrix;

}
 matrix = gener(10, 10);