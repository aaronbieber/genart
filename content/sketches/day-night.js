function setup() {
  var canvas = makeCanvas();

  paint();
}

function mouseClicked() {
  paint();
}

function paint() {
  // Sky gradient
  var r, g, b;
  var noiseVal;
  var noiseScale = 0.02;
  let d = pixelDensity();
  loadPixels();
  for(var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      noiseDetail(3, 0.4);
      noiseVal = noise(x * noiseScale, y * noiseScale);

      r = floor(map(y, 0, height, 26, 146));
      g = floor(map(y, 0, height, 128, 201));
      b = 224;

      r = floor(map(noiseVal, 0, 1, r, 255));
      g = floor(map(noiseVal, 0, 1, g, 255));
      b = floor(map(noiseVal, 0, 1, b, 255));

      // index = 4 * ((y * d * x) * width * d + (x * d * y));
      // pixels[index] = color(r, g, b);
      set(x, y, color(r, g, b));
    }
  }
  updatePixels();

  fill(0);
  rect(0, height-100, 100, 100);

  // Buildings
  var widthStep = 200;
  var totalWidth = 0;
  var thisWidth,
      thisHeight,
      winWidth,
      winHeight,
      winCols,
      winRows,
      winColSpace,
      winRowSpace,
      winLeft,
      winTop;
  var winColor;
  while (totalWidth < width) {
    thisWidth = floor(random(width / 6, width / 3));
    thisHeight = floor(random(height / 2 - height / 3, height / 2));

    // The building
    fill(0);
    stroke(0);
    rect(totalWidth, height-thisHeight, thisWidth, thisHeight);

    // The windows
    winWidth = floor(random(width / 80, width / 60));
    winHeight = floor(random(width / 50, width / 30));
    winCols = floor(thisWidth / (winWidth * 2)) - 3;
    winRows = floor(thisHeight / (winHeight * 2)) - 1;
    winColSpace = (thisWidth - (winCols * winWidth)) / (winCols + 1);
    winRowSpace = (thisHeight - (winRows * winHeight)) / (winRows + 1);
    for (var x = 1; x <= winCols; x++) {
      for (var y = 1; y <= winRows; y++) {
        winColor = getWindowColor();
        fill(winColor);
        winLeft = totalWidth + (winWidth * (x - 1)) + (winColSpace * x);
        winTop = height-thisHeight + (winHeight * (y - 1)) + (winRowSpace * y);
        doWindowGlow(winLeft, winTop, winWidth, winHeight, winColor);
        rect(
          winLeft,
          winTop,
          winWidth,
          winHeight);
      }
    }
    totalWidth += thisWidth;
  }
}


function getWindowColor() {
  var jitter = random(1);
  var r = floor(map(jitter, 0, 1, 240, 240));
  var g = floor(map(jitter, 0, 1, 227, 236));
  var b = floor(map(jitter, 0, 1, 96, 179));
  return color(r, g, b);
}

function doWindowGlow(left, top, wWidth, wHeight, winColor) {
  var r, g, b;
  left += 1;
  top += 1;
  wWidth -= 2;
  wHeight -= 2;
  for (var i = 10; i >= 0; i--) {
    r = floor(map(i, 1, 10, red(winColor), 0));
    g = floor(map(i, 1, 10, green(winColor), 0));
    b = floor(map(i, 1, 10, blue(winColor), 0));
    stroke(r, g, b);
    fill(r, g, b);
    rect(left - i, top - i, wWidth + (i*2), wHeight + (i*2), i);
  }
}
