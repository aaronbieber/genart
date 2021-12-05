var center, point, prevPoint, palettes, palette;
var orbitAngleInc = 0;
var loopAngleInc = 0;
var noiseInc = 0;
var noiseScale;

function preload() {
  palettes = loadJSON(baseURL + '/1000.json');
}

function setup() {
  var canvas = makeCanvas();
  palette = randomElement(palettes);
  background(palette[0]);
  stroke(palette[4]);

  center = createVector(width/2, height/2);
  point = createVector(width/2, height/2);
  prevPoint = 0;
  noiseScale = shortEdge() / 3;
  frameRate(999);
}

function getColor(val) {
  let max = 50;
  let pos = val % max;
  if (pos < max/2) {
    // toward color 2
    return mapColor(palette[1], palette[3],
                    map(pos, 0, max/2, 0, 1));
  } else {
    // toward color 1
    return mapColor(palette[3], palette[1],
                    map(pos, max/2, max, 0, 1));
  }
}

function draw() {
  let loopAngle = loopAngleInc % TWO_PI;
  let orbitAngle = orbitAngleInc % TWO_PI;
  let noiseVal = noise(noiseInc) * noiseScale;

  strokeWeight(noiseVal/40);
  stroke(getColor(loopAngleInc));

  center.set(
    (sin(orbitAngle) * noiseVal) + (width/2),
    (cos(orbitAngle) * noiseVal) + (height/2));

  point.set(
    (cos(loopAngle) * noiseVal/1.5) + center.x,
    (sin(loopAngle) * noiseVal/1.5) + center.y
  );

  if (prevPoint !== 0) {
    line(prevPoint.x, prevPoint.y, point.x, point.y);
  } else {
    prevPoint = point.copy();
  }

  orbitAngleInc += 0.02;
  loopAngleInc += 0.2;
  noiseInc += 0.01;
  prevPoint.set(point);
}
