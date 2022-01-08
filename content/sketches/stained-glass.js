var palette, palettes;
var polys;
var bgColor, lineColor, shapeColor;

function preload() {
  palettes = loadJSON(baseURL + '/1000.json');
}

function setup() {
  var canvas = makeCanvas();
  var cutWidth = 8;
  palette = randomElement(palettes);

  bgColor = palette[4];
  lineColor = palette[0];
  shapeColor = palette[1];

  // Initial poly is the base square.
  polys = [[createVector(100, 100),
            createVector(width-100, 100),
            createVector(width-100, height-100),
            createVector(100, height-100)]];

  for (let cuts=0; cuts<10; cuts++) {
    // Choose a random point within a margin
    let pt = createVector(
      random(width-200)+100,
      random(height-200)+100);

    // Choose a random angle and its opposite
    let a = random(TWO_PI);
    let a2 = (a + PI) % TWO_PI;

    // Draw a line from the point to way off the canvas
    let ln = new Line(
      createVector(cos(a) * (width * 2) + pt.x,
                   sin(a) * (height * 2) + pt.y),
      createVector(cos(a2) * (width * 2) + pt.x,
                   sin(a2) * (height * 2) + pt.y));

    // Find a point `cutWidth' from the original line
    let perpendicularA = (a + HALF_PI) % TWO_PI;
    let pt2 = createVector(cutWidth * cos(perpendicularA) + pt.x,
                           cutWidth * sin(perpendicularA) + pt.y);

    // And another on the other side of it
    let perpendicularA2 = (perpendicularA + PI) % TWO_PI;
    let pt3 = createVector(cutWidth * cos(perpendicularA2) + pt.x,
                           cutWidth * sin(perpendicularA2) + pt.y);

    // Draw a line through the first point (parallel to the original line)
    let ln2 = new Line(
      createVector(cos(a) * (width * 2) + pt2.x,
                   sin(a) * (height * 2) + pt2.y),
      createVector(cos(a2) * (width * 2) + pt2.x,
                   sin(a2) * (height * 2) + pt2.y));

    // And a line through the other one
    let ln3 = new Line(
      createVector(cos(a) * (width * 2) + pt3.x,
                   sin(a) * (height * 2) + pt3.y),
      createVector(cos(a2) * (width * 2) + pt3.x,
                   sin(a2) * (height * 2) + pt3.y));

    // Bisect every polygon using the two outer lines as
    // the new polygon edges
    let newPolys = [];
    for (let poly of polys) {
      strokeWeight(1);
      stroke('#0000ff');
      drawPoly(poly);

      // 1. find intersections between both margin lines
      //    and every poly edge line; add to poly points
      // 2. compute left/right for all poly points vs.
      //    the center intersection line
      // 3. if there are points in both left and right
      //    groups, create new poly objects for each
      //    and add them to polys
      // 4. if points are all on one side or the other,
      //    no bisection was done, so add all of the points
      //    as a new poly (re-add the old poly to the new
      //    list)

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

      if (left.length && right.length) {
        // Create new polygons and add them. Convex hull will
        // sort the points clockwise so when we draw it later
        // it won't get twisted up.
        newPolys.push(new Hull(left).getExtrema());
        newPolys.push(new Hull(right).getExtrema());
      } else {
        // If the line didn't intersect this polygon at all,
        // all of the points will be on one side, so there's
        // nothing to do.
        newPolys.push(poly);
      }
    }

    // Get ready to do it again
    polys = newPolys;
  }

  background(0);
  for (let poly of polys) {
    // if (floor(random(2)) == 1) {
      noStroke();
    fill(randomElement(palette));
    // } else {
    //   noFill();
    //   stroke(randomElement(palette));
    // }
    drawPoly(poly);
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
