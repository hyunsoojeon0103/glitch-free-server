var song;
var fft;
var w;
var button;
function setup() {
  createCanvas(512, 512);
  angleMode(DEGREES);
  colorMode(HSB);
  soundFormats("mp3");
  fft = new p5.FFT(0.9, 64);
  song = loadSound("music.mp3", loaded);
  button = createButton("pause");
  button.mousePressed(toggle);
  w = width / 64;
  socket = io.connect('http://localhost:3000');
}
function toggle() {
  if (song.isPlaying()) {
    song.pause();
    button.html("play");
  } else {
    song.play();
    button.html("pause");
  }
}
function loaded() {
  song.play();
}

function draw() {
  background(0);
  var spectrum = fft.analyze();
  stroke(255);
  for (var i = 0; i < spectrum.length; i++) {
    var amp = spectrum[i];
    var y = map(amp, 0, 256, height, 0);
    line(i * w, height, i * w, y);
    fill(random(255), 255, 255);
    rect(i * w, y, w - 2, height - y);
  }
  console.log(song.currentTime());
}
