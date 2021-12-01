var randHue;
var c;

function setup() {
  var canvas = makeCanvas();
  c = width <= height ? width : height;
  randHue = random(255);
  colorMode(HSB);
  background(
    randHue,
    32,
    32);

  for (let i=0; i<10; i++) {
    let a1 = random(0, TWO_PI);
    let opp = (a1 + PI*0.8) % TWO_PI;
    let a2 = random(opp, opp+PI*0.2) % TWO_PI;
    let x1 = width * sin(a1) + width/2;
    let y1 = height * cos(a1) + height/2;
    let x2 = width * sin(a2) + width/2;
    let y2 = height * cos(a2) + height/2;

    let weight = random(c * 0.004, c * 0.15);
    if (weight > c * 0.1) {
      let shaded = false;
      let c = randColor();
      for (let w=weight; w>0; w-=weight/2.5) {
        stroke(shaded ? shade(c) : c);
        strokeWeight(w);
        line(x1, y1, x2, y2);
        shaded = !shaded;
      }
    } else {
      stroke(randColor());
      strokeWeight(weight);
      line(x1, y1, x2, y2);
    }
  }

  ring();
}

function randColor() {
  return color(
    random(255),
    64,
    90);
}

function shade(c) {
  colorMode(HSB);
  return color(
    hue(c),
    saturation(c),
    brightness(c) * 0.95,
    1);
}

function ring() {
  ellipseMode(CENTER);
  strokeWeight(2);
  stroke(
    (randHue + 128) % 255,
    150,
    32);
  for (let s=c; s<sqrt(pow(width, 2) + pow(height, 2)); s++) {
    noFill();
    circle(width/2, height/2, s);
  }
}
