var palettes;
var palette;

function preload() {
  palettes = loadJSON(baseURL + '/1000.json');
}

function setup() {
  var canvas = makeCanvas();
  blendMode(SCREEN);
  paint();
}

function mouseClicked() {
  loadWhile(paint);
}

function leaf(x, y, r) {
  beginShape();
  vertex(x, y+r/2);
  bezierVertex(x+r/4, y+r/3, x+r/4, y-r/3, x, y-r/2);
  bezierVertex(x-r/4, y-r/3, x-r/3, y+r/4, x, y+r/2);
  endShape(CLOSE);
}

function paint() {
  palette = palettes[floor(random(Object.keys(palettes).length-1))];
  blendMode(BLEND);
  background(withBrightness(color(palette[0]), 24));
  blendMode(SCREEN);

  for (let i=0; i<5; i++) {
    let xMin = width/8;
    let xMax = width-xMin;
    let yMin = height/8;
    let yMax = height-yMin;
    drawCluster(random(xMin, xMax), random(yMin, yMax), palette);
  }
}

function drawCluster(x, y, palette) {
  let s = shortEdge();
  let l = longEdge();
  for (let i=0; i<s; i++) {
    let c = color(palette[floor(random(palette.length-1))]);
    noStroke();
    fill(c);
    let leafX = randomGaussian(x, l/6);
    let leafY = randomGaussian(y, l/6);
    let maxR = map(dist(leafX, leafY, x, y), 0, s/2, 50, 5, true);
    let r = random(10,30);

    push();
    translate(leafX, leafY);
    rotate(radians(random(180)));
    leaf(0, 0, maxR);
    pop();
  }
}
