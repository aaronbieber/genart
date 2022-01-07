var points = [];
var hulls = [];

function setup() {
  var canvas = makeCanvas();
  background('#FAF5F0');
  stroke(0);

  let margin;
  for (let i=0; i<30000; i++) {
    margin = shortEdge() / 8;
    let x = random(width-margin*2) + margin;
    let y = random(height-margin*2) + margin;
    points.push(new p5.Vector(x, y));
  }

  strokeWeight(1);
  stroke(0);
  rectMode(CORNERS);
  fill(0);
  rect(margin+10, margin+10, width-margin-10, height-margin-10);

  noFill();
  stroke('#C2BEBA');
  rect(margin-20, margin-20, width-margin+20, height-margin+20);

  fill('#FAF5F0');

  while (points.length > 0) {
    let o = randomElement(points);
    let clusterIndexes = [];
    let cluster = [];
    for (let i=0; i<points.length; i++) {
      if (p5.Vector.dist(o, points[i]) < 50) {
        clusterIndexes.push(i);
        cluster.push(points[i]);
      }
    }

    if (cluster.length > 3) {
      let h = new Hull(cluster);
      let extrema = h.getExtrema();
      hulls.push(extrema);
    }

    points = cullIndexes(points, clusterIndexes);

  }

  var oil = [];
  for (let i=0; i<3; i++) {
    oil.push({
      r: random(75) + 50,
      o: new p5.Vector(random(width-margin*2) + margin, random(height-margin*2) + margin)
    });
  }

  for (let h of hulls) {
    let exclude = false;
    for (let p of h) {
      for (let o of oil) {
        if (p5.Vector.dist(p, o.o) < o.r) {
          exclude = true;
          break;
        }
      }
      if (exclude) break;
    }
    if (exclude) continue;

    beginShape();
    for (let p of h) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
  }
}

function cullIndexes(a, indexes) {
  let ret = [];
  for (let i=0; i<a.length; i++) {
    if (!indexes.includes(i)) {
      ret.push(a[i]);
    }
  }
  return ret;
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
