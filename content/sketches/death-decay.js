var seedCount = 50;
var seeds = new Array(seedCount);

function setup() {
  var canvas = makeCanvas();

  for (var i = 0; i < seeds.length; i++) {
    var added = false;
    while (!added) {
      var newSeed = new p5.Vector(int(random(width)), int(random(height)));

      if (i == 0) {
        seeds[i] = newSeed;
        added = true;
      } else {
        for (var j = i-1; j >= 0; j--) {
          if (dist(newSeed.x, newSeed.y, seeds[j].x, seeds[j].y) < 100) {
            break;
          }
          if (j == 0) {
            seeds[i] = newSeed;
            added = true;
          }
        }
      }
    }
  }

  paintBackground();
  paint();
}

function paintBackground() {
  // Paint background
  // 87, 36, 7
  // 46, 19, 4
  loadPixels();
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      set(x, y, color(
        floor(map(y, 0, height, 87, 46)),
        floor(map(y, 0, height, 36, 19)),
        floor(map(y, 0, height, 7, 4))
      ));
    }
  }
  updatePixels();
}

function getBackground(y) {
  // 230, 38, 21
  // 115, 21, 7
  return color(
    floor(map(y, 0, height, 230, 115)),
    floor(map(y, 0, height, 38, 21)),
    floor(map(y, 0, height, 21, 7)));
}

function paint() {
  loadPixels();
  var center = new p5.Vector(width / 2, height);
  var maxDistance = height;

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var distances = new Array(); //float[seeds.length];
      var smallestIndex = seeds.length + 1;
      var shortestDistance = height*2;
      for (var i = 0; i < seeds.length; i++) {
        distances[i] = dist(seeds[i].x, seeds[i].y, x, y);
        if (distances[i] < shortestDistance) {
          smallestIndex = i;
          shortestDistance = distances[i];
        }
      }
      var sorted = sort(distances);

      var distance = dist(x, y, center.x, center.y);
      var gap = map(distance, 0, maxDistance, 100, 0);
      if (floor(sorted[1] - sorted[0]) < gap) {
        if (sorted[1] - sorted[0] > gap - 1.5 && seeds[smallestIndex].y < y) {
          set(x, y, color(color(255, 0, 0)));
          //pixels[y * width + x] = color(color(255, 0, 0));
        } else {
          set(x, y, getBackground(y));
          //pixels[y * width + x] = getBackground(y); //color(255);
        }

      }
    }
  }
  updatePixels();

  noLoop();
}
