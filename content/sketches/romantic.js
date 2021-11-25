var img;

function preload() {
  img = loadImage(baseURL + '/romantic.jpg');
}

function setup() {
  var canvas = makeCanvas();
  noStroke();
  blendMode(SCREEN);
  rectMode(CENTER);

  paint();
}

function paint() {
  background(0);

  var minSize = 8;
  var maxSize = 30;
  var angle = random(180);
  var xoff = 4;
  var yoff = 5;
  for (var y=0; y<height; y+=20) {
    for (var x=0; x<width; x+=20) {
      fill(img.get(x, y));
      var size = map(dist(x, y, 500, 750), 0, 800, minSize, maxSize)
                   * map(noise(xoff, yoff), 0, 1, 0.5, 1.5);

      push();
      translate(x, y);
      rotate(radians(angle % 360));
      rect(0, 0, size, size);
      pop();

      xoff += 0.1;
    }
    yoff += 0.1;
  }
}
