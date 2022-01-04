var resolution,
    palette,
    palettes,
    verts;

function preload() {
  palettes = loadJSON(baseURL + '/1000.json');
}

function setup() {
  var canvas = makeCanvas();
  background(0);
  strokeWeight(1);
  noStroke();
  colorMode(HSB);
  palette = randomElement(palettes);

  resolution = int(width * 0.01);
  num_columns = int(width * 2) / resolution;
  num_rows = int(height * 2) / resolution;

  grid = [];
  for (let x=0; x<num_columns; x++) {
    grid[x] = [];
    for (let y=0; y<num_rows; y++) {
      let angle = map(noise(x * 0.03, y * 0.03),
                      0, 1, 0, TWO_PI) + PI;

      grid[x][y] = angle;
    }
  }

  let steps = 300;
  let step_length = 5;
  verts = [];
  for (y=0; y<height; y+=20) {
    let x1 = 0;
    let y1 = y;
    verts[verts.length] = [new p5.Vector(x1, y1)];

    for (let s=0; s<steps; s++) {
      let column_index = int((x1 + width/2) / resolution);
      let row_index = int((y1 + height/2) / resolution);

      if (column_index < 0 || column_index > grid.length-1) continue;
      if (row_index < 0 || row_index > grid[column_index].length-1) continue;

      let angle = grid[column_index][row_index];
      let x_step = step_length * cos(angle);
      let y_step = step_length * sin(angle);

      let x2 = x1 + x_step;
      let y2 = y1 + y_step;

      // line(x1, y1,
      //      x2, y2);
      verts[verts.length-1].push(new p5.Vector(x2, y2));
      x1 = x2;
      y1 = y2;
    }
  }

  console.log(verts);
  paintStripes(verts);
}

function paintStripes(verts) {
  for (y=0; y<verts.length-1; y++) {
    let l = verts[y];
    fill(palette[y % 4]);
    beginShape();
    for (let i=0; i<l.length; i++) {
      vertex(l[i].x, l[i].y);
    }

    let connector = new Line(
      new p5.Vector(l[l.length-1].x, l[l.length-1].y),
      new p5.Vector(verts[y+1][verts[y+1].length-1].x, verts[y+1][verts[y+1].length-1].y));

    if (connector.intersects(
      new p5.Vector(0, 0),
      new p5.Vector(width, 0)) !== undefined) {
      console.log('we got a top intersect');
      console.log('(' + connector.p1.x + ', ' + connector.p1.y + ') -> (' + connector.p2.x + ', ' + connector.p2.y + ')');
      vertex(width, verts[y][verts[y].length-1].y);
      // verts[y][verts[y].length-1].x = width;
      connector.p1.x = width;
    }

    if (connector.intersects(
      new p5.Vector(0, 0),
      new p5.Vector(width, 0)) !== undefined) {
      console.log('we got a top intersect');
      console.log('(' + connector.p1.x + ', ' + connector.p1.y + ') -> (' + connector.p2.x + ', ' + connector.p2.y + ')');
      vertex(verts[y][verts[y].length-1].x, verts[y][verts[y+1].length-1].y);
      // verts[y][verts[y].length-1].x = width;
      connector.p1.y = connector.p2.y;
    }

    l = verts[y+1];
    for (let i=l.length-1; i>=0; i--) {
      vertex(l[i].x, l[i].y);
    }
    endShape();
  }
}

function outOfBounds(x, y) {
  return (x < 0 ||
          x > width ||
          y < 0 ||
          y > height);
}
