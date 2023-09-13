function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255, 255, 255);
}

let mouse = createVector(mouseX, mouseY);

class Body {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(10, 10);
    this.acceleration;
  }

  draw() {
    ellipse(this.position.x, this.position.y, 50);
  }

  update() {
    //cited from Garritt's lecture on vectors and complexity
    this.acceleration = p5.Vector.sub(mouse, this.position);
    this.acceleration.normalize();
    this.acceleration.mult(0.5);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }
}

let testBall = new Body(100, 100);
let ballList = [testBall];

function draw() {
  ellipse(50, 50, 50);
  for (let ball of ballList) {
    mouse = createVector(mouseX, mouseY);
    ball.draw();
    ball.update();
  }

  acceleration = p5.Vector.sub(mouse, position);
  acceleration.normalize();
  acceleration.mult(0.5);
  // Add the speed to the ball
  velocity.add(acceleration);
  velocity.limit(10);
  position.add(velocity);
}

function mouseClicked() {
  let x = mouseX;
}
