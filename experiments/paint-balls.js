function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255, 255, 255);
}

let mouse = createVector(mouseX, mouseY);
let paintBalls = [];
const BALL_SIZE = 50;

class PaintBall {
  constructor(position) {
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
    this.position = position;
  }
  draw() {
    push();
    strokeWeight(0);
    fill(this.r, this.g, this.b);
    ellipse(this.position.x, this.position.y, BALL_SIZE);
    pop();
  }
}

class Ball {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(10, 10);
    this.acceleration = 0;
  }

  draw() {
    ellipse(this.position.x, this.position.y, BALL_SIZE);
  }

  update() {
    //cited from Garritt's lecture on vectors and complexity
    if (this.position.x < 0 || this.position.x > innerWidth) {
      this.velocity.x *= -1;
    }

    if (this.position.y < 0 || this.position.y > innerWidth) {
      this.velocity.y *= -1;
    }

    this.acceleration = p5.Vector.sub(mouse, this.position);
    this.acceleration.normalize();
    this.acceleration.mult(0.5);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  paint() {
    let paintPosition = this.position.copy();
    let newPaintBall = new PaintBall(paintPosition);
    paintBalls.push(newPaintBall);
  }
}

let ball1 = new Ball(100, 100);
let ball2 = new Ball(500, 300);
let ball3 = new Ball(200, 400);
let ballList = [ball1, ball2, ball3];

function draw() {
  background(255, 255, 255, 50);
  mouse = createVector(mouseX, mouseY);
  for (let ball of ballList) {
    ball.draw();
    ball.update();
  }
  for (let paintBall of paintBalls) {
    paintBall.draw();
  }
}

function mouseClicked() {
  for (let ball of ballList) {
    ball.paint();
  }
}
