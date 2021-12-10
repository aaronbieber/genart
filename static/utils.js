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

function withBrightness(c, b) {
  colorMode(HSB);
  return color(
    hue(c),
    saturation(c),
    b);
}

/* Return the given color `c' with the alpha value set to `a', which
 * should be an integer from 0-255. */
function withAlpha(c, a) {
  colorMode(RGB);
  return color(
    red(c),
    green(c),
    blue(c),
    a);
}

function longEdge() {
  return width >= height ? width : height;
}

function shortEdge() {
  return width <= height ? width : height;
}

function loadWhile(callback) {
  startLoading();
  setTimeout(() => {
    callback();
    endLoading();
  }, 100);
}

function startLoading() {
  document.getElementById('loading').style.display = 'block';
}

function endLoading() {
  document.getElementById('loading').style.display = 'none';
}

function randomElement(arr) {
  return arr[floor(random(Object.keys(arr).length-1))];
}
