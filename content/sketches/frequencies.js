var circles = new Array(3);
var fgHue;
var bgHue;

function setup() {
  var canvas = makeCanvas();
  colorMode(HSB);
  background(0);
  stroke(
    fgHue,
    200,
    200,
    0.15);
  fgHue = random(255);
  bgHue = fgHue + 128 % 256;
  //blendMode(SCREEN);

  for (let i=0; i<circles.length; i++) {
    circles[i] = new Circle();
  }
}

class Circle {
  constructor() {
    this.x = random(100, width-200);
    this.y = random(100, height-200);
    this.s = random(100, 500);
    this.t = random(10, 50);
  }

  paint() {
    strokeWeight(this.t);
    ellipseMode(CENTER);
    noFill();

    stroke(0);
    blendMode(BLEND);
    circle(this.x+5, this.y+5, this.s);

    blendMode(SCREEN);
    stroke(bgHue, 200, 200, 0.6);
    circle(this.x, this.y, this.s);
  }
}


var multiplier = 1;
var doThick = false;
function draw() {
  let noiseY = 0;
  for (let y=0; y<height; y+=10) {
    let noiseX = 0;
    for (let x=0; x<width; x++) {
      let noiseVal = noise(noiseX, noiseY);
      let noiseOffset = noiseVal * multiplier - multiplier/2;

      stroke(fgHue, 200, 200, 0.15);
      point(x, y + noiseOffset);

      noiseX += 0.01;
    }
    noiseY += 0.02;
  }

  multiplier += 10;
  if (multiplier > 200) {
    stroke(fgHue, 200, 200, 0.08);
    strokeWeight(25);
    noFill();
    noiseY = 0;
    for (let y=0; y<height; y+=10) {
      let noiseX = 0;
      if (y % 100 == 0) beginShape();
      for (let x=0; x<width; x++) {
        let noiseVal = noise(noiseX, noiseY);
        let noiseOffset = noiseVal * multiplier - multiplier/2;
        if (y % 100 == 0) {
          vertex(x, y + noiseOffset);
        }
        noiseX += 0.01;
      }
      if (y % 100 == 0) endShape();
      noiseY += 0.01;
    }

    for (let i=0; i<circles.length; i++) {
      circles[i].paint();
    }

    noLoop();
  }
}
