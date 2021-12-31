var left_x,
    right_x,
    top_y,
    bottom_y,
    resolution,
    num_columns,
    num_rows,
    grid,
    points,
    palettes,
    palette;

function preload() {
  palettes = loadJSON(baseURL + '/1000.json');
}

function setup() {
  var canvas = makeCanvas();
  palette = randomElement(palettes);
  background(palette[0]);

  left_x = int(width - width/2);
  right_x = int(width + width/2);
  top_y = int(height - height/2);
  bottom_y = int(height + height/2);

  let point_resolution = int(width * 0.005);
  let points_x = int(width * 2 / point_resolution);
  let points_y = int(height * 2 / point_resolution);

  points = [];
  for (let x=0; x<points_x; x++) {
    points[x] = [];
    for (let y=0; y<points_y; y++) {
      points[x][y] = {
        x: x * point_resolution + random(point_resolution/2),
        y: y * point_resolution + random(point_resolution/2)
      }
    }
  }

  resolution = int(width * 0.01);
  num_columns = int(width * 2 / resolution);
  num_rows = int(height * 2) / resolution;

  grid = [];
  for (let x=0; x<num_columns; x++) {
    grid[x] = [];
    for (let y=0; y<num_rows; y++) {
      grid[x][y] = map(noise(x * 0.08, y * 0.08),
                       0, 1, 0, TWO_PI);
    }
  }

  noFill();
  strokeWeight(1);

  let steps = 20;
  let step_length = 10;
  for (let x=0; x<points.length; x++) {
    for (let y=0; y<points[x].length; y++) {
      for (let s=0; s<steps; s++) {
        if (s <= steps/2) {
          stroke(mapColor(palette[1], palette[2], map(s, 0, steps/2, 0, 1)));
        } else {
          stroke(mapColor(palette[2], palette[3], map(s, steps/2, steps, 0, 1)));
        }

        let x1 = points[x][y].x - width/2;
        let y1 = points[x][y].y - height/2;

        let x_offset = points[x][y].x;
        let y_offset = points[x][y].y;
        let column_index = int(x_offset / resolution);
        let row_index = int(y_offset / resolution);

        if (column_index < 0 || column_index > grid.length-1) continue;
        if (row_index < 0 || row_index > grid[column_index].length-1) continue;

        let angle = grid[column_index][row_index];
        let x_step = step_length * cos(angle);
        let y_step = step_length * sin(angle);

        points[x][y].x += x_step;
        points[x][y].y += y_step;

        line(x1, y1,
             points[x][y].x - width/2,
             points[x][y].y - height/2);
      }
    }
  }
}
