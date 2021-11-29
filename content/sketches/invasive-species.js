var vines = new Array();
var initialVines = 2;

function setup() {
  var canvas = makeCanvas();
  background(0);
  stroke(255);
  strokeWeight(10);

  for (let i=0; i<initialVines; i++) {
    vines.push(new Vine());
  }

  for (let i=0; i<height; i++) {
    let s = '#3F7296';
    let e = '#5E3E14';
    colorMode(RGB);
    stroke(color(
      map(i, 0, height, red(s), red(e)),
      map(i, 0, height, green(s), green(e)),
      map(i, 0, height, blue(s), blue(e))));

    line(0, i, width, i);
  }
}

class Vine {
  constructor() {
    this.noiseval = random(200);
    this.noiseinc = 0.02;
    this.noisemult = 5;
    this.loc = new p5.Vector(random(width-200)+100, height + 10);
    this.prevLoc = new p5.Vector(this.loc.x, this.loc.y);

    colorMode(HSB);
    this.c = color(
      random(50, 80),
      180,
      random(50, 100),
      0.5);
  }

  update() {
    this.prevLoc.set(this.loc);
    this.noiseval += this.noiseinc;
    this.loc.set(
      this.loc.x += (noise(this.noiseval) * this.noisemult) - this.noisemult/2,
      this.loc.y -= random(2));

    if (int(random(150)) == 1) {
      let newVine = new Vine();
      newVine.prevLoc.set(this.loc.x, this.loc.y);
      newVine.loc.set(this.loc.x, this.loc.y);
      vines.push(newVine);
    }
  }

  paint() {
    stroke(this.c);
    line(
      this.prevLoc.x,
      this.prevLoc.y,
      this.loc.x,
      this.loc.y);
  }
}

function draw() {
  let allOut = true;
  for (let i=0; i<vines.length; i++) {
    let vine = vines[i];
    vine.update();
    vine.paint();
    if (vine.loc.y > 0) allOut = false;
  }

  if (allOut) {
    noLoop();
  }
}
