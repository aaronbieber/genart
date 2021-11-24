var res = 50;
var field = new Array();
var particles = new Array();

function setup() {
  var canvas = makeCanvas(); //createCanvas(windowWidth-100, windowHeight-100);
  background(0);
  stroke(255);

  var r, g, b;
  loadPixels();
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      g = floor(map(y, 0, height, 53, 140));
      set(x, y, color(33, g, 240));
    }
  }
  updatePixels();

  field = makeVectors(res);
  particles = makeParticles(300, color(240, 46, 22, 64));

  frameRate(9999);
}

var gen = 0;
var run = 1;
var r, g, b;
function draw() {
  // 240, 201, 66
  // 240, 85, 0

  if (run <= 7) {
    r = 240;
    g = floor(map(run, 1, 7, 46, 201));
    b = floor(map(run, 1, 7, 22, 66));

    for (var p of particles) {
      var realX = floor(p.pos.x / res);
      var realY = floor(p.pos.y / res);
      var index = realY * floor(width/res) + realX;
      var force = field[index];

      p.applyForce(force);
      p.update();
      p.show();
    }

    gen++;
    if (gen % 500 == 0) {
      noiseSeed(int(random(10)));
      field = makeVectors(res);
      particles = makeParticles(300, color(r, g, b, 64));

      run++;
    }
  } else {
    console.log("Done.");
    noLoop();

    noStroke();
    fill(color(240, 165, 101));
    beginShape();
    vertex(0, height);
    vertex(800, height);
    vertex(400, height/2);
    endShape();

    fill(color(183, 104, 35));
    beginShape();
    vertex(400, height/2);
    vertex(0, height);
    vertex(150, height);
    endShape();
  }
}

function makeVectors(res) {
  var points = (width/res) * (height/res);
  var field = new Array();

  var noiseScale = 0.1;
  var angle;
  var v = new Array();

  for (var x=0; x<=width/res; x++) {
    for (var y=0; y<=height/res; y++) {
      angle = noise(x * noiseScale, y * noiseScale) * TWO_PI;
      v = p5.Vector.fromAngle(angle);
      v.setMag(0.3);
      field.push(v);
    }
  }

  return field;
}

function makeParticles(num, c) {
  var particles = new Array();

  for (var i=0; i<num; i++) {
    particles.push(new Particle(c));
  }

  return particles;
}

class Particle {
  constructor(c) {
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = 5;
    this.c = c;
    this.pos = createVector(random(width), random(height));
    this.prevPos = this.pos;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.x < 0) this.warp(width, this.pos.y);
    if (this.pos.x > width) this.warp(0, this.pos.y);
    if (this.pos.y < 0) this.warp(this.pos.x, height);
    if (this.pos.y > height) this.warp(this.pos.x, 0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  warp(x, y) {
    this.pos.set(x, y);
    this.prevPos.set(x, y);
  }

  show() {
    strokeWeight(4);
    stroke(this.c);

    line(this.prevPos.x, this.prevPos.y, this.pos.x, this.pos.y);
    this.prevPos = this.pos.copy();
  }
}
