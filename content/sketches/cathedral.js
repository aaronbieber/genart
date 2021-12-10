var palettes, palette;
function preload() {
  palettes = loadJSON(baseURL + '/1000.json');
}
function setup() {
  var canvas = makeCanvas();
  palette = randomElement(palettes);
  background(0);
  stroke(255);
  noFill();
  paint();
}

function paint() {
  for (let p=0; p<3; p++) {
    pillar(p*(width/2), height/2-height/4, 100, palette[0], 90);
  }

  for (let p=0; p<2; p++) {
    pillar((p*(width/2))+width/4, height/2, 60, palette[0], 140);
  }

  for (let p=0; p<4; p++) {
    pillar((p*(width/4))+width/8, height/2+height/4, 30, palette[0], 140);
  }
}

function pillar(xOrigin, yOrigin, w, c, maxA) {
  loadPixels();
  for (let y=height; y>=0; y--) {
    if (y>yOrigin) {
      drawLine(xOrigin-w/2, xOrigin+w/2, y, maxA, c);
    } else {
      let x1 = ceil(xOrigin - pow((yOrigin - y)/6, 1.6) - w/2);
      let x2 = floor(xOrigin + pow((yOrigin - y)/6, 1.6) + w/2);
      drawLine(x1, x2, y, maxA, c);
    }
  }
  updatePixels();
}

function drawLine(x1, x2, y, maxA, c) {
  for (let x=x1; x<=x2; x++) {
    let falloff = (x2-x1)/2;
    let minA = 16;
    let a1 = map(x, x1, x1+falloff, maxA, minA, true);
    let a2 = map(x, x2-falloff, x2, minA, maxA, true);
    let a = a1 + a2;
    let blendedColor = blendColors(withAlpha(c, a), getp(x, y));

    if (x < 0 || x >= width) continue;

    set(x, y, blendedColor);
  }
}

function blendColors(c1, c2) {
  let fg = {
    A: alpha(c1) / 255,
    R: red(c1) / 255,
    G: green(c1) / 255,
    B: blue(c1) / 255
  }
  let bg = {
    A: alpha(c2) / 255,
    R: red(c2) / 255,
    G: green(c2) / 255,
    B: blue(c2) / 255
  }
  let a = fg.A + bg.A * (1 - fg.A);
  return color(
    (fg.R * fg.A + bg.R * (1 - fg.A)) * 255,
    (fg.G * fg.A + bg.G * (1 - fg.A)) * 255,
    (fg.B * fg.A + bg.B * (1 - fg.A)) * 255
  );
}

function getp(x, y) {
  let d = pixelDensity();
  let index = 4 * ((y * d) * width * d + (x * d));
  return color(
    pixels[index],
    pixels[index+1],
    pixels[index+2],
    pixels[index+3]);
}
