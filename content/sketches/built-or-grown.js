function preload() {
}

function setup() {
  var canvas = makeCanvas();
  background('#FAF5F0');
  fill('#FAF5F0');
  stroke(255);
  rectMode(CENTER);

  tree(width/2, height/2 - height/6, 250);
  noiseblob(width/2, height/2, 20);
}

function draw() {
}

function tree(x, y, r) {
  push();

  // Guidelines
  stroke('#E3DFDA'); // beige
  line(0, y-r, width, y-r);
  line(0, y+r, width, y+r);
  line(x-r, 0, x-r, height);
  line(x+r, 0, x+r, height);

  // Circle
  translate(x, y);
  stroke('#CF1A17'); // red
  strokeWeight(2);
  let dash = true;
  let inc = TWO_PI / (TWO_PI * r);
  for (let a=0; a<TWO_PI; a+=0.001) {

    let cx = r * cos(a);
    let cy = r * sin(a);

    if (dash) point(cx, cy);

    if (floor(a * 1000) % 70 == 0) {
      dash = !dash;
    }
  }
  pop();

  // Trunk
  let tw = random(40) + 40;
  stroke('#CF1A17'); // red lines
  strokeWeight(2);
  line(x, y, x, height); // y
  line(x, height, x-8, height-8); // y arrow
  line(x, height, x+8, height-8); // y arrow
  line(x+r, y, width, y); // x
  line(width, y, width-8, y-8); // x arrow
  line(width, y, width-8, y+8); // x arrow

  drawingContext.setLineDash([10, 10]);
  line(x-r, y, x-r, height-r);
  line(x-r, height-r, x-tw-4, height-r);
  drawingContext.setLineDash([]);

  stroke('#000000'); // black lines
  strokeWeight(1);
  line(x-tw-4, y, x-tw-4, height-r); // left little guy
  line(x-tw, y, x-tw, height-r/1.5); // left solid
  line(x+tw, y, x+tw, height-r); // right solid

  drawingContext.setLineDash([10, 5]);
  line(x-tw, height-r/1.5, x-tw, height); // left dashed
  line(x+tw, height-r, x+tw, height); // right dashed
  drawingContext.setLineDash([]);


  // Blobs
  for (let b=0; b<150; b++) {
    let bx = (randomGaussian() * r/2) + x;
    let by = (randomGaussian() * r/2) + y;
    let d = dist(x, y, bx, by);
    noiseblob(bx, by, map(d, 0, r*2, 30, 0));
  }

  let ra = random(TWO_PI);
  let rr = random(r/3) + r * 0.6;
  let rx = rr * cos(ra) + x;
  let ry = rr * sin(ra) + y;
  squarecloud(rx, ry, r);

  ra = (ra + PI) % TWO_PI;
  rr = random(r/3) + r * 0.6;
  rx = rr * cos(ra) + x;
  ry = rr * sin(ra) + y;
  squarecloud(rx, ry, r);

  // labels
  stroke('#CF1A17'); // red
  strokeWeight(2);
  circle(x-r+20, y-r+20, 30); // 1
  circle(x+tw+40, height-r, 30); // 2
  circle(x-r+30, height-r-30, 30); // 3
  fill('#CF1A17'); // red
  noStroke();
  textSize(15);
  textAlign(CENTER);
  text('1', x-r+20, y-r+25);
  text('2', x+tw+40, height-r+5);
  text('y', x+10, height-20);
  text('3', x-r+30, height-r-25);
  text('x', width-20, y-10);

  // big blocks
  block(x, y);
  block(x, y);
  block(x, y);
}

function block(x, y) {
  fill('#FAF5F0');
  strokeWeight(1);
  let blocksize = random(50) + 50;
  let xo = random(150) - 75;
  let yo = random(150) - 75;

  blendMode(MULTIPLY);
  stroke('#E3DFDA');
  line(100, y+yo-blocksize/2, width-100, y+yo-blocksize/2);
  line(100, y+yo+blocksize/2, width-100, y+yo+blocksize/2);
  line(x+xo-blocksize/2, 30, x+xo-blocksize/2, height-100);
  line(x+xo+blocksize/2, 30, x+xo+blocksize/2, height-100);
  blendMode(BLEND);

  stroke('#000000');
  rect(x+xo, y+yo, blocksize, blocksize);
}

function squarecloud(x, y, r) {
  push();
  stroke('#000000');
  strokeWeight(1);
  translate(x, y);
  for (let b=0; b<300; b++) {
    let bx = (randomGaussian() * r/3);
    let by = (randomGaussian() * r/3);
    let d = dist(bx, by, 0, 0);
    let s = map(d, 0, r, 20, 0);
    rotate(random(TWO_PI));
    rect(bx, by, s, s);
  }
  pop();
}

function noiseblob(x, y, r) {
  push();
  translate(x, y);
  stroke('#000000');
  strokeWeight(1);
  fill('#FAF5F0');
  beginShape();

  let noisebase = random(100);

  for (let a=0; a<TWO_PI; a+=0.003) {
    let nx = r * cos(a / 10);
    let ny = r * sin(a / 10);
    let noiseval = noise(nx, ny) * 10;
    let cx = (noiseval + r) * cos(a);
    let cy = (noiseval + r) * sin(a);

    vertex(cx, cy);
  }

  endShape();
  pop();
}
