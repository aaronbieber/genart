var angle = 0;
var points = [];
var lines = [];
const projection = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
];

const scale = [
  [400, 0, 0],
  [0, 400, 0],
  [0, 0, 400]
]

function setup() {
  let canvas = makeCanvas();
  stroke(255);

  points[0] = createVector(-0.5, -0.5, -0.5);
  points[1] = createVector(0.5, -0.5, -0.5);
  points[2] = createVector(0.5, -0.5, 0.5);
  points[3] = createVector(-0.5, -0.5, 0.5);
  points[4] = createVector(-0.5, 0.5, -0.5);
  points[5] = createVector(0.5, 0.5, -0.5);
  points[6] = createVector(0.5, 0.5, 0.5);
  points[7] = createVector(-0.5, 0.5, 0.5);

  angle = QUARTER_PI;
}

var angleInc = 0;
function draw() {
  background(0);
  translate(width / 2, height / 2);
  lines = [];

  const rotationZ = [
    [cos(angle), -sin(angle), 0],
    [sin(angle), cos(angle), 0],
    [0, 0, 1]
  ];

  const rotationX = [
    [1, 0, 0],
    [0, cos(angle), -sin(angle)],
    [0, sin(angle), cos(angle)]
  ];

  const rotationY = [
    [cos(angle), 0, sin(angle)],
    [0, 1, 0],
    [-sin(angle), 0, cos(angle)]
  ];

  const camProjection = [
    [1, 0, 0],
    [0, cos(radians(20)), -sin(radians(20))],
    [0, sin(radians(20)), cos(radians(20))]
  ];

  let unProjected = [];
  let projected = [];

  for (let i = 0; i < points.length; i++) {
    let rotated = matmul(rotationY, points[i]);
    rotated = matmul(scale, rotated);
    unProjected[i] = rotated;
    rotated = matmul(camProjection, rotated);
    let projected2d = matmul(projection, rotated);
    projected[i] = projected2d;
  }

  // Connecting
  for (let i = 0; i < 4; i++) {
    let normalLeft = normal3(
      unProjected[(i+3)%4],
      unProjected[i],
      unProjected[((i+3)%4)+4]
    );
    normalLeft.normalize();

    let normalRight = normal3(
      unProjected[i],
      unProjected[(i+1)%4],
      unProjected[i+4]
    );
    normalRight.normalize();

    connect(i, (i + 1) % 4, projected);
    if (normalRight.z > 0) connect(i + 4, ((i + 1) % 4) + 4, projected);
    if (!(normalLeft.z < 0 && normalRight.z < 0)) connect(i, i + 4, projected);
  }

  angle = HALF_PI * sin(angleInc - (0.75 * PI)) + 0.75 * PI;
  angleInc += 0.02;

  let segment = [createVector(-500, 0), createVector(500, 0)];
  strokeWeight(1);
  line(segment[0].x, segment[0].y, segment[1].x, segment[1].y);
  stroke(255);
  console.log(lines);
  for (let i=0; i<lines.length; i++) {
    strokeWeight(1);
    line(lines[i][0].x, lines[i][0].y, lines[i][1].x, lines[i][1].y);
    let int = intersection(segment[0], segment[1], lines[i][0], lines[i][1])
    console.log(int);
    if (int !== undefined) {
      strokeWeight(10);
      point(int.x, int.y);
    }
  }
}

function normal3(v0, v1, v2) {
  return p5.Vector.sub(v1, v0).cross(p5.Vector.sub(v2, v0));
}

function connect(i, j, points) {
  const a = points[i];
  const b = points[j];
  lines.push([a, b]);
  // strokeWeight(1);
  // stroke(255);
  // line(a.x, a.y, b.x, b.y);
}

// Daniel Shiffman
// http://youtube.com/thecodingtrain
// http://codingtra.in
// Javascript transcription: Chuck England

// Coding Challenge #112: 3D Rendering with Rotation and Projection
// https://youtu.be/p4Iz0XJY-Qk

// Matrix Multiplication
// https://youtu.be/tzsgS19RRc8

function vecToMatrix(v) {
  let m = [];
  for (let i = 0; i < 3; i++) {
    m[i] = [];
  }
  m[0][0] = v.x;
  m[1][0] = v.y;
  m[2][0] = v.z;
  return m;
}

function matrixToVec(m) {
  return createVector(m[0][0], m[1][0], m.length > 2 ? m[2][0] : 0);
}

function logMatrix(m) {
  const cols = m[0].length;
  const rows = m.length;
  console.log(rows + 'x' + cols);
  console.log('----------------');
  let s = '';
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      s += m[i][j] + ' ';
    }
    console.log(s);
  }
  console.log();
}

function matmulvec(a, vec) {
  let m = vecToMatrix(vec);
  let r = matmul(a, m);
  return matrixToVec(r);
}

function matmul(a, b) {
  if (b instanceof p5.Vector) {
    return matmulvec(a, b);
  }

  let colsA = a[0].length;
  let rowsA = a.length;
  let colsB = b[0].length;
  let rowsB = b.length;

  if (colsA !== rowsB) {
    console.error('Columns of A must match rows of B');
    return null;
  }

  result = [];
  for (let j = 0; j < rowsA; j++) {
    result[j] = [];
    for (let i = 0; i < colsB; i++) {
      let sum = 0;
      for (let n = 0; n < colsA; n++) {
        sum += a[j][n] * b[n][i];
      }
      result[j][i] = sum;
    }
  }
  return result;
}

// 1FpGLLjZSZMx6k
// https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function

// interface Point2D {
//   x: number;
//   y: number;
// }

function intersection(from1, to1, from2, to2) {
  const dX = to1.x - from1.x;
  const dY = to1.y - from1.y;

  const determinant = dX * (to2.y - from2.y) - (to2.x - from2.x) * dY;
  if (determinant === 0) return undefined; // parallel lines

  const lambda = ((to2.y - from2.y) * (to2.x - from1.x) + (from2.x - to2.x) * (to2.y - from1.y)) / determinant;
  const gamma = ((from1.y - to1.y) * (to2.x - from1.x) + dX * (to2.y - from1.y)) / determinant;

  // check if there is an intersection
  if (!(0 <= lambda && lambda <= 1) || !(0 <= gamma && gamma <= 1)) return undefined;

  return {
    x: from1.x + lambda * dX,
    y: from1.y + lambda * dY,
  };
}
