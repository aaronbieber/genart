function setup() {
  var canvas = makeCanvas();
  background(0);
  stroke(255, 255, 255, 128);
  strokeWeight(width/80);
  strokeCap(SQUARE);
  noFill();
}

var noiseOffset = 0;
function draw() {
  background(0);

  let noiseInt = 0;
  for (let d=50; d<width; d+=width/20) {
    let n = noise(noiseOffset + noiseInt);
    let angle = radians(n * 40 - 20);
    paintRing(d, angle);

    noiseInt += 0.5;
  }

  noiseOffset -= 0.01;
}

function paintRing(diameter, angle) {
  ellipseMode(CENTER);
  push();
  translate(width/2, height/2);
  rotate(angle);
  arc(0, 0, diameter, diameter, radians(diameter*0.05), PI-radians(diameter*0.05));
  arc(0, 0, diameter, diameter, PI+radians(diameter*0.05), TWO_PI-radians(diameter*0.05));
  pop();
}
