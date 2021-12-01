var font;
var inc;

function preload() {
  font = loadFont(baseURL + '/arial-black.ttf');
}

function setup() {
  var canvas = makeCanvas();
  background(255);
  noStroke();
  textFont(font);
  textSize(100);
  inc = HALF_PI;
}

function letterFlower(offset, angleOffset) {
  textSize(map(offset, 0, 300, 50, 500));
  fill(255);

  push();
  translate(width/2, height/2);
  rotate(angleOffset);
  text("A", offset, offset);
  pop();

  push();
  translate(width/2, height/2);
  rotate(radians(90)+angleOffset);
  text("A", offset, offset);
  pop();

  push();
  translate(width/2, height/2);
  rotate(radians(180)+angleOffset);
  text("A", offset, offset);
  pop();

  push();
  translate(width/2, height/2);
  rotate(radians(270)+angleOffset);
  text("A", offset, offset);
  pop();
}

function doBackground() {
  background(255);
  fill(0);
  rect(100, 100, width-200, height-200);
}

function draw() {
  doBackground();

  let angle = inc % TWO_PI;

  letterFlower(150 * sin(angle - HALF_PI) + 150, angle);
  letterFlower(150 * sin(angle + HALF_PI) + 150, angle);

  inc += radians(1);
}
