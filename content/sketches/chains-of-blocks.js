var stackCount = 15;
var stackedCubes = 15;
var stackBaseY = new Array(stackCount);
var cubes = new Array(stackCount); //[stackedCubes];

function setup() {
  var canvas = makeCanvas();
  background(128);
  stroke(0);
  makeStacks();
}

class Cube {
  constructor(x, y, s, fill) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.fill = fill;
  }
}

function drawCube(x, y, cube) {
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

function makeStacks() {
  for (let i=0; i<stackBaseY.length; i++) {
    stackBaseY[i] = random(height-height/6, height);
  }
  stackBaseY = sort(stackBaseY);

  for (let stack=0; stack<stackCount; stack++) {
    // stack
    var colorCenter = random(0, 255);
    var cubeSizes = new Array(stackedCubes);
    for (let i=0; i<stackedCubes; i++) cubeSizes[i] = int(random(20, 100));
    cubeSizes = sort(cubeSizes);
    var x = random(width);
    var y = stackBaseY[stack];
    cubes[stack] = new Array(stackedCubes);
    for (let i=0; i<stackedCubes; i++) {
      if (i>0) {
        y -= random(
          cubeSizes[cubeSizes.length-i-1],
          cubeSizes[cubeSizes.length-i]
          );
        x += random(-cubeSizes[cubeSizes.length-i] / 3, cubeSizes[cubeSizes.length-i] / 3);
      }
      cubes[stack][i] = new Cube(
        x,
        y,
        cubeSizes[cubeSizes.length-i-1],
        color(random(colorCenter, (colorCenter + 20) % 255), random(180, 255), 200));
    }
  }
}

var frames = 48;
var percent;
var ns = 0.02;
var u;
var v;
var angle;
var inc = 0;
function draw() {
  colorMode(HSB);
  background(32);

  percent = (inc % frames) / frames;
  angle = map(percent, 0, 1, 0, TWO_PI);
  u = map(sin(angle), -1, 1, 0, 2);
  v = map(cos(angle), -1, 1, 0, 2);

  for (let stack=0; stack<cubes.length; stack++) {
    for (let cube=0; cube<cubes[stack].length; cube++) {
      var c = cubes[stack][cube];
      var xn = noise(c.x * ns, c.y * ns, u);
      var yn = noise(c.x * ns, c.y * ns, v + 10);
      drawCube(
        c.x + xn * 20,
        c.y + yn * 20,
        c);
    }
  }

  inc++;
}
