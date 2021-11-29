var ghosts = new Array(20);

function setup() {
  var canvas = makeCanvas();
  background(0);
  stroke('#0000cc');
  colorMode(HSB);

  for (let i=0; i<ghosts.length; i++) {
    let c = color(random(255), 250, 250);
    ghosts[i] = new Ghost(random(1), int(random(100, 300)), c);
  }
}

class Ghost {
  constructor(pct, size, c) {
    this.inc = 0.01;
    this.pct = pct;
    this.size = size;
    this.c = c;

    this.x1 = random(width);
    this.y1 = height + size * 1.5;
    this.x2 = random(width);
    this.y2 = -size * 1.5;
  }

  update() {
    this.pct = (this.pct + this.inc) % 1;
  }

  alpha(p, start, end) {
    return color(
      hue(this.c),
      saturation(this.c),
      brightness(this.c),
      map(p, start, end, 0, 1)
    );
  }

  paint() {
    let start = this.pct;
    let end = (this.pct+(this.inc*5)) % 1;

    for (let i=6; i>=0; i--) {
      let p = this.pct - (this.inc * i);
      if(p < 0) continue;

      let eyes = 0;
      if (i == 0) {
        if (this.x1 < this.x2) {
          eyes = 1;
        } else if (this.x1 > this.x2) {
          eyes = -1;
        }
      }

      drawGhost(
        lerp(this.x1, this.x2, p),
        lerp(this.y1, this.y2, p),
        this.size,
        this.alpha(i, 6, 0),
        eyes);
    }
  }
}

function drawGhost(x, y, size, c, eyes) {
  push();
  translate(x, y);

  ellipseMode(CENTER);
  fill(c);
  noStroke();
  arc(0, 0, size, size, -radians(180), 0, CHORD);

  let h = size * 0.6;

  beginShape();
  vertex(-size/2, -1);
  vertex(-size/2, h);
  vertex(-size/2+size/6, h-size/6);
  vertex(-size/2+size/3, h);
  vertex(0, h-size/6);
  vertex(size/6, h);
  vertex(size/3, h-size/6);
  vertex(size/2, h);
  vertex(size/2, -1);
  endShape(CLOSE);

  if (eyes != 0) {
    fill(255);
    ellipse(-size/3.3, 0, size/3, size/2.5);
    ellipse(-size/3.3+size/2.7, 0, size/3, size/2.5);

    fill('#000055');
    if (eyes == -1) {
      ellipse(-size/3.3-size/12, 0, size/6, size/5);
      ellipse(-size/3.3+size/2.7-size/12, 0, size/6, size/5);
    } else if (eyes == 1) {
      ellipse(-size/3.3+size/12, 0, size/6, size/5);
      ellipse(-size/3.3+size/2.7+size/12, 0, size/6, size/5);
    }
  }

  pop();
}

function draw() {
  background(0);

  for (let g of ghosts) {
    g.update();
    g.paint();
  }
}
