function setup() {
  var canvas = makeCanvas();
  background(255);
  strokeWeight(2);
  strokeCap(SQUARE);
  blendMode(MULTIPLY);
  noFill();

  translate(width/2, height/2);

  let points = [];
  for (let i=0; i<1200; i++) {
    points.push(randomGaussian(0, 150));
  }

  stroke('#F5F518');
  strokeWeight(4);
  beginShape();
  vertex(points[0].x, points[0].y);
  for (let i=2; i<points.length/6; i+=6) {
    bezierVertex(
      points[(i)%points.length],
      points[(i+1)%points.length],
      points[(i+2)%points.length],
      points[(i+3)%points.length],
      points[(i+4)%points.length],
      points[(i+5)%points.length]
    );
  }
  endShape();

  stroke('#23EDF5');
  strokeWeight(4);
  beginShape();
  vertex(points[0].x, points[0].y);
  for (let i=2; i<points.length/6; i+=6) {
    bezierVertex(
      points[(i)%points.length]+10,
      points[(i+1)%points.length]+10,
      points[(i+2)%points.length]+10,
      points[(i+3)%points.length]+10,
      points[(i+4)%points.length]+10,
      points[(i+5)%points.length]+10
    );
  }
  endShape();

  stroke('#F519D7');
  strokeWeight(4);
  beginShape();
  vertex(points[0].x, points[0].y);
  for (let i=2; i<points.length/6; i+=6) {
    bezierVertex(
      points[(i)%points.length]+20,
      points[(i+1)%points.length]+20,
      points[(i+2)%points.length]+20,
      points[(i+3)%points.length]+20,
      points[(i+4)%points.length]+20,
      points[(i+5)%points.length]+20
    );
  }
  endShape();

  // stroke('#23EDF5');
  // strokeWeight(2);
  // beginShape();
  // vertex(points[0].x, points[0].y);
  // for (let i=0; i<points.length/6; i+=6) {
  //   bezierVertex(
  //     points[(i)%points.length],
  //     points[(i+1)%points.length],
  //     points[(i+2)%points.length],
  //     points[(i+3)%points.length],
  //     points[(i+4)%points.length],
  //     points[(i+5)%points.length]
  //   );
  // }
  // endShape();

  // stroke('#F519D7');
  // strokeWeight(2);
  // beginShape();
  // vertex(points[0].x, points[0].y);
  // for (let i=1; i<points.length/6; i+=6) {
  //   bezierVertex(
  //     points[(i)%points.length],
  //     points[(i+1)%points.length],
  //     points[(i+2)%points.length],
  //     points[(i+3)%points.length],
  //     points[(i+4)%points.length],
  //     points[(i+5)%points.length]
  //   );
  // }
  // endShape();

}
