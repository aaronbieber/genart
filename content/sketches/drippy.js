var palettes;

function preload() {
  palettes = loadJSON(baseURL + '/1000.json');
}

function setup() {
  paint();
}

function mouseClicked() {
  paint();
}

function paint() {
  let p = palettes[floor(random(Object.keys(palettes).length-1))];

  var canvas = makeCanvas();
  colorMode(HSB);
  let bg = p[0];
  let bgTriad = triad(bg);
  background(bg);
  noStroke();

  let seg = height/5;
  drip(seg*3, height, p[4]);
  drip(seg*2, seg*4, p[3]);
  drip(seg, seg*3, p[2]);
  drip(0, seg*2, p[1]);
}

function triad(primary) {
  let result = new Array(2);
  result[0] = color(
    (hue(primary) + 83) % 255,
    saturation(primary),
    brightness(primary));
  result[1] = color(
    (hue(primary) + 166) % 255,
    saturation(primary),
    brightness(primary));

  return result;
}

function vertexArc(x, y, r, start, end) {
  if (start < end) {
    for (let a=start; a<=end; a+=radians(5)) {
      vertex(
        r * cos(a) + x,
        r * sin(a) + y);
    }
  } else {
    for (let a=start; a>=end; a-=radians(5)) {
      vertex(
        r * cos(a) + x,
        r * sin(a) + y);
    }
  }
}

function drip(minY, maxY, c) {
  fill(c);

  beginShape();
  vertex(0, 0);

  let x = 0;
  let y = random(minY, maxY);
  let dir = true;
  while (x < width) {
    let newY = dir ? random(y, maxY) : random(minY, y);

    vertex(x, y);
    vertex(x, newY);

    let newX = x + (dir ? random(40, 80) : random(10, 30));
    let circ = newX - x;

    if (dir) {
      vertexArc(x+circ/2, newY, circ/2, PI, 0);
    } else {
      vertexArc(x+circ/2, newY, circ/2, PI, TWO_PI);
    }

    x = newX;
    y = newY;
    dir = !dir;
  }

  vertex(width, 0);
  endShape();
}
