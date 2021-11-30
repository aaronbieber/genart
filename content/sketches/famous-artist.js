var rows = 6;
var cols = 6;
var margin = 10;

function setup() {
  var canvas = makeCanvas();
  background(0);
  noStroke();
  noFill();
}

function drawStar(x, y, radius) {
  beginShape();
  for (let p=0; p<=4; p++) {
    let x1 = radius * cos(TWO_PI * p/5 + PI/3.33) + x;
    let y1 = radius * sin(TWO_PI * p/5 + PI/3.33) + y;
    vertex(x1, y1);

    let x2 = (radius * 0.38) * cos(TWO_PI * p/5 + PI/2) + x;
    let y2 = (radius * 0.38) * sin(TWO_PI * p/5 + PI/2) + y;
    vertex(x2, y2);
  }
  endShape(CLOSE);
}

function drawNestedStars(fg, bg) {
  colorMode(HSB);

  let r = 290;
  let light = true;
  for (let i=0; i<10; i++) {
    fill(light ? fg : bg);
    drawStar(width/2, height/2, r);
    r -= 30;
    light = !light;
  }
}

function darken(c, pct) {
  colorMode(HSB);
  return color(
    hue(c),
    saturation(c),
    brightness(c) * pct);
}

function draw() {
  let boxw = (width - (margin * (cols + 1))) / cols;
  let boxh = (height - (margin * (rows + 1))) / rows;

  let stars = new Array(rows*cols); // PImage[rows*cols];

  // This was a previous iteration of color selection
  //
  // let lightColor = color(random(255), 128, 0.5);
  // let darkColor = color(
  //   hue(lightColor),
  //   saturation(lightColor),
  //   0.17);

  // "color sequence," get it?
  let cseq = ['#36eee0',
              '#f652a0',
              '#4c5270'];

  for (let i=0; i<rows*cols; i++) {
    let bg = darken(cseq[floor(i/cols) % cseq.length], 0.8);
    let fg = cseq[i % cseq.length];
    drawNestedStars(fg, bg);
    stars[i] = get(width/2-boxw/2, height/2-boxh/2, boxw, boxh);
  }

  background('#C4C1B9');

  for (let y=0; y<rows; y++) {
    for (let x=0; x<cols; x++) {
      image(
        stars[x + y * cols],
        margin * (x+1) + boxw * x,
        margin * (y+1) + boxh * y);
    }
  }

  noLoop();
}
