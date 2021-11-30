var suns = new Array(2);

function setup() {
  var canvas = makeCanvas();
  background(0);
  colorMode(HSB);
  blendMode(SCREEN);
  frameRate(9999);

  for (let i=0; i<suns.length; i++) {
    suns[i] = new Sun();
  }
}

class Sun {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.r = random(width*0.5);

    let fgHue = random(255);
    this.fg = color(fgHue, 175, 128, 0.5);
    this.bg = color(fgHue + 128 % 255, 175, 128, 0.5);
  }

  draw() {
    let a1 = random(1) * TWO_PI;
    let x1 = this.r * cos(a1) + this.x;
    let y1 = this.r * sin(a1) + this.y;

    let a2 = random(1) * TWO_PI;
    let x2 = this.r * cos(a2) + this.x;
    let y2 = this.r * sin(a2) + this.y;

    stroke(this.fg);
    strokeWeight(random(15));
    if (int(random(10)) == 1) {
      point(x1, y1);
      point(x2, y2);
    }

    strokeWeight(1);
    if (int(random(50)) == 5) strokeWeight(3);
    if (int(random(100)) == 5) strokeWeight(5);
    line (x1, y1, x2, y2);
    strokeWeight(1);

    stroke(this.bg);
    let a3 = random(a2-QUARTER_PI/2, a2+QUARTER_PI/2);
    let x3 = (width * 2) * cos(a3) + this.x;
    let y3 = (height * 2) * sin(a3) + this.y;
    line (x2, y2, x3, y3);
  }
}

function draw() {
  for (let s of suns) {
    s.draw();
  }

  if (frameCount % 100 == 0) {
    console.log("Frame " + frameCount);
  }

  if (frameCount == 2300) noLoop();
}
