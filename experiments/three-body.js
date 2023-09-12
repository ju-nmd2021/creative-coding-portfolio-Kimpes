function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255, 255, 255);
}

class Body {
  constructor(x, y, v1, v2, a1, a2) {
    this.position = createVector(x, y);
    this.velocity = createVector(v1, v2);
    this.acceleration = createVector(a1, a2);
  }

  drawBall() {
    ellipse(this.position.x, this.position.y);
  }
}

let testBall = new Body(100, 100, 0, 0, 0, 0);
let ballList = [testBall];

function draw() {
  ellipse(50, 50, 50);
  testBall.drawBall();
}

function mouseClicked() {
  let x = mouseX;
}
