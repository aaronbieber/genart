var res = 30;
var h = 0;
var a = 100;
var aDir = -1;
var glyphSeed = 1;
var glyphs;

function setup() {
  var canvas = makeCanvas();
  background(0);
  glyphs = makeGlyphs();
}

var glyphFrame = 0;
function draw() {
  scanLines();

  var glyphsLine = (height - (res * 3));
  glyphsLine = glyphsLine - (glyphsLine % res);
  drawGlyphs(glyphs, glyphsLine);

  noStroke();
  for (var y=0; y<height; y+=res) {
    for (var x=0; x<width; x+=res) {

      var closest = height*2;
      var winStart = max(x-100, 0);
      var winEnd   = min(x+100, width);
      for (var lineX = winStart; lineX < winEnd; lineX++) {
        var lineY = a * sin((lineX-h) / 50) + height / 2;
        if (dist(float(x), float(y), lineX, lineY) < closest) {
          closest = dist(float(x), float(y), lineX, lineY);
        }
      }

      if (closest < 50) {
        fill(0, map(closest, 0, 50, 255, 0), 0);
        rect(x, y, res, res);
      }
    }
  }
  h-=5;
  glyphFrame++;

  if (glyphFrame % 10 == 0) {
    glyphs = makeGlyphs();
  }

  if (aDir == 1) a += 5;
  if (aDir == -1) a -= 5;
  if (a >= 150) aDir = -1;
  if (a <= 20) aDir = 1;

  //saveFrame("screens/screen-####.png");
}

function drawGlyph(glyph, x, y) {
  if (glyph[0] == 1) rect(x, y, res, res);
  if (glyph[1] == 1) rect(x+res, y, res, res);
  if (glyph[2] == 1) rect(x, y+res, res, res);
  if (glyph[3] == 1) rect(x+res, y+res, res, res);
}

function drawGlyphs(glyphs, y) {
  var left = res;
  for (var x = 0; x < glyphs.length; x++) {
    fill(0, 255, 0);
    drawGlyph(glyphs[x], left, y);

    left += res * 3;
  }
}

function makeGlyphs() {
  var numGlyphs = floor(random((width - res) / (res * 3)));
  var glyphs = new Array(numGlyphs);

  for (var x = 0; x < numGlyphs; x++) {
    var row = [
      random(1) > 0.5 ? 1 : 0,
      random(1) > 0.5 ? 1 : 0,
      random(1) > 0.5 ? 1 : 0,
      random(1) > 0.5 ? 1 : 0];

    glyphs[x] = row;
  }

  return glyphs;
}

function scanLines() {
  background(color(15,59,19));
  for (var y = 0; y < height; y += res*2) {
    fill(21,82,26);
    rect(0, y, width, res);
  }
}
