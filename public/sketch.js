var beat;
var button;
var w = 200;
var h = 150;
var sounds = [];
var buttons = [];
class Button {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.colf = color(51, 153, 255);
    this.colb = color(0, 76, 153);
  }

  show() {
    fill(this.colb);
    noStroke();
    rect(this.x, this.y, w, h);
    fill(this.colf);
    rect(this.x, this.y, w - 8, h - 8);
  }

  mouseIn() {
    if ((this.x <= mouseX && mouseX <= this.x + w) && (this.y <= mouseY && mouseY <= this.y + h)) {
      this.colf = color(155, 171, 122);
      this.colb = color(220, 246, 165);
    }
  }
}

function setup() {
  createCanvas(1200, 600);
  for (var i = 0; i < 4; i++) {
    sounds[i] = [];
    for (var j = 0; j < 6; j++) {
      let ext = "";
      if (i * 6 + j == 14 || i * 6 + j == 15 || i * 6 + j == 22 || i * 6 + j == 23) {
        ext = ".wav";
      }
      else {
        ext = ".mp3";
      }
      let name = "s" + (i * 6 + j).toString() + ext;
      sounds[i][j] = loadSound(name);
    }
  }
  beat = loadSound("drum1.mp3");
  button = createButton("play");
  button.mousePressed(toggle);
  socket = io.connect('http://localhost:3000');
  socket.on('guitar', recvGuitar);
  socket.on('beat', recvBeat);
}
function recvGuitar(data) {
  console.log(data.r, data.c);
  sounds[data.r][data.c].play();
}
function recvBeat(data) {
  //console.log("RECVED BEAT", data)
  if (data.playing) {
    beat.play(data.t);
    button.html("pause");
  } else {
    beat.pause();
    button.html("play");
    beat.jump(data.t);

  }
}
function toggle() {
  if (beat.isPlaying()) {
    beat.pause();
    button.html("play");
    let data = {
      playing: false,
      t: beat.currentTime()
    };
    socket.emit('beat', data);
  } else {
    beat.play();
    button.html("pause");
    let data = {
      playing: true,
      t: beat.currentTime()
    };
    socket.emit('beat', data);
  }

}

function mouseClicked() {
  if (mouseX <= width && mouseY <= height) {
    let x = Math.floor(mouseX / w);
    let y = Math.floor(mouseY / h);
    let data = {
      r: y,
      c: x
    };
    socket.emit('guitar', data);
    sounds[y][x].play();
  }
}
function draw() {
  background(0);
  for (var i = 0; i < 4; i++) {
    buttons[i] = [];
    for (var j = 0; j < 6; j++) {
      buttons[i][j] = new Button(j * w, i * h);
      if (mouseIsPressed) {
        buttons[i][j].mouseIn();
      }
      buttons[i][j].show();
    }
  }

}