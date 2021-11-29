function setup() {
  var canvas = makeCanvas();
  noFill();
  stroke(0);
  paint();
}

function drawStripe(xOrigin, yOrigin) {
  noFill();
  strokeWeight(1);

  for (let s=0; s<50; s++) {
    beginShape();
    for (let y=0; y<100; y+=1) {
      let x = sin(map(y, 0, 100, HALF_PI, PI + HALF_PI)) * 49.5;

      if (x > -40 && x <= -30) {
        stroke('#00ff00');
      } else {
        stroke('#dd0000');
      }

      vertex(xOrigin + x, yOrigin + y + s);
    }
    endShape();
  }
}

function drawStripes(xOrigin, yOrigin, count) {
  for (let s=0; s<count; s++) {
    drawStripe(xOrigin, yOrigin + s * 100);
  }
}

function drawCane(xOrigin, yOrigin, caneHeight) {
  push();

  translate(xOrigin, yOrigin);
  rotate(radians(random(0, 5)));
  rectMode(CENTER);
  ellipseMode(CENTER);
  noStroke();
  fill(240);
  rect(0, caneHeight/2, 100, caneHeight);
  ellipse(0, 0, 100, 20);

  strokeWeight(4);
  stroke(255);
  line(-40, 0, -40, caneHeight);

  drawStripes(0, 0, ceil(caneHeight / 100) + 1);

  for (let shadow=0; shadow<5; shadow++) {
    rectMode(CORNERS);
    noStroke();
    fill(color(0, 0, 0, 32));
    rect(map(shadow, 0, 5, 0, 30), 0, 50, caneHeight);
  }

  pop();
}

function drawBackground() {
  colorMode(HSB);
  for (let y=0; y<height; y++) {
    stroke(map(y, 0, height, 0, 255), 200, 200);
    line(0, y, width, y);
  }
  colorMode(RGB);
}

function paint() {
  drawBackground();
  for (let canes=0; canes<15; canes++) {
    //drawCane(width/2, height/2, height/2);
    let x = random(width);
    let y = random(height) + 50;
    drawCane(x, y, ceil(height-y));
  }
}

function mouseClicked() {
  paint();
}
