var lines = [];
var palettes, palette;

function preload() {
  palettes = loadJSON(baseURL + '/1000.json');
}

function setup() {
  var canvas = makeCanvas();
  palette = randomElement(palettes);
  background('#3d3b3c');
  stroke(255);

  for (let i=0; i<10000; i++) {
    let attempts = 0
    while (attempts < 1000) {
      let vh = floor(random(2)) == 1;
      let p1 = new p5.Vector(random(width), random(height));
      let p2 = vh ? new p5.Vector(random(width), p1.y) : new p5.Vector(p1.x, random(height));
      let newLine = new Line(p1, p2);

      if (!interferes(newLine)) {
        lines.push(newLine);
        break;
      } else {
        attempts++;
      }
    }
    if (attempts == 1000) {
      break;
    }
  }

  for (let l of lines) {
    stroke(selectColor());
    l.paint();
  }
}

function selectColor() {
  return weightedRandom(palette, [0, 0.5, 0.5, 0, 0]).item;
}

function interferes(line1) {
  for (let other of lines) {
    let isect = intersection(line1.p1, line1.p2, other.p1, other.p2);
    if (isect !== undefined) {
      // lines intersect; definitely interfering
      return true;
    }
  }

  return false;
}

function intersection(from1, to1, from2, to2) {
  const dX = to1.x - from1.x;
  const dY = to1.y - from1.y;

  const determinant = dX * (to2.y - from2.y) - (to2.x - from2.x) * dY;
  if (determinant === 0) return undefined; // parallel lines

  const lambda = ((to2.y - from2.y) * (to2.x - from1.x) + (from2.x - to2.x) * (to2.y - from1.y)) / determinant;
  const gamma = ((from1.y - to1.y) * (to2.x - from1.x) + dX * (to2.y - from1.y)) / determinant;

  // check if there is an intersection
  if (!(0 <= lambda && lambda <= 1) || !(0 <= gamma && gamma <= 1)) return undefined;

  return createVector(
    from1.x + lambda * dX,
    from1.y + lambda * dY
  );
}

class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  paint() {
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
  }
}
