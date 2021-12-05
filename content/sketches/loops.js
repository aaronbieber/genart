var center, loop, prevLoop, palettes, palette;
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
  loop = createVector(width/2, height/2);
  prevLoop = 0;
  noiseScale = shortEdge() / 3;
  frameRate(999);
}

function getColor(val, c1, c2) {
  let max = 50;
  let pos = val % max;
  if (pos < max/2) {
    // toward color 2
    return mapColor(c1, c2,
                    map(pos, 0, max/2, 0, 1));
  } else {
    // toward color 1
    return mapColor(c2, c1,
                    map(pos, max/2, max, 0, 1));
  }
}

function draw() {
  let loopAngle = loopAngleInc % TWO_PI;
  let orbitAngle = orbitAngleInc % TWO_PI;
  let noiseVal = noise(noiseInc) * noiseScale;

  strokeWeight(map(sin(noiseInc % TWO_PI), 1, 0, 1, 50, true));

  center.set(
    (sin(orbitAngle) * noiseVal) + (width/2),
    (cos(orbitAngle) * noiseVal) + (height/2));

  loop.set(
    (cos(loopAngle) * noiseVal/1.5) + center.x,
    (sin(loopAngle) * noiseVal/1.5) + center.y
  );

  if (prevLoop !== 0) {
    stroke(getColor(loopAngleInc, palette[1], palette[3]));
    line(prevLoop.x, prevLoop.y, loop.x, loop.y);
  } else {
    prevLoop = loop.copy();
  }

  orbitAngleInc += 0.02;
  loopAngleInc += 0.2;
  noiseInc += 0.01;
  prevLoop.set(loop);
}
