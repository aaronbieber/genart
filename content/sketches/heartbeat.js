var qrs = [ -0.5, 2, -0.6 ];
var interval = 40;
var heartCount = 150;
var maxOffset = 0;
var hearts = new Array();
var startVals = new Array(heartCount);

function setup() {
  var canvas = makeCanvas();
  background(255);
  noStroke();
  fill(0);

  var offsets = new Array(heartCount);
  for (var i=0; i<heartCount; i++) {
    var h = new Heart();
    offsets[i] = h.offset;
    hearts.push(new Heart());

    startVals[i] = h.getPulse(1);
  }

  maxOffset = offsets[offsets.length-1];
}

function atStart(i) {
  for (var j=0; j<hearts.size(); j++) {
    if (hearts.get(j).getPulse(i) != startVals[j]) {
      return false;
    }
  }
  return true;
}

class Heart {
  constructor() {
    this.interval = 50;
    this.segment = this.interval / 4;
    this.offset = int(random(0, 20));
    this.pos = new p5.Vector(random(width), random(height));
  }

  getPulse(inc) {
    var t = (inc + this.offset) % this.interval;
    var y = 0;

    if (t < this.segment) {
      y = map(t, 0, this.segment, 0, qrs[0]);
    } else if (t >= this.segment && t < this.segment*2) {
      y = map(t, this.segment, this.segment*2, qrs[0], qrs[1]);
    } else if (t >= this.segment*2 && t < this.segment*3) {
      y = map(t, this.segment*2, this.segment*3, qrs[1], qrs[2]);
    } else if (t >= this.segment*3 && t <= this.segment*4) {
      y = map(t, this.segment*3, this.segment*4, qrs[2], 0);
    }

    return y;
  }
}

var i = 0;
var t = 0;
var pulse;
var segment;
function draw() {
  background(255);
  t = i % interval;

  for (h of hearts) {
    push();
    translate(h.pos.x, h.pos.y);
    pulse = h.getPulse(i);
    fill(color(
      255,
      0,
      0,
      map(pulse, -0.2, 2, 128, 255)));
    circle(0, 0, pulse*50+50);
    pop();
  }

  i += 1;
}
