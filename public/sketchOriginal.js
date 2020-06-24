function setup() {
    createCanvas(600, 400);
    background(51);
    socket = io.connect('http://localhost:3000');
    socket.on('gdata', initData);
    socket.on('mouse', recvData);
}
function initData(gdata) {
    for (let point of gdata) {
        noStroke();
        fill(187, 78, 25);
        ellipse(point.x, point.y, 36, 36);
    }
}
function recvData(data) {
    noStroke();
    fill(100, 100, 100);
    ellipse(data.x, data.y, 36, 36);
}

function mouseDragged() {
    noStroke();
    fill(255);
    ellipse(mouseX, mouseY, 36, 36);
    data = {
        x: mouseX,
        y: mouseY
    }
    socket.emit('mouse', data)
}
function draw() {

}
