function makeCanvas(maxWidth = 1000, maxHeight = 1000) {
  var w = windowWidth - 30;
  var h = windowHeight - 80;

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

/* Given a `primary' color, return an array of the color's two
 * triads. */
function triad(primary) {
  colorMode(HSB);
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

/* Given a `primary' color, return the color's complement (opposite).
 */
function complementary(primary) {
  colorMode(HSB);
  return color(
    (hue(primary) + 180) % 255,
    saturation(primary),
    brightness(primary));
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
  return arr[floor(random(Object.keys(arr).length))];
}

class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  intersects(from2, to2) {
    const dX = this.p2.x - this.p1.x;
    const dY = this.p2.y - this.p1.y;

    const determinant = dX * (to2.y - from2.y) - (to2.x - from2.x) * dY;
    if (determinant === 0) return undefined; // parallel lines

    const lambda = ((to2.y - from2.y) * (to2.x - this.p1.x) + (from2.x - to2.x) * (to2.y - this.p1.y)) / determinant;
    const gamma = ((this.p1.y - this.p2.y) * (to2.x - this.p1.x) + dX * (to2.y - this.p1.y)) / determinant;

    // check if there is an intersection
    if (!(0 <= lambda && lambda <= 1) || !(0 <= gamma && gamma <= 1)) return undefined;

    return createVector(
      this.p1.x + lambda * dX,
      this.p1.y + lambda * dY
    );
  }

  slopeIntercept() {
    let a = (this.p1.y - this.p2.y) / (this.p1.x - this.p2.x);
    let b = this.p1.y - a * this.p1.x;

    return {
      slope: a,
      yint: b
    };
  }

  paint() {
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
  }
}

/**
 * Author: Oleksii Trekhleb
 * From https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/statistics/weighted-random/weightedRandom.js
 *
 * Picks the random item based on its weight.
 * The items with higher weight will be picked more often (with a higher probability).
 *
 * For example:
 * - items = ['banana', 'orange', 'apple']
 * - weights = [0, 0.2, 0.8]
 * - weightedRandom(items, weights) in 80% of cases will return 'apple', in 20% of cases will return
 * 'orange' and it will never return 'banana' (because probability of picking the banana is 0%)
 *
 * @param {any[]} items
 * @param {number[]} weights
 * @returns {{item: any, index: number}}
 */
function weightedRandom(items, weights) {
  if (items.length !== weights.length) {
    throw new Error('Items and weights must be of the same size');
  }

  if (!items.length) {
    throw new Error('Items must not be empty');
  }

  // Preparing the cumulative weights array.
  // For example:
  // - weights = [1, 4, 3]
  // - cumulativeWeights = [1, 5, 8]
  const cumulativeWeights = [];
  for (let i = 0; i < weights.length; i += 1) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
  }

  // Getting the random number in a range of [0...sum(weights)]
  // For example:
  // - weights = [1, 4, 3]
  // - maxCumulativeWeight = 8
  // - range for the random number is [0...8]
  const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
  const randomNumber = maxCumulativeWeight * Math.random();

  // Picking the random item based on its weight.
  // The items with higher weight will be picked more often.
  for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
    if (cumulativeWeights[itemIndex] >= randomNumber) {
      return {
        item: items[itemIndex],
        index: itemIndex,
      };
    }
  }
}

// Lifted from https://openprocessing.org/sketch/757837
// Given two points on a line, return the slope and y-intercept
function slopeIntercept(x1, y1, x2, y2) {
  var a, b;

  a = (y1 - y2) / (x1 - x2);
  b = y1 - a * x1;

  return {
    slope: a,
    yint: b
  };
}
