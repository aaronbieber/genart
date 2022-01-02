var points;
var hull;

function setup() {
  var canvas = makeCanvas();
  background(0);
  stroke(255);
  noFill();

  points = [];
  for (let p=0; p<50; p++) {
    points.push(new p5.Vector(
      random(width-200) + 100,
      random(height-200) + 100
    ));
  }
}

function draw() {
  background(0);

  let lpoints = concat(points, new p5.Vector(mouseX, mouseY));

  strokeWeight(10);
  for (let p of lpoints) {
    point(p.x, p.y);
  }

  hull = new Hull(lpoints);
  let extrema = hull.getExtrema();

  beginShape();
  for (let i=0; i<extrema.length; i++) {
    strokeWeight(1);
    vertex(extrema[i].x, extrema[i].y);
  }
  endShape(CLOSE);
}

class Hull {
  constructor(points) {
    this.points = points;
  }

  getExtrema() {
    let result = [];
    // Leftmost point is automatically a member.
    this.points.sort((a, b) => a.x - b.x);
    result.push(this.points[0]);

    let l = 0;
    let limit = 0;
    while (true) {
      let q = (l + 1) % this.points.length;

      for (let i=0; i<this.points.length; i++) {
        if (i == l) continue;

        let d = this.direction(this.points[l], this.points[i], this.points[q]);
        if (d < 0 || (d == 0 && p5.Vector.dist(this.points[l], this.points[i]) > p5.Vector.dist(this.points[l], this.points[q]))) {
          q = i;
        }
      }

      l = q;
      if (l == 0) break;
      result.push(this.points[q]);
    }

    return result;
  }

  direction(p1, p2, p3) {
    return p5.Vector.cross(
      p5.Vector.sub(p3, p1),
      p5.Vector.sub(p2, p1)
    ).z;
  }
}
