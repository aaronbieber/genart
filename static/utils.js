function makeCanvas() {
  var w = windowWidth - 30;
  var h = windowHeight - 30;

  if (w > 1000) w = 800;
  if (h > 1000) h = 800;
  var canvas = createCanvas(w, h);

  return canvas;
}
