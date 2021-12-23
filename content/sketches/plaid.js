var bandwidth,
    palettes,
    palette;
var noiseScale = 0.02;

function preload() {
  palettes = loadJSON(baseURL + '/1000.json');
}

function setup() {
  var canvas = makeCanvas();
  strokeWeight(1);
  strokeCap(SQUARE);

  palette = randomElement(palettes);
  bandwidth = width/2;
  background(0);
  stroke(palette[1]);
  fill(palette[1]);
  colorMode(HSB);
}

function draw() {
  paint(bandwidth, true);
  paint(bandwidth/2, false);
  paint(bandwidth/4, true);
  paint(bandwidth/8, false);
  paint(bandwidth/16, true);
  paint(bandwidth/32, false);
  noLoop();
}

function paint(bandwidth, dir) {
  let y=-bandwidth;
  while (y<height+bandwidth) {
    stroke(palette[floor(random(5))]);
    for (let x=0; x<width; x+=bandwidth) {
      let xwiggle = (noise(x, y) - 0.5) * 20;
      strokeWeight((xwiggle / 2) * map(bandwidth, width/2, 0, 5, 1));
      xwiggle = 0;
      let y2 = dir ? y - bandwidth : y + bandwidth;
      line(x + xwiggle, y, x + xwiggle + bandwidth, y2);

      if (floor(random(500)) == 1) {
        strokeWeight(random(15));
        let xd, yd;
        switch(floor(random(4))) {
        case 0:
          xd = x;
          yd = 0;
          break;
        case 1:
          xd = x;
          yd = height;
          break;
        case 2:
          xd = 0;
          yd = y;
          break;
        case 3:
          xd = width;
          yd = y;
          break;
        }
        line(x, y, xd, yd);
      }
    }

    y+=random(50);
  }
}
