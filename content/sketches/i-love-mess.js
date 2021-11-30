var squiggles = new Array(10);
var img;
var doDraw = true;

function preload() {
  img = loadImage(baseURL + '/venus.png');
}

function setup() {
  var canvas = makeCanvas();
  background(255);
  stroke(0, 0, 0, 32);
  strokeWeight(4);
  colorMode(MULTIPLY);

  for (let i=0; i<squiggles.length; i++) {
    squiggles[i] = new Squiggle();
    //squiggles[i].warp(width/2, height/2);
  }

  frameRate(999);
}

class Squiggle {
  constructor() {
    this.pos = new p5.Vector(random(width), random(height));
    this.vel = new p5.Vector(0, 0); //PVector.random2D();
    this.acc = new p5.Vector(0, 0);
    this.prevDot = new p5.Vector();
    this.dot = new p5.Vector();
    this.noiseInc = random(50);
    this.maxSpeed = 1.5;
    this.angle = 0;
    this.angleInc = radians(30);
    this.radius = 25;
    this.setDot();
    this.prevDot.set(this.dot);

    // colorMode(HSB);
    // this.c = color(random(255), random(255), random(255));
  }

  update() {
    this.noiseInc += 0.01;
    this.angle += this.angleInc;

    let noiseVal = noise(this.noiseInc);
    this.acc.add(p5.Vector.fromAngle(noiseVal * TWO_PI));
    //this.radius = dist(this.pos.x, this.pos.y, width/2, height/2) / 5;
    this.radius = map(brightness(img.get(this.pos.x, this.pos.y)), 0, 255, 20, 2);

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.x < 0) this.warp(width, this.pos.y);
    if (this.pos.x > width) this.warp(0, this.pos.y);
    if (this.pos.y < 0) this.warp(this.pos.x, height);
    if (this.pos.y > height) this.warp(this.pos.x, 0);

    this.prevDot.set(this.dot);
    this.setDot();

    this.c = img.get(
      map(this.dot.x, 0, width, 0, img.width-1),
      map(this.dot.y, 0, height, 0, img.height-1));
    this.c = color(
      red(this.c),
      green(this.c),
      blue(this.c),
      128);
  }

  setDot() {
    this.dot.set(
      this.radius * cos(this.angle) + this.pos.x,
      this.radius * sin(this.angle) + this.pos.y);
  }

  warp(x, y) {
    this.pos.set(x, y);
    this.setDot();
    this.prevDot.set(this.dot);
  }

  paint() {
    stroke(this.c);
    line(this.prevDot.x, this.prevDot.y, this.dot.x, this.dot.y);
  }
}

function mousePressed() {
  doDraw = !doDraw;
}

function draw() {
  if (doDraw) {
    for (let s of squiggles) {
      s.update();
      s.paint();
    }
  }
}
