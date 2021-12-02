function makeCanvas(maxWidth = 1000, maxHeight = 1000) {
  var w = windowWidth - 30;
  var h = windowHeight - 30;

  if (w > maxWidth) w = maxWidth;
  if (h > maxHeight) h = maxHeight;
  var canvas = createCanvas(w, h);

  return canvas;
}

function mapColor(c1, c2, pct) {
  colorMode(RGB);
  return color(
    map(pct, 0, 1, red(c1), red(c2)),
    map(pct, 0, 1, green(c1), green(c2)),
    map(pct, 0, 1, blue(c1), blue(c2)));
}
