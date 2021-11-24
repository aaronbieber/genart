var stoneWidth = 125;
var stoneHeight = 300;
var stoneMargin = 20;
var stonesTop, stonesLeft;

var stone;

function setup() {
  var canvas = makeCanvas();
  stroke(0);
  noFill();

  stone = color('#D9B691');
  stonesTop = (height - stoneHeight) / 2;
  stonesLeft = (width - (stoneWidth * 4) - (stoneMargin * 3)) / 2;

  console.log("top " + stonesTop + ", left " + stonesLeft);
}

function drawBackground() {
  noStroke();
  background('#D5D4D6');

  fill('#E4EAEC');
  beginShape();
  vertex(0, 0);
  vertex(width, 0);
  vertex(width, height-height/3);
  vertex(0, height/3);
  endShape(CLOSE);

  var c = color('#B2B1B3');
  c.setAlpha(64);
  fill(c);

  for (var s=100; s>=0; s-=25) {
    beginShape();
    vertex(stonesLeft, stonesTop+stoneHeight - 20);
    vertex(stonesLeft + (stoneWidth*4) + (stoneMargin*3) + 5, stonesTop+stoneHeight - 20);
    vertex(width+s, height);
    vertex(0-s, height);
    endShape(CLOSE);
  }
}

function rectWithShadow(x, y, w, h, a, b) {
  push();
  noStroke();
  translate(-3, -3);
  fill(b);
  rect(x, y, w+12, h+12);
  translate(3, 3);
  fill(a);
  rect(x, y, w, h);
  pop();
}

var h=0;
var stoneShadowSize = [ 125+10, 300+10 ];
var stoneSize = [ 125, 300 ];

function draw() {
  drawBackground();
  //fill(#D9B691); // stone
  //fill(#BD9F7E); // dark stone

  push();
  translate(stonesLeft, stonesTop);
  rectWithShadow(0, -20, 125, 300, '#D9B691', '#BD9F7E');
  translate(stoneWidth+stoneMargin, 0);
  rectWithShadow(0, -20, 125, 300, '#D9B691', '#BD9F7E');
  translate(stoneWidth+stoneMargin, 0);
  rectWithShadow(0, -20, 125, 300, '#D9B691', '#BD9F7E');
  translate(stoneWidth+stoneMargin, 0);
  rectWithShadow(0, -20, 125, 300, '#D9B691', '#BD9F7E');
  pop();

  for (let x=0; x<TWO_PI; x+=radians(1)) {
    push();
    var y = 0.5 * sin(x-h);

    translate(stonesLeft, stonesTop);
    translate(0, 160);

    for (let o=0; o<=100; o+=20) {
      stroke('#75634F');
      line(x*20, y*20+o, x*20, y*20+o+2);
      stroke('#967E65');
      line(x*20, y*20+o+2, x*20, y*20+o+5);
    }

    var y2 = 0.5 * sin(x+h);
    translate(stoneWidth+stoneMargin, -160);
    for (let o=0; o<=100; o+=20) {
      stroke('#75634F');
      line(x*20, y2*20+o, x*20, y2*20+o+2);
      stroke('#967E65');
      line(x*20, y2*20+o+2, x*20, y2*20+o+5);
    }

    var y3 = 0.3 * sin(x+h);
    translate(stoneWidth+stoneMargin, 0);
    translate(stoneWidth-11, 155);
    rotate(HALF_PI);
    for (let o=0; o<=100; o+=20) {
      stroke('#967E65');
      line(x*20, y3*20+o, x*20, y3*20+o+5);
      stroke('#75634F');
      line(x*20, y3*20+o+5, x*20, y3*20+o+3);
    }

    var y4 = 0.1 * sin(x+h);
    rotate(-HALF_PI);
    translate(-stoneWidth+12, -155);
    translate(stoneWidth+stoneMargin, 0);
    translate(0, 160);
    for (let o=0; o<=100; o+=20) {
      stroke('#75634F');
      line(x*20, y4*20+o, x*20, y4*20+o+2);
      stroke('#967E65');
      line(x*20, y4*20+o+2, x*20, y4*20+o+5);
    }

    pop();
  }

  h+=radians(3);
  // if (h < TWO_PI) {
  //   saveFrame("frames/elemental-###.png");
  // }
}
