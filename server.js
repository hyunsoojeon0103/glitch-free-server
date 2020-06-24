var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("My socket server is running");

socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

//globalData = []
function newConnection(socket) {
    console.log('new connection ' + socket.id);
    /*socket.emit('gdata', globalData);
    socket.on('mouse', mouseData);
    function mouseData(data) {
        socket.broadcast.emit('mouse', data)
        globalData.push(data)
    }*/
}

