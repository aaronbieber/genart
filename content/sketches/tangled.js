var resolution,
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

  let point_resolution = int(width * 0.005);
  let points_x = int(width * 2 / point_resolution);
  let points_y = int(height * 2 / point_resolution);

  let qf = new QuadForest([0, 0, width*2, height*2], 20);
  qf.add_circles();

  resolution = int(width * 0.01);
  num_columns = int(width * 2 / resolution);
  num_rows = int(height * 2) / resolution;

  grid = [];
  for (let x=0; x<num_columns; x++) {
    grid[x] = [];
    for (let y=0; y<num_rows; y++) {
      grid[x][y] = map(noise(x * 0.05, y * 0.05),
                       0, 1, 0, TWO_PI);
    }
  }

  noFill();
  strokeWeight(1);

  let steps = 30;
  let step_length = 10;
  for (let c of qf.circles) {
    let x1 = c.x;
    let y1 = c.y;

    for (let s=0; s<steps; s++) {
      if (s <= steps/2) {
        stroke(mapColor(palette[1], palette[2], map(s, 0, steps/2, 0, 1)));
      } else {
        stroke(mapColor(palette[2], palette[3], map(s, steps/2, steps, 0, 1)));
      }
      strokeWeight(2);

      let column_index = int(x1 / resolution);
      let row_index = int(y1 / resolution);

      if (column_index < 0 || column_index > grid.length-1) continue;
      if (row_index < 0 || row_index > grid[column_index].length-1) continue;

      let angle = grid[column_index][row_index];
      let x_step = step_length * cos(angle);
      let y_step = step_length * sin(angle);

      let x2 = x1 + x_step;
      let y2 = y1 + y_step;

      line(x1 - width/2, y1 - height/2,
           x2 - width/2, y2 - height/2);
      x1 = x2;
      y1 = y2;
    }

    if (floor(random(1000)) == 1) {
      let base = random(width*2) - width;
      let thickness = random(40) + 10;
      strokeWeight(thickness);
      stroke(palette[4]);
      line(base, -thickness, base+width, height+thickness);
    }
  }
}

// Adapted from https://github.com/jdobres/circle-packing/
// Modified to remove all drawing, to synchronously pack circles until
// the max tries for every radius is exhausted, and allow bounds larger
// than the canvas size.
class QuadForest {
  static calculate_tree_sizes(max_radius) {
    let max_radii = [max_radius]
    let length = floor(Math.log2(max_radius))
    for (let i = 0; i < length; ++i) {
      max_radii.push(max_radii[max_radii.length - 1] / 2)
    }
    return(max_radii)
  }

  constructor(bounds, max_radius) {
    this.max_radius = max_radius
    this.radius = max_radius
    this.max_tries = 2000
    this.circles = [];
    this.bounds = bounds;

    let max_radii = QuadForest.calculate_tree_sizes(max_radius)
    this.trees = []
    for (let r of max_radii) {
      this.trees.push(new QuadTree(bounds, r))
    }
    this.tree_index = 0
  }

  collision_check(new_circle) {
    // if it returns TRUE, we have a collision and the circle is not valid

    for (let f of this.trees) {
      let max_bounds = QuadTree.max_bounds_for_circle(new_circle, f.max_radius)
      if (f.check_circle_placement(new_circle, max_bounds)) {
        return true
      }
    }

    return(false)
  }

  update_tree_index(new_radius) {
    if (new_radius < this.trees[this.tree_index].min_radius && this.tree_index < this.trees.length - 1) {
      ++this.tree_index
    }
  }

  insert_object(new_object) {
    this.trees[this.tree_index].insertObject(new_object)
  }

  add_circles() {
    console.log('Packing circles...');
    while (this.radius > 1) {
      for (let i = 0; i < this.max_tries; ++i) {
        let new_circle = {x: random(this.bounds[2]), y: random(this.bounds[3]), radius: this.radius, startFrame: frameCount, lastSize: 0}

        if (!this.collision_check(new_circle)) {
          this.insert_object(new_circle)
          // obj.push(new_circle)
          this.circles.push(new_circle);
          i = -1;
          continue;
        }
      }

      this.radius *= 0.99
      this.radius = this.radius < 0.5 ? 0.5 : this.radius
      this.update_tree_index(this.radius)
    }
    console.log('Done.');
  }
}

class QuadTree {
  static max_bounds_for_circle(the_circle, max_radius) {
    let extent = max_radius + the_circle.radius

    let x0 = the_circle.x - extent,
        x1 = the_circle.x + extent,
        y0 = the_circle.y - extent,
        y1 = the_circle.y + extent

    return([x0, y0, x1, y1])
  }

  constructor(bounds, max_radius) {
    this.bounds = bounds // bounds = [x0, y0, x1, y1]
    this.kids = []
    this.obj = null

    // specific to circle packing
    this.max_radius = max_radius
    this.min_radius = max_radius / 2
    this.radius = this.max_radius
  }

  insertObject(obj) {
    if (this.obj) {
      // if this cell has an object, split the cell into a new sub-quad
      let temp_obj = this.obj
      this.obj = null
      this.split()
      this.insertObject(temp_obj)
      this.insertObject(obj)
    } else if (!this.obj && this.isLeaf) {
      this.obj = obj
    } else {
      // find correct leaf in empty quad
      for (let k of this.kids) {
        if (k.hitTest(obj.x, obj.y)) {
          k.insertObject(obj)
          return
        }
      }
    }
  }

  split() {
    let x0 = this.bounds[0], x1 = this.bounds[2], y0 = this.bounds[1], y1 = this.bounds[3]
    let x_c = (x0 + x1) / 2
    let y_c = (y0 + y1) / 2

    this.kids.push(new QuadTree([x0, y0, x_c, y_c]))
    this.kids.push(new QuadTree([x_c, y0, x1, y_c]))
    this.kids.push(new QuadTree([x0, y_c, x_c, y1]))
    this.kids.push(new QuadTree([x_c, y_c, x1, y1]))
  }

  hitTest(x, y) {
    if (x < this.bounds[0]) { return false }
    if (x >= this.bounds[2]) { return false }
    if (y < this.bounds[1]) { return false }
    if (y >= this.bounds[3]) { return false }
    return(true)
  }

  intersectsRect(other_rect) {
    let does_intersect = !(other_rect[0] > this.bounds[2] ||
                           other_rect[2] < this.bounds[0] ||
                           other_rect[1] > this.bounds[3] ||
                           other_rect[3] < this.bounds[1])

    return(does_intersect)
  }

  check_circle_placement(the_circle, maximum_bounds) {
    // If there is a leaf with no object, there can be no collision: return false
    // check if maximim_bounds intersects this quad
    // - if no, return false
    // - if yes and isLeaf and has object, test circle and return overlap result (true for overlap, false for safe)
    // - if yes and not leaf, recurse through descendants
    // if return value is ever true, break immediately and return, ending search

    if (this.isLeaf && !this.obj) {
      return false
    }

    if (!this.intersectsRect(maximum_bounds)) {
      return false
    }

    if (this.isLeaf && this.obj) {
      return dist(this.obj.x, this.obj.y, the_circle.x, the_circle.y) < this.obj.radius + the_circle.radius + 1
    }

    if (!this.isLeaf) {
      for (let k of this.kids) {
        if (k.check_circle_placement(the_circle, maximum_bounds)) {
          return true
	}
      }
    }

    return false
  }

  get isLeaf() {
    return this.kids.length == 0
  }
}
