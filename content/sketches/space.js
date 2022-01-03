var colors = [
  '#070C21', // bg
  '#FFEEC4', // yellow/white
  '#28c5f7', // lt. blue
  '#206FC9', // dk. blue
  '#a571c4', // lavender
];

function setup() {
  var canvas = makeCanvas();
  background(colors[0]);

  stroke(colors[3]);
  for (let i=0; i<300; i++) {
    strokeWeight(random(3));
    point(random(width), random(height));
  }

  stroke('#9753F5');
  for (let i=0; i<100; i++) {
    strokeWeight(random(4));
    point(random(width), random(height));
  }

  stroke(colors[3]);
  noFill();
  for (let i=0; i<5; i++) {
    strokeWeight(random(3));
    streak();
  }

  for (let i=0; i<60; i++) {
    galaxy(random(width), random(height), random(15)+1, colors[2]);
  }

  for (let i=0; i<10; i++) {
    galaxy(random(width), random(height), random(20)+20, colors[1]);
  }

  for (let i=0; i<4; i++) {
    glowball(random(width), random(height), random(10)+4, ['#f9f523', '#b50e08']);
  }


  for (let i=0; i<4; i++) {
    star(random(width), random(height), random(20)+10, ['#f9f523', '#b50e08']);
  }
}

function streak() {
  let x = width/2, y = height/2;
  while(x > 0 && x < width) x = random(width*3)-width;
  while(y > 0 && y < height) y = random(height*3)-height;

  let o = new p5.Vector(x, y);
  let corners = [new p5.Vector(0, 0),
                 new p5.Vector(width, 0),
                 new p5.Vector(0, height),
                 new p5.Vector(width, height)];

  corners.sort((a, b) => p5.Vector.dist(o, a) - p5.Vector.dist(o, b));
  console.log(corners);

  let minR = p5.Vector.dist(o, corners[0]);
  let maxR = p5.Vector.dist(o, corners[3]);
  let r = random(maxR - minR) + minR;
  let c = TWO_PI * r;
  let points = c/5;
  let aInc = TWO_PI / points;
  let dashRadians = 40 / r;
  let spaceRadians = 160 / r;
  let dashOffset = 0;
  let dash = false;

  for (let a=0; a<TWO_PI; a+=aInc) {
    if (a >= dashOffset) {
      dashOffset += dash ? spaceRadians : dashRadians;
      dash = !dash;
    }

    if (dash) {
      let cx = r * cos(a) + x;
      let cy = r * sin(a) + y;
      point(cx, cy);
    }
  }
}

function star(x, y, r, colors) {
  push();
  translate(x, y);
  rotate(QUARTER_PI);

  let arms = 4;
  for (let a=0; a<floor(arms/2); a++) {
    for (let i=floor(r)*2; i>0; i--) {
      let cstep = floor(r*2 / colors.length);
      let cindex = floor((i-0.5)/cstep);
      fill(withAlpha(colors[cindex], 32));
      ellipse(0, 0, i, r/6);
    }
    rotate(TWO_PI/arms);
  }

  pop();
}

function glowball(x, y, r, colors) {
  for (let i=floor(r)*2; i>0; i--) {
    let cstep = floor(r*2 / colors.length);
    let cindex = floor((i-0.5)/cstep);
    fill(withAlpha(colors[cindex], 32));
    circle(x, y, i);
  }
}

function galaxy(x, y, r, c) {
  // glow
  noStroke();
  fill(withAlpha(c, 20));

  push();
  translate(x, y);
  rotate(random(PI));
  ellipse(0, 0, r*2, r*4);
  rotate(random(1));
  ellipse(0, 0, r*1.8, r*4.3);
  for (let i=0; i<10; i++) {
    let xj = random(10) - 5;
    let yj = random(10) - 5;
    circle(xj, yj, map(i, 0, 8, r * 2, r / 4));
  }

  // arms
  stroke(c);
  for (let a=0; a<TWO_PI; a+=0.1) {
    strokeWeight(map(a, 0, TWO_PI, 5, 0));
    let d = map(a, 0, TWO_PI, 2, r);
    let x1 = d * cos(a);
    let y1 = d * sin(a);
    point(x1, y1);

    let a2 = (a + PI) % TWO_PI;
    let x2 = d * cos(a2);
    let y2 = d * sin(a2);
    point(x2, y2);
  }

  pop();
}
