var drawing = true;

function setup() {
  var canvas = makeCanvas();
  noFill();

  colorMode(HSB);
  let hue = random(255);
  stroke(
    hue,
    200,
    200,
    0.09);
  background(
    (hue + 128) % 255,
    180,
    16);

  blendMode(SCREEN);
  frameRate(9999);
}

var angleInc = 0;
var noiseInc = 0;
function draw() {
  if (drawing) {
    let angle1 = angleInc % TWO_PI;
    let angle2 = TWO_PI - angle1;
    let mpl = noise(noiseInc) * 5;
    let p1x = width/2 * mpl * cos(angle1) + width*0.25;
    let p1y = width/2 * mpl * sin(angle1) + height/2;
    let p2x = width/2 * mpl * cos(angle2) + width*0.25;
    let p2y = width/2 * mpl * sin(angle2) + height/2;

    let p3x = width/2 * mpl * cos(angle2) + width/2;
    let p3y = width/2 * mpl * sin(angle2) + height/2;
    let p4x = width/2 * mpl * cos(angle1) + width*0.75;
    let p4y = width/2 * mpl * sin(angle1) + height/2;
    bezier(width*0.25, height/2, p1x, p1y, p2x, p2y, width*0.5, height/2);
    bezier(width*0.5, height/2, p3x, p3y, p4x, p4y, width*0.75, height/2);

    angleInc += 0.002;
    noiseInc += 0.003;

    if (angleInc >= TWO_PI) noLoop();
    if (angleInc > TWO_PI * 2) noLoop();
  }
}
