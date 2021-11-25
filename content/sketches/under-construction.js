var david;
var scl = 10;
var sclTarget = 50;

function preload() {
  david = loadImage(baseURL + '/david.png');
}

function setup() {
  var canvas = makeCanvas();
  noStroke();
  background(255);
  ellipseMode(CENTER);

  paint();
}

function eqColor(a, b) {
  return red(a) == red(b) &&
    green(a) == green(b) &&
    blue(a) == blue(b);
}

function paint() {
  background(255);
  david.loadPixels();

  for (let y=0; y<height; y+=scl) {
    for (let x=0; x<width; x+=scl) {
      var c = david.get(x, y);

      if (!eqColor(c, color(255))) {
        drawCube(new Cube(x, y, scl/1.5, c));
      }

      if (y > height/2) {
        x += random(0, pow(scl, 0.5));
        y += random(-scl/6, scl/4);

        if (x > width-1) x = width-1;
        if (y > height-1) y = height-1;
      } else if (y > height/3) {
        var freq = map(y, height/3, height/2, 1, 10);
        if (random(freq, 10) > 8) {
          x += random(0, pow(scl, 0.5));
          y += random(-scl/6, scl/4);

          if (x > width-1) x = width-1;
          if (y > height-1) y = height-1;
        }
      }
    }

    if (y > height/2) {
      var sclDelta = sclTarget - scl;
      scl += sclDelta * 0.02;
      y += random(0, pow(sclDelta, 0.6));
    }
  }
}

class Cube {
  constructor(x, y, s, fill) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.fill = fill;
  }
}

function drawCube(cube) {
  var x = cube.x;
  var y = cube.y;
  var s = cube.s;
  var fillColor = cube.fill;

  colorMode(RGB);
  push();
  translate(x, y);
  fill(fillColor);
  noStroke();
  beginShape();
  vertex(-s, -s/2);
  vertex(0, -s);
  vertex(s, -s/2);
  vertex(s, s/2);
  vertex(0, s);
  vertex(-s, s/2);
  endShape(CLOSE);

  // left side
  fill(color(0, 0, 0, 128));
  beginShape();
  vertex(0, 0);
  vertex(0, s);
  vertex(-s, s/2);
  vertex(-s, -s/2);
  endShape(CLOSE);

  // right side
  fill(color(0, 0, 0, 64));
  beginShape();
  vertex(0, 0);
  vertex(s, -s/2);
  vertex(s, s/2);
  vertex(0, s);
  endShape(CLOSE);

  pop();
}
