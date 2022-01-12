function setup() {
  var canvas = makeCanvas();
  paint();
}

function paint() {
  blendMode(BLEND);
  background(255);
  strokeWeight(2);
  strokeCap(SQUARE);
  blendMode(MULTIPLY);
  noStroke();
  fill(0);

  // rect(50, 50, 130, 90);
  rect(...xyJiggle(50, 50), 130, 90);

  fill('#F5F518');
  circle(...xyJiggle(115, 250), 130);
  fill('#23EDF5');
  circle(...xyJiggle(115, 400), 130);
  fill('#F519D7');
  circle(...xyJiggle(115, 550), 130);

  drawRegs(width-50, 50);
  drawRegs(50, height-50);
  drawRegs(width-50, height-50);

  push();
  translate(width/2, height/2);

  let points = [];
  for (let i=0; i<1200; i++) {
    points.push(randomGaussian(0, 200));
  }

  noFill();
  stroke('#F5F518');
  strokeWeight(4);
  beginShape();
  vertex(points[0].x, points[0].y);
  for (let i=2; i<points.length/6; i+=6) {
    bezierVertex(
      points[(i)%points.length],
      points[(i+1)%points.length],
      points[(i+2)%points.length],
      points[(i+3)%points.length],
      points[(i+4)%points.length],
      points[(i+5)%points.length]
    );
  }
  endShape();

  stroke('#23EDF5');
  strokeWeight(4);
  beginShape();
  vertex(points[0].x, points[0].y);
  for (let i=2; i<points.length/6; i+=6) {
    bezierVertex(
      points[(i)%points.length]+10,
      points[(i+1)%points.length]+10,
      points[(i+2)%points.length]+10,
      points[(i+3)%points.length]+10,
      points[(i+4)%points.length]+10,
      points[(i+5)%points.length]+10
    );
  }
  endShape();

  stroke('#F519D7');
  strokeWeight(4);
  beginShape();
  vertex(points[0].x, points[0].y);
  for (let i=2; i<points.length/6; i+=6) {
    bezierVertex(
      points[(i)%points.length]+20,
      points[(i+1)%points.length]+20,
      points[(i+2)%points.length]+20,
      points[(i+3)%points.length]+20,
      points[(i+4)%points.length]+20,
      points[(i+5)%points.length]+20
    );
  }
  endShape();
  pop();
}

function mousePressed() {
  paint();
}

function drawRegs(x, y) {
  strokeWeight(2);
  noFill();
  stroke(0);
  drawReg(...xyJiggle(x, y));
  stroke('#F5F518');
  drawReg(...xyJiggle(x, y));
  stroke('#23EDF5');
  drawReg(...xyJiggle(x, y));
  stroke('#F519D7');
  drawReg(...xyJiggle(x, y));
}

function drawReg(x, y) {
  push();
  translate(x, y);
  line(-30, 0, -10, 0);
  line(10, 0, 30, 0);
  line(0, -30, 0, -10);
  line(0, 30, 0, 10);
  pop();
}

function xyJiggle(x, y) {
  return [
    x + (random(20)-10),
    y + (random(20)-10)
  ]
}
