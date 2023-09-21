let mouse;
let paintMode = -1;
let paintBalls = [];
const BALL_SIZE = 50;
let ballList = [];


function setup() {
  mouse = createVector(mouseX, mouseY);
  createCanvas(innerWidth, innerHeight);
  background(255, 255, 255);
  
  let ball1 = new Ball(100, 100);
  ballList.push(ball1);
}

class PaintBall {
  constructor(position, color) {
    this.color = color;
    this.position = position;
  }
  draw() {
    push();
    strokeWeight(0);
    fill(this.color[0], this.color[1], this.color[2]);
    ellipse(this.position.x, this.position.y, BALL_SIZE);
    pop();
  }
}

class Ball {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(10, 10);
    this.acceleration = 0;
    this.color = [random(0, 255), random(0, 255), random(0, 255)];
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
    for (let channel in this.color) {
      this.color[channel] += random(0, 30);
      if (this.color[channel] < 0) {
        console.log("reset");
        this.color[channel] = 255;
      } else if (this.color[channel] > 255) {
        this.color[channel] = 0;
      }
      console.log(this.color[channel]);
    }

    let paintColor = this.color.slice();
    let paintPosition = this.position.copy();
    let newPaintBall = new PaintBall(paintPosition, paintColor);
    paintBalls.push(newPaintBall);
  }
}

function draw() {
  background(255, 255, 255, 50);
  mouse = createVector(mouseX, mouseY);
  if (paintMode == 1) {
    for (let ball of ballList) {
      ball.paint();
    }
  }
  for (let paintBall of paintBalls) {
    paintBall.draw();
  }
  for (let ball of ballList) {
    ball.draw();
    ball.update();
  }
  
}
function mouseClicked() {
  paintMode *= -1;
}
