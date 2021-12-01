var palette;
var palettes;

function preload() {
  palettes = loadJSON(baseURL + '/1000.json');
}

var hue;
function setup() {
  var canvas = makeCanvas();
  colorMode(HSB);
  hue = random(255);
  // let bg = color(hue, 180, 32);
  // let fg = color(
  //   (hue + 120) % 255,
  //   175,
  //   90);

  palette = palettes[floor(random(Object.keys(palettes).length-1))];
  let fg = color(palette[0]);
  let bg = color(palette[4]);

  background(bg);

  centers = new Array();
  for (let i=0; i<10; i++) {
    centers.push(new p5.Vector(100+random(width-200), 100+random(height-200)));
  }

  centers.sort((a, b) => { return a.y < b.y ? -1 : 1; });

  for (let c of centers) {
    pillar(c.x, c.y, fg, bg);
  }
}

function pillar(x, y, fg, bg) {
  let r = map(y, 0, height, 400, 50);
  ellipseMode(CENTER);
  for (let i=y; i<height; i++) {
    let c = lerpColor(fg, bg, map(i, y, height, 0.03, 1.0));
    stroke(c);
    strokeWeight(1.5);
    line(x-r/2, i, x+r/2, i);
  }
  fill(fg);
  noStroke();
  ellipse(x, y, r, r/1.5);
}