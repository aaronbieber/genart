function setup() {
  var canvas = createCanvas(1000, 1000, WEBGL);
  //size(1000, 1000, P3D);

  paint();
}

function mouseClicked() {
  paint();
}

function paint() {
  push();

  noiseSeed(new Date().getTime());
  background(0);
  stroke(255);

  var fov = PI/3.0;
  var cameraZ = (height / 2.0) / tan(fov / 2.0);
  console.log("fov " + fov + ", cameraZ " + cameraZ);
  perspective(fov, float(width)/float(height), cameraZ / 10.0, cameraZ * 10.0);
  translate(-750, -200, -200);
  rotateX(PI/3);

  fill(0);
  stroke(0);
  beginShape();
  vertex(0, 0, 0);
  vertex(1500, 0, 0);
  vertex(1500, 0, -500);
  vertex(0, 0, -500);
  endShape();

  for (var i=0; i<200; i++) {
    strokeWeight(random(5));
    stroke(255);
    point(random(1500), -500, random(500));
  }

  // grid gradient colors
  // 218, 28, 240
  // 66, 90, 240

  strokeWeight(1);
  var noiseScale = 0.01,
      noiseVal1, noiseVal2, noiseVal3, z1, z2, z3,
      r, g, b;
  for (var x = 0; x <= 1500; x += 10) {
    for (var y = 0; y <= 1000; y += 10) {
      r = floor(constrain(map(y, 0, 1000, 218, 66), 66, 218));
      g = floor(constrain(map(y, 0, 1000, 28, 90), 28, 90));
      b = 240;
      stroke(color(r, g, b));

      noiseVal1 = noise(x * noiseScale, y * noiseScale);
      noiseVal2 = noise((x + 10) * noiseScale, y * noiseScale);
      noiseVal3 = noise(x * noiseScale, (y + 10) * noiseScale);
      z1 = map(noiseVal1, 0, 1, 0, 150);
      z2 = map(noiseVal2, 0, 1, 0, 150);
      z3 = map(noiseVal3, 0, 1, 0, 150);
      line(x, y, z1, x + 10, y, z2);
      line(x, y, z1, x, y + 10, z3);
    }
  }

  noStroke();
  translate(750, -250, 450);
  directionalLight(240, 41, 165, 0, 0, -1);
  translate(0, 400, -500);
  pointLight(240, 47, 123, 0, 0, 0);
  translate(0, -400, 50);
  fill(255);
  sphere(200);

  pop();
}
