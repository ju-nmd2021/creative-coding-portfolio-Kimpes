const SQUARE_COUNT = 14;
const INTENSITY = 2;
const WEIGHT = 10;
const RATE = 1;

function setup() {
  createCanvas(innerWidth, innerHeight);
  blendMode(MULTIPLY);
  angleMode(DEGREES);
  rectMode(CENTER);
  noLoop();
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
  rotate(random(-2, 2) * intensity);
  rect(0, 0, size);
  pop();

  push();
  stroke(0, 255, 0);
  translate(random(-2, 2) * intensity, random(-2, 2) * intensity);
  rotate(random(-2, 2) * intensity);
  rect(0, 0, size);
  pop();

  push();
  stroke(0, 100, 255);
  translate(random(-2, 2) * intensity, random(-2, 2) * intensity);
  rotate(random(-2, 2) * intensity);
  rect(0, 0, size);
  pop();

  pop();
}

function draw() {
  push();
  blendMode(BLEND);
  background(255, 255, 255);
  pop();
  for (let i = 2; i <= SQUARE_COUNT; i++) {
    push();
    for (let j = 2; j <= SQUARE_COUNT; j++) {
      if (random(100) < RATE) {
        drawSplitRect(50 * j, 50 * i, 50, 0, INTENSITY);
      } else {
        drawSplitRect(50 * j, 50 * i, 50, 0, 0);
      }
    }
    pop();
  }
}

function mouseClicked() {
  draw();
}
