var colors = [
  '#A61B1E', // dark red
  '#019950', // green
  '#0171BB', // blue
  '#EF2427', // bright red
  '#5D3F97', // purple
  '#FFD502', // yellow
  '#F56813', // orange
  '#8C5279', // purple
];

let colorIndex = -1;

function setup() {
  var canvas = makeCanvas();
  background(0);
  stroke(255);
  noFill();

  squigglebox(
    createVector(20, 20),
    createVector(width/4, -20),
    (width-60)/2, (height-60)/2, HALF_PI);

  squigglebox(
    createVector(width/2+10, 20),
    createVector(width/2, width/4),
    (width-60)/2, (height-60)/2, 0);

  squigglebox(
    createVector(20, height/2+10),
    createVector(20, height/2+10),
    (width-60)/2, (height-60)/2, QUARTER_PI);

  squigglebox(
    createVector(width/2+10, height/2+10),
    createVector(width/4*3, height/2),
    (width-60)/2, (height-60)/2, HALF_PI);
}

var left, right;
function squigglebox(boxOrigin, squiggleOrigin, w, h, a) {
  let squig = makeSquiggle(squiggleOrigin.x, squiggleOrigin.y, w, h, a);

  let box = [
    createVector(boxOrigin.x, boxOrigin.y),
    createVector(boxOrigin.x + w, boxOrigin.y),
    createVector(boxOrigin.x + w, boxOrigin.y + h),
    createVector(boxOrigin.x, boxOrigin.y + h)];

  let inbox = function(p) {
    return (p.x >= boxOrigin.x &&
            p.x <= boxOrigin.x + w &&
            p.y >= boxOrigin.y &&
            p.y <= boxOrigin.y + h);
  }

  // isolate only valid points
  squig = squig.filter(p => inbox(p));

  // todo: adjust first and last points of squig to sit on the box line
  // by rounding up or down the axis closest to any box line

  left = box.filter(p => isLeft(first(squig), last(squig), p));
  right = box.filter(p => !isLeft(first(squig), last(squig), p));

  left.push(first(squig));
  left.push(last(squig));
  right.push(first(squig));
  right.push(last(squig));

  left = new Hull(left).getExtrema();
  right = new Hull(right).getExtrema();

  drawHalfBox(box, left, squig);
  drawHalfBox(box, right, squig);
}

function drawHalfBox(box, points, squig) {
  noStroke();
  fill(colors[++colorIndex % colors.length]);

  beginShape();
  // If there's a better way to do this I'd love to know it.
  let squigged = false;
  for (let i=0; i<points.length; i++) {
    let p = points[i];
    let nextP = points[(i+1) % points.length];
    let inBox = box.includes(p);

    vertex(p.x, p.y);
    console.log(vToString(p));

    if (!box.includes(p) && !box.includes(nextP) && !squigged) {
      // Which way must we squig?
      // Always squig from the end we're on to the end at the other end.
      if (p !== first(squig)) {
        squig = squig.reverse();
      }

      for (let s of squig) {
        vertex(s.x, s.y);
      }
      squigged = true;
    }
  }
  endShape(CLOSE);

}

function makeSquiggle(xOrigin, yOrigin, w, h, a) {
  let amp = ((w+h)/2) * 0.2;
  let points = [];
  let phase = random(w);
  let d = sqrt(pow(h, 2) + pow(w, 2));
  for (let x=0; x<d; x++) {
    let y = (noise(x * 0.002) * amp) * sin((x+phase)/60);
    let x1 = x * cos(a) - y * sin(a);
    let y1 = x * sin(a) + y * cos(a);
    points.push(createVector(x1+xOrigin, y1+yOrigin));
  }
  return points;
}

// https://stackoverflow.com/questions/1560492/how-to-tell-whether-a-point-is-to-the-right-or-left-side-of-a-line
function isLeft(linePoint1, linePoint2, p){
  // cross-product
  let cp = ((linePoint2.x - linePoint1.x) *
            (p.y - linePoint1.y) -
            (linePoint2.y - linePoint1.y) *
            (p.x - linePoint1.x));

  if (cp == 0) return undefined;
  return cp > 0;
}
