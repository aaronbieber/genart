var displacementThresh;

function setup() {
  var canvas = makeCanvas();
  background(255);
  noStroke();
  colorMode(HSB);
  frameRate(30);

  displacementThresh = (width > 400) ? width/3 : width/2;
}

function expMap(n, vMin, vMax, oMin, oMax) {
  let minLog = log(oMin);
  let maxLog = log(oMax);
  let scaleLog = (maxLog - minLog) / (vMax - vMin);
  return exp((n - vMin) * scaleLog + minLog);
}

function sinMap(n, vMin, vMax, oMin, oMax) {
  let a = (oMax - oMin) / 2;
  let c = oMin + ((oMax - oMin) / 2);
  return a * sin(map(n, vMin, vMax, -PI/2, PI/2)) + c;
}

var noiseInc = 0;
var dotInc = 0;
var nval1 = 0;
var nval2 = 100;
var gridStep = 50;
function draw() {
  background(255);
  let dotAngle = dotInc % TWO_PI;
  let radius = width/2-displacementThresh/3;
  let x = sin(dotAngle) * radius + width/2;
  let y = cos(dotAngle) * radius + height/2;
  let fillHue = map(dotAngle, 0, TWO_PI, 0, 360);

  for (let gy=gridStep/2; gy<height; gy+=gridStep) {
    for (let gx=gridStep/2; gx<width; gx+=gridStep) {
      let d = dist(x, y, gx, gy);
      let dx = gx;
      let dy = gy;
      let scale = 1;
      if (d < displacementThresh) {
        push();
        translate(x, y);
        let angle = atan2(gx-x, gy-y);
        let pushAmt = sinMap(d, 0, displacementThresh, displacementThresh/4, 1);
        scale = map(pushAmt, displacementThresh/4, 1, 0.15, 1);
        dx = gx + sin(angle) * pushAmt;
        dy = gy + cos(angle) * pushAmt;
        pop();
      }

      fill(fillHue, 200, 64);
      circle(dx, dy, 70 * scale);
    }
  }

  dotInc += 0.02;
  noiseInc += 0.0005;
  nval1 += 0.01;
  nval2 += 0.01;
}
