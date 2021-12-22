var palettes, palette;

function preload() {
  palettes = loadJSON(baseURL + '/1000.json');
}

function setup() {
  var canvas = makeCanvas();
  palette = randomElement(palettes);

  stroke(255);
  noFill();
}

var lines = [];
var angleInc = 0.5;
function draw() {
  blendMode(BLEND);
  background(0);

  let d = shortEdge() - 100;
  // circle(width/2, height/2, d, d);

  let offset = 0;
  let segments = 15;
  for (let i=1; i<=segments; i++) {
    if (lines[i] === undefined) {
      lines[i] = new Line();
    }

    let l = [
      createVector(
        width/2 + d/2 * cos((PI/segments) * i),
        height/2 + d/2 * sin((PI/segments) * i)
      ),
      createVector(
        width/2 + d/2 * cos((PI/segments) * (i + segments)),
        height/2 + d/2 * sin((PI/segments) * (i + segments))
      ),
      createVector(
        width/2 + d/2 * cos(((PI/segments*2)+(angleInc/15)) * (i + segments)),
        height/2 + d/2 * sin(((PI/segments*2)+(angleInc/15)) * (i + segments))
      )
    ];

    // stroke(255, 255, 255, 128);
    // line(l[0].x, l[0].y,
    //      l[1].x, l[1].y);
    // stroke(255);

    let lerpVal = 0.5 * sin(angleInc + offset) + 0.5;
    strokeWeight(10);
    let ploc = p5.Vector.lerp(l[0], l[1], lerpVal);
    // point(ploc);
    strokeWeight(2);
    // line(ploc.x, ploc.y, l[2].x, l[2].y);
    lines[i].draw(ploc, l[2]);

    offset += PI / segments;
  }

  angleInc += 0.02;
}

class Line {
  constructor() {
    this.lines = [];
    this.maxLines = 10;
  }

  draw(v1, v2) {
    // latest line is at the end of the array
    this.lines.push([v1, v2]);

    if (this.lines.length > this.maxLines) {
      this.lines.shift();
    }

    this.paintLines();
  }

  paintLines() {
    for (let i=0; i<this.lines.length; i++) {
      stroke(mapColor(palette[0], palette[4], map(i, 0, this.lines.length-1, 0, 1)));
      line(this.lines[i][0].x,
           this.lines[i][0].y,
           this.lines[i][1].x,
           this.lines[i][1].y);
    }
  }
}
