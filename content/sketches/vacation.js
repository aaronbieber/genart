var palettes, palette;

function preload() {
  palettes = loadJSON(baseURL + '/1000.json');
}

function setup() {
  colorMode(HSB);
  noStroke();
  var canvas = makeCanvas();
  palette = randomElement(palettes);

  background(color(
    hue(palette[1]),
    16,
    8
  ));

  // Stars
  stroke(withBrightness(palette[0], 200));
  for (let i=0; i<500; i++) {
    strokeWeight(random(3));
    point(random(width), random(height));
  }
  noStroke();

  let lat = height/12;

  // Moon
  let moonX = 100 + random(width-200);
  let moonY = lat * 4;
  fill(withBrightness(palette[0], 200));
  circle(moonX, moonY, 100+random(90));

  // Mountains
  fill(withBrightness(palette[1], 16));
  paintMountain(lat * 8);
  fill(withBrightness(palette[1], 32));
  paintMountain(lat * 9);
  fill(withBrightness(palette[1], 64));
  paintMountain(lat * 10);

  paintArch(moonX, moonY);
}

function paintArch(centerX, centerY) {
  let archWidth = width - width/3;
  let r = archWidth/1.5;
  let d = r * 4 * (sqrt(2)-1) / 3;

  fill(withBrightness(palette[3], 16));
  beginShape();
  vertex(centerX - r, height);
  vertex(centerX - r, centerY);
  bezierVertex(
    centerX - r,
    centerY - d,
    centerX - d,
    centerY - r,
    centerX,
    centerY - r
  );
  bezierVertex(
    centerX + d,
    centerY - r,
    centerX + r,
    centerY - d,
    centerX + r,
    centerY
  );
  vertex(centerX + r, height+1);
  vertex(width*2, height+1);
  vertex(width*2, -height);
  vertex(-width, -height);
  vertex(-width, height+1);
  endShape();
}

function paintMountain(baseY) {
  let inc = random(1000);
  beginShape();
  vertex(0, height);
  for (let x=0; x<=width; x++) {
    let shiftY = noise(inc) * 150 - 75;
    vertex(x, baseY + shiftY);
    inc += 0.005;
  }
  vertex(width, height);
  endShape();
}
