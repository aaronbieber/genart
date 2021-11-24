function makeCanvas(maxWidth = 1000, maxHeight = 1000) {
  var w = windowWidth - 30;
  var h = windowHeight - 30;

  if (w > maxWidth) w = 800;
  if (h > maxHeight) h = 800;
  var canvas = createCanvas(w, h);

  return canvas;
}
