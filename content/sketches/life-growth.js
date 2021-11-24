function setup() {
  var canvas = makeCanvas();

  paint();
}

function mouseClicked() {
  paint();
}

function paint() {
  push();

  background(0);

  var r, g, b;
  loadPixels();
  for(var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      r = floor(map(y, 0, height, 26, 146));
      g = floor(map(y, 0, height, 128, 201));
      set(x, y, color(r, g, 224));
    }
  }
  updatePixels();

  stroke(color(99, 40, 14));
  strokeWeight(10);
  translate(width/2, height);
  line(0, 0, 0, -250);
  translate(0, -250);
  branch(250, 10);

  pop();
}

// Heavily inspired by https://processing.org/examples/tree.html
function branch(h, w) {
  var multiplier = random(0.5, 0.85);
  h *= multiplier;
  w = constrain(floor(w * 0.8), 1, w);

  if (h > 5) {
    push();
    drawLine(h, w);
    branch(h, w);
    pop();

    push();
    drawLine(h, w);
    branch(h, w);
    pop();

    push();
    drawLine(h, w);
    branch(h, w);
    pop();
  }
}

function drawLine(h, w) {
    var r, g, b;
    // 99, 40, 14
    // 51, 163, 34
    r = floor(map(h, 250, 0, 99, 51));
    g = floor(map(h, 250, 0, 40, 163));
    b = floor(map(h, 250, 0, 14, 34));
    stroke(color(r, g, b));

    rotate(radians(map(random(80), 0, 80, -40, 40)));
    strokeWeight(w);
    line(0, 0, 0, -h);
    translate(0, -h);
}
