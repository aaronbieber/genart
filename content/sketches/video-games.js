var clear;
var black;
var red;
var brown;
var blue;
var gold;
var skin;
var colors;

var positions = new Array(16);
var targets = new Array(16);
var sizes = new Array(16);
var sizeTargets = new Array(16);

function setup() {
  var canvas = makeCanvas();
  background(255);
  strokeWeight(5);
  rectMode(CENTER);
  noStroke();

  clear = color(255, 255, 255, 0);
  black = color(0);
  red = color(207, 58, 25);
  brown = color(117, 42, 15);
  blue = color(47, 95, 179);
  gold = color(230, 188, 28);
  skin = color(240, 213, 169);
  colors = [
    [ clear, clear, clear, red, red, red, red, red, clear, clear, clear, clear ],
    [ clear, clear, red, red, red, red, red, red, red, red, red, clear ],
    [ clear, clear, brown, brown, brown, skin, skin, black, skin, clear, clear, clear ],
    [ clear, brown, skin, brown, skin, skin, skin, black, skin, skin, skin, clear ],
    [ clear, brown, skin, brown, brown, skin, skin, skin, black, skin, skin, skin ],
    [ clear, clear, brown, skin, skin, skin, skin, black, black, black, black, clear ],
    [ clear, clear, clear, skin, skin, skin, skin, skin, skin, clear, clear, clear ],
    [ clear, clear, blue, blue, red, blue, blue, red, clear, clear, clear, clear ],
    [ clear, blue, blue, blue, red, blue, blue, red, blue, blue, blue, clear ],
    [ blue, blue, blue, blue, red, blue, blue, red, blue, blue, blue, blue ],
    [ skin, skin, blue, blue, red, red, red, red, blue, blue, skin, skin ],
    [ skin, skin, skin, red, gold, red, red, gold, red, skin, skin, skin ],
    [ skin, skin, red, red, red, red, red, red, red, red, skin, skin ],
    [ clear, clear, red, red, red, clear, clear, red, red, red, clear, clear ],
    [ clear, brown, brown, brown, clear, clear, clear, clear, brown, brown, brown, clear ],
    [ brown, brown, brown, brown, clear, clear, clear, clear, brown, brown, brown, brown ]
  ];

  seedPositions(positions);
  seedSizes(sizes);
}

function seedPositions(positions) {
  for (var y=0; y<positions.length; y++) {
    positions[y] = new Array(12);
    for (var x=0; x<positions[y].length; x++) {
      var tx = random(-width*2, width*2);
      var ty = random(-height*2, height*2);
      if (tx > 0 && tx < width) tx += width*1.5;
      if (ty > 0 && ty < height) ty += height*1.5;
      positions[y][x] = new p5.Vector(tx, ty);
    }
  }
}

function seedSizes(sizes) {
  for (var y=0; y<sizes.length; y++) {
    sizes[y] = new Array(12);
    for (var x=0; x<sizes[y].length; x++) {
      sizes[y][x] = 50 * random(1, 5);
    }
  }
}

var dir = 1;
var readyToFlip = 1;
function draw() {
  background(0);

  if (dir == 1) {
    readyToFlip = 1;
    for (let y=0; y<colors.length; y++) {
      for (let x=0; x<colors[y].length; x++) {
        fill(colors[y][x]);

        let targetX = x * 50 + (width - 50 * 12) / 2;// + 225;
        let targetY = (y * 50 + (height - 50 * 16) / 2) + 25;// + 125;
        let distX = targetX - positions[y][x].x;
        let distY = targetY - positions[y][x].y;
        let sizeDist = 50 - sizes[y][x];
        sizes[y][x] += sizeDist * 0.05;

        positions[y][x].x += distX * 0.05;
        positions[y][x].y += distY * 0.05;

        if (distX > 0.05 || distY > 0.05) {
          readyToFlip = 0;
        }

        rect(positions[y][x].x, positions[y][x].y, sizes[y][x], sizes[y][x]);
      }
    }
    if (readyToFlip == 1) {
      seedPositions(targets);
      seedSizes(sizeTargets);
      dir = -1;
    }
  } else if (dir == -1) {
    readyToFlip = 1;
    for (let y=0; y<colors.length; y++) {
      for (let x=0; x<colors[y].length; x++) {
        fill(colors[y][x]);

        let distX = targets[y][x].x - positions[y][x].x;
        let distY = targets[y][x].y - positions[y][x].y;
        let sizeDist = sizeTargets[y][x] - sizes[y][x];
        sizes[y][x] += sizeDist * 0.05;

        positions[y][x].x += distX * 0.05;
        positions[y][x].y += distY * 0.05;

        if (distX > 0.05 || distY > 0.05) {
          readyToFlip = 0;
        }

        rect(positions[y][x].x, positions[y][x].y, sizes[y][x], sizes[y][x]);
      }
    }
    if (readyToFlip == 1) {
      dir = 1;
    }
  }
}
