function setup() {
  var canvas = makeCanvas();

  stroke(255);
  noFill();
}

var angleInc = 0.5;
function draw() {
  background(0);

  let d = shortEdge() - 100;
  // circle(width/2, height/2, d, d);

  let offset = 0;
  let segments = 15
  for (let i=1; i<=segments; i++) {
    let l = [
      createVector(
        width/2 + d/2 * cos((PI/segments) * i),
        height/2 + d/2 * sin((PI/segments) * i)
      ),
      createVector(
        width/2 + d/2 * cos((PI/segments) * (i + segments)),
        height/2 + d/2 * sin((PI/segments) * (i + segments))
      ),
      createVector(
        width/2 + d/2 * cos(((PI/segments*2)+(angleInc/15)) * (i + segments)),
        height/2 + d/2 * sin(((PI/segments*2)+(angleInc/15)) * (i + segments))
      )
    ];

    // stroke(255, 255, 255, 128);
    // line(l[0].x, l[0].y,
    //      l[1].x, l[1].y);
    // stroke(255);

    let lerpVal = 0.5 * sin(angleInc + offset) + 0.5;
    strokeWeight(10);
    let ploc = p5.Vector.lerp(l[0], l[1], lerpVal);
    // point(ploc);
    strokeWeight(2);
    line(ploc.x, ploc.y, l[2].x, l[2].y);

    offset += PI / segments;
  }

  angleInc += 0.03;
}
