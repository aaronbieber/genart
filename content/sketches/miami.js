function setup() {
  var canvas = makeCanvas();
  paint();
}

function paint() {
  blendMode(BLEND);
  background(0);
  stroke(255);
  noFill();

  topGrad();

  fill('#26202B');
  rect(0, height/2, width, height/2);
  noFill();

  blendMode(SCREEN);
  randSquig();
  randSquig();
  randMarquee();
  randBar();
}

function setAlpha(c, alpha) {
  colorMode(HSB);
  let col = color(
    hue(c),
    saturation(c),
    brightness(c),
    alpha);
  return col;
}

function mapColor(from, to, pct) {
  colorMode(RGB);
  let c = color(
    map(pct, 0, 1, red(from), red(to)),
    map(pct, 0, 1, green(from), green(to)),
    map(pct, 0, 1, blue(from), blue(to)));
  return c;
}

function topGrad() {
  for(let i=0; i<height/2;i++) {
    stroke(mapColor('#263952', '#3E4B5C', map(i, 0, height/2, 0, 1)));
    line(0, i, width, i);
  }
}

function randSquig() {
  let w = random(100, 300);
  let h = random(height/2, height*0.9);
  let left = random(width/2, width-w);
  //rect(left, height-h, w, h);

  stroke(setAlpha(color('#FF66FA'), 0.125));
  for (let t=160; t>0.1; t-=t/3) {
    strokeWeight(t);

    if (t<4) stroke(setAlpha(color('#f5d1f5'), 0.5));

    bezier(left+w, height-h, left-w, height-h, left+w*2, height, left, height);
  }
}

function randMarquee() {
  let w = random(200, 300);
  let h = random(height/3, height/1.5);
  let left = random(width/3, width*0.66-w);
  let nw = w/4;

  stroke(setAlpha(color('#fc3f08'), 0.125));
  for (let t=160; t>0.1; t-=t/3) {
    strokeWeight(t);
    if (t<4) stroke(setAlpha(color('#fcfd27'), 0.5));

    beginShape();
    vertex(left, height);
    vertex(left, height-h+nw);
    vertex(left+nw, height-h+nw);
    vertex(left+nw, height-h);
    vertex(left+w-nw, height-h);
    vertex(left+w-nw, height-h+nw);
    vertex(left+w, height-h+nw);
    vertex(left+w, height);
    endShape(OPEN);
  }
}

function randBar() {
  let left = random(width/3-100, width/3);
  let y1 = random(width/3, width/2);
  let y2 = random(width/3, width/2);

  stroke(setAlpha(color('#0d95f7'), 0.125));
  for (let t=160; t>0.1; t-=t/3) {
    strokeWeight(t);
    if (t<4) stroke(setAlpha(color('#cffbf9'), 0.5));

    line(left, height/3, left, height);

    line(0, y1, left-50, y1);
    line(left+50, y1, left+100, y1);
    line(0, y2, left-50, y2);
    line(left+50, y2, left+100, y2);
  }
}
