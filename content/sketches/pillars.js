var palettes, palette;

function preload() {
  palettes = loadJSON(baseURL + '/1000.json');
}

function setup() {
  var canvas = makeCanvas();
  palette = randomElement(palettes);

  strokeWeight(2);
  strokeCap(SQUARE);
  noStroke();
  background(palette[4]);

  // stroke(255);

  let x = width/2;
  let y = height/2;
  // let x = random(width);
  // let y = random(height);
  // stroke('#fa26a0');
  let scale = longEdge() / 20;
  grid(width/2, height/2, scale);
  // stroke('#2ff3e0');
  // star(x + random(10) + 10, y + random(10) + 10);
}

function pillar(x1, y1, x2, y2) {
  let s1 = 5;
  let r1 = s1/2;
  let s2 = 15;
  let r2 = s2/2;

  if (y1 > y2) {
    // bottom
    fill(palette[0]);
    beginShape();
    vertex(x2 - r2, y2 + r2);
    vertex(x2 + r2, y2 + r2);
    vertex(x1 + r1, y1 + r1);
    vertex(x1 - r1, y1 + r1);
    endShape();
  } else if (y1 < y2) {
    // top
    // fill('#2ff3e0');
    fill(palette[0]);
    beginShape();
    vertex(x2 - r2, y2 - r2);
    vertex(x2 + r2, y2 - r2);
    vertex(x1 + r1, y1 - r1);
    vertex(x1 - r1, y1 - r1);
    endShape();
  }

  if (x1 > x2) {
    // right side
    fill(palette[1]);
    beginShape();
    vertex(x2 + r2, y2 - r2);
    vertex(x2 + r2, y2 + r2);
    vertex(x1 + r1, y1 + r1);
    vertex(x1 + r1, y1 - r1);
    endShape();
  } else if (x1 < x2) {
    // left side
    // fill('#fa26a0');
    fill(palette[1]);
    beginShape();
    vertex(x2 - r2, y2 - r2);
    vertex(x2 - r2, y2 + r2);
    vertex(x1 - r1, y1 + r1);
    vertex(x1 - r1, y1 - r1);
    endShape();
  }

  fill(0);
  beginShape();
  vertex(x2 - r2, y2 - r2);
  vertex(x2 + r2, y2 - r2);
  vertex(x2 + r2, y2 + r2);
  vertex(x2 - r2, y2 + r2);
  endShape();
}

function grid(x, y, scale) {
  let o = new p5.Vector(x, y);
  // let o = new p5.Vector(mouseX, mouseY);

  let points = [];

  for (let y=0; y<=height; y+=(height)/scale) {
    for (let x=0; x<=width; x+=(width)/scale) {
      let a = new p5.Vector(x, y);
      points.push(a);
    }
  }

  // draw points from furthest to closest, so the shapes appear to overlap
  // correctly in perspective
  points.sort((a, b) => p5.Vector.dist(b, o) - p5.Vector.dist(a, o));

  for (let a of points) {
    let dir = p5.Vector.sub(a, o);
    let dist = p5.Vector.dist(o, a);
    let len = map(dist, 0, width/2, 50, 300);
    dir.normalize();

    let displacement = map(dist, 0, width/2, 100, 0);
    let b = p5.Vector.add(a, p5.Vector.mult(dir, displacement))
    let p = p5.Vector.add(b, p5.Vector.mult(dir, len));
    pillar(b.x, b.y, p.x, p.y);
  }
}
