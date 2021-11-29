var drops = new Array(15);

function setup() {
  var canvas = makeCanvas();
  background(0);
  noFill();
  colorMode(HSB);
  strokeWeight(3);

  for (let i=0; i<drops.length; i++) {
    drops[i] = new Drop();
  }
}

function draw() {
  for (let i=0; i<drops.length; i++) {
    drops[i].update();
  }

  for (let i=0; i<drops.length; i++) {
    if (!drops[i].done) drawCircle(i);
  }
}

function drawCircle(drop) {
  let x = drops[drop].loc.x;
  let y = drops[drop].loc.y;
  let r = drops[drop].size;
  let c = drops[drop].c;
  let inc = 0.01;

  for (let p=0; p<TWO_PI; p+=inc) {
    let cx1 = x + sin(p) * r;
    let cy1 = y + cos(p) * r;
    let cx2 = x + sin(p+inc) * r;
    let cy2 = y + cos(p+inc) * r;

    let draw = true;
    for (let i=0; i<drops.length; i++) {
      if (i == drop) continue; // don't compare to self
      if (dist(cx2, cy2, drops[i].loc.x, drops[i].loc.y) < drops[i].size) {
        draw = false;
      }
    }

    stroke(c);
    if (draw) line(cx1, cy1, cx2, cy2);
  }
}

class Drop {
  constructor() {
    this.size = 1;
    this.acc = 0.005;
    this.done = false;
    this.loc = new p5.Vector(random(width), random(height));
    this.maxSize = int(random(width/6, width/5));
    this.c = color(random(255), 200, 200, 0.125);
  }

  update() {
    let d = this.maxSize - this.size;
    this.size += d * this.acc;

    if (this.maxSize - this.size < 1) {
      this.done = true;
    }

    this.updateColor();
  }

  updateColor() {
    let b = brightness(this.c);

    this.c = color(
      hue(this.c),
      saturation(this.c),
      map(this.size, 0, this.maxSize, 115, 16));
  }

  paint() {
    ellipseMode(CENTER);
    strokeWeight(1);
    noFill();
    ellipse(this.loc.x, this.loc.y, this.size, this.size);
  }
}
