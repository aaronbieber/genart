function setup() {
  var canvas = makeCanvas();

  background(0);
  stroke(255);
  noFill();

  var polys = [[createVector(100, 100),
                createVector(width-100, 100),
                createVector(width-100, height-100),
                createVector(100, height-100)]];

  let pt = createVector(
    random(width-200)+100,
    random(height-200)+100);

  // strokeWeight(10);
  // point(pt.x, pt.y);
  // strokeWeight(1);

  let a = random(TWO_PI);
  let a2 = (a + PI) % TWO_PI;

  let ln = new Line(
    createVector(cos(a) * (width * 2) + pt.x,
                 sin(a) * (height * 2) + pt.y),
    createVector(cos(a2) * (width * 2) + pt.x,
                 sin(a2) * (height * 2) + pt.y));
  // ln.paint();

  let perpendicularA = (a + HALF_PI) % TWO_PI;
  let pt2 = createVector(5 * cos(perpendicularA) + pt.x,
                         5 * sin(perpendicularA) + pt.y);
  let perpendicularA2 = (perpendicularA + PI) % TWO_PI;
  let pt3 = createVector(5 * cos(perpendicularA2) + pt.x,
                         5 * sin(perpendicularA2) + pt.y);

  let ln2 = new Line(
    createVector(cos(a) * (width * 2) + pt2.x,
                 sin(a) * (height * 2) + pt2.y),
    createVector(cos(a2) * (width * 2) + pt2.x,
                 sin(a2) * (height * 2) + pt2.y));
  ln2.paint();

  let ln3 = new Line(
    createVector(cos(a) * (width * 2) + pt3.x,
                 sin(a) * (height * 2) + pt3.y),
    createVector(cos(a2) * (width * 2) + pt3.x,
                 sin(a2) * (height * 2) + pt3.y));
  ln3.paint();

  for (let poly of polys) {
    strokeWeight(1);
    stroke('#0000ff');
    drawPoly(poly);

    // 1. find intersections between both margin lines
    //    and every poly line; add to poly points
    // 2. compute left/right for all poly points vs.
    //    the center intersection line
    // 3. if there are points in both left and right
    //    groups, create new poly objects for each
    //    and add them to polys

    let points = [...poly];

    for (let i=0; i<poly.length; i++) {
      let polyline = new Line(poly[i], poly[(i+1)%poly.length]);
      let isect1 = polyline.intersects(ln2.p1, ln2.p2);
      let isect2 = polyline.intersects(ln3.p1, ln3.p2);

      if (isect1 !== undefined) points.push(isect1);
      if (isect2 !== undefined) points.push(isect2);
    }

    let left = [];
    let right = [];

    strokeWeight(5);
    for (let p of points) {

      if (isLeft(ln.p1, ln.p2, p)) {
        left.push(p);
        stroke('#ff0000');
      } else {
        right.push(p);
        stroke('#00ff00');
      }

      point(p.x, p.y);
    }
    strokeWeight(1);
    stroke(255);
  }
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

function drawPoly(poly) {
  beginShape();
  for (let p of poly) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);
}


function sqr(x) { return x * x }
function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
function distToSegmentSquared(p, v, w) {
    const l2 = dist2(v, w);
    if (l2 == 0) return dist2(p, v);
        let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        return dist2(p, {
            x: v.x + t * (w.x - v.x),
            y: v.y + t * (w.y - v.y)
        });
}
function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }
