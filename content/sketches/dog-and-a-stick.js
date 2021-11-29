var lines = new Array(2);

function setup() {
  var canvas = makeCanvas();
  background(0);
  blendMode(SCREEN);

  for (let i=0; i<lines.length; i++) {
    lines[i] = new Line();
  }
}

function draw() {
  for (let l of lines) {
    l.update();
    l.paint();
  }
}

class Line {
  constructor() {
    colorMode(HSB);
    this.c = color(random(255), 255, 255, 0.20);
    this.p1 = new Point();
    this.p2 = new Point();
    this.p3 = new Point();
    this.p4 = new Point();
    this.p1.update();
    this.p2.update();
  }

  update() {
    this.p1.update();
    this.p2.update();
    this.p3.update();
    this.p4.update();
  }

  paint() {
    strokeWeight(1);
    stroke(this.c);
    line(this.p1.pos.x, this.p1.pos.y, this.p2.pos.x, this.p2.pos.y);
    line(this.p2.pos.x, this.p2.pos.y, this.p3.pos.x, this.p3.pos.y);
    line(this.p3.pos.x, this.p3.pos.y, this.p4.pos.x, this.p4.pos.y);
    line(this.p4.pos.x, this.p4.pos.y, this.p1.pos.x, this.p1.pos.y);
  }
}

class Point {
  constructor() {
    this.pos = new p5.Vector();
    this.vel = p5.Vector.random2D();
    this.acc = p5.Vector.random2D();
    this.maxSpeed = 3;
    this.pos.set(random(width), random(height));
    this.vel.set(random(this.maxSpeed), random(this.maxSpeed));
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
      this.vel.y *= random(2);
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
      this.vel.x *= random(2);
    }
  }

  paint() {
    strokeWeight(4);
    stroke(255);
    point(this.pos.x, this.pos.y);
  }
}
