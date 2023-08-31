const SQUARE_COUNT = 14;
const INTENSITY = 8;
const WEIGHT = 10;

function setup() {
  createCanvas(innerWidth, innerHeight);
  blendMode(MULTIPLY);
  angleMode(DEGREES);
  background(255, 255, 255);
}

function drawSplitRect(x, y, size, r, intensity) {
  push();

  translate(x, y);
  rotate(r);
  stroke(0, 0, 255);
  strokeWeight(WEIGHT);

  push();
  stroke(255, 0, 0);
  translate(random(-2, 2) * intensity, random(-2, 2) * intensity);
  rotate(intensity);
  rect(0, 0, size);
  pop();

  push();
  stroke(0, 255, 0);
  translate(random(-2, 2) * intensity, random(-2, 2) * intensity);
  rotate(-intensity);
  rect(0, 0, size);
  pop();

  pop();
}

function draw() {
  push();
  blendMode(BLEND);
  background(255, 255, 255);
  pop();
  for (let i = 0; i <= SQUARE_COUNT; i++) {
    push();
    translate(64 * i, -i * 10);
    for (let j = 0; j <= SQUARE_COUNT; j++) {
      if (random(100) < 0.2) {
        drawSplitRect(50 * j, 50 * j, 60, 13, INTENSITY);
      } else {
        drawSplitRect(50 * j, 50 * j, 60, 13, 0);
      }
    }
    pop();
  }
}
