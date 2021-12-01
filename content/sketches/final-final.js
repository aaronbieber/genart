var squares = new Array();
var rows = 5;
var cols = 5;

function setup() {
  var canvas = makeCanvas();
  background(255);
  noStroke();
  fill(0);
  ellipseMode(CENTER);

  let offset = 0;
  for (let y=height/rows/2; y<height; y+=height/rows) {
    for (let x=width/rows/2; x<width; x+=width/rows) {
      squares.push(new Square(x, y, height/rows, offset));
      offset += 10;
    }
  }
}

class Square {
  constructor(x, y, size, offset) {
    this.x      = x;
    this.y      = y;
    this.size   = size;
    this.offset = offset;
    this.inc    = -HALF_PI;
  }

  getSize() {
    let size = map(sin(this.inc % TWO_PI), -1, 1, this.size, 0);
    return size;
  }

  paint(counter) {
    rectMode(CENTER);

    if (counter >= this.offset) this.inc+=0.03;

    let size = this.getSize();
    if (size > 0) {
      fill(map(size, this.size, 0, 0, 255));
      rect(this.x, this.y, size, size);
    }
  }
}

var counter = 0;
function draw() {
  background(255);
  for (let s of squares) {
    s.paint(counter);
  }
  counter+=2;
}
