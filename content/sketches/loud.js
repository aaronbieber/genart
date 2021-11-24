loudColors = [
  '#FF1AF7',
  '#19F9FF',
  '#0EFF56',
  '#FFFA12',
  '#FF1000'
];

function getLoudColor() {
  var c = loudColors[floor(random(loudColors.length-1))];
  return color(red(c), green(c), blue(c), 120);
}

function getColorSeq(seq) {
  var c = loudColors[seq % loudColors.length];
  return color(red(c), green(c), blue(c), 200);

}

function setup() {
  var canvas = makeCanvas();
  background(255);
  strokeWeight(10);
}

var seq = 1;
var startSeq = 0;
function draw() {
  translate(width/2, height/2);
  startSeq = seq;
  for (var i = 0; i < 50; i++) {
    stroke(getColorSeq(seq));
    fill(getColorSeq(seq+1));
    var r = map(i, 0, 50, width*1.2, width/20);
    rotate(PI/8);
    star(0, 0, r, r*1.5, 18);
    seq++;
  }

  seq++;
  //saveFrame("frames/" + seq + ".png");
}

function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
