var colors;

function setup() {
  var canvas = makeCanvas();
  background(0);
  stroke(255);
  colors = [color('#3FD84E'),
            color('#EC2522')];

}

var r = 100;
var inc = 0;
function draw() {
  background(0);
  r = (shortEdge()/4) * sin(inc/4) + (shortEdge()/4);
  for (let angle=0; angle<TWO_PI; angle+=0.001) {
    let j = (r + randomGaussian() * 30);
    let a = map(abs(shortEdge()/3 - j), 0, 200, 255, 0);
    let x = width/2 + cos(angle) * j;
    let y = height/2 + sin(angle) * j;
    strokeWeight(map(r, shortEdge()/4, shortEdge()/2, 2, 8, true));
    //stroke(255, 255, 255, a);
    stroke(withAlpha(colors[floor(random(2))], a));
    point(x, y);

    if (floor(random(100)) == 1) {
      strokeWeight(1);
      line(width/2, height/2, x, y);
    }
  }
  inc += 0.5;
}
