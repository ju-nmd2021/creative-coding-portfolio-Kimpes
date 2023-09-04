const STACKS = 5;
const HEIGHT = 5;
const WEIGHT = 3;
const VARIETY = 1;

function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES);
  background(255, 255, 255);
}

function drawAllTowers(x, y, count) {
  push();
  translate(x, y);
  for (let i = 0; i < count; i++) {
    drawTower(100 * i, y, 5);
  }
  pop();
}

function drawTower(x, y, h) {
  push();

  translate(x, y);
  stroke(0, 0, 0);
  strokeWeight(WEIGHT);

  let previousHeight = 0;
  for (let j = 0; j < h; j++) {
    let randomHeight = random(30, 70);
    let randomWidth = random(30, 70);
    rect(
      random(-10 * VARIETY, 10 * VARIETY),
      previousHeight - randomHeight,
      randomWidth,
      randomHeight
    );
    previousHeight -= randomHeight;
  }

  pop();
}

function draw() {
  background(255, 255, 255);
  drawAllTowers(100, 200, 5);
  noLoop();
}

function mouseClicked() {
  draw();
}
