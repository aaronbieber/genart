var palettes;
var palette;
function preload() {
  palettes = loadJSON(baseURL + '/1000.json');
}

function setup() {
  noStroke();
  var canvas = makeCanvas();
  sourcePalette = randomElement(palettes);
  palette = new Array(10);
  for (let i=0; i<palette.length; i++) {
    palette[i] = withBrightness(sourcePalette[0], map(i, 0, palette.length, 100, 0));
  }
  paint(palette);
  frameRate(10);
}

function draw() {
  palette.push(palette.shift());
  paint(palette);
}

function paint(pal) {
  background(0);
  let gridInt = longEdge()/5;
  let s = gridInt;
  let noiseScale = 0.5;

  for (let c=0; c<palette.length; c++) {
    fill(pal[c]);
    for (let y=0; y<height; y+=gridInt) {
      for (let x=0; x<width; x+=gridInt) {
        let n = noise((x-s)*noiseScale, (y-s)*noiseScale);
        let v = new p5.Vector.fromAngle(radians(map(n, 0, 1, 0, 360)));
        let xo = c == 0 ? 0 : v.x * 5;
        let yo = c == 0 ? 0 : v.y * 5;
        rect(x, y, s, s);
      }
    }

    s -= gridInt/palette.length;
  }
}
