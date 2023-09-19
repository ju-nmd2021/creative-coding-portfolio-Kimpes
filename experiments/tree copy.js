const SQUARE_COUNT = 14;
const INTENSITY = 2;
const WEIGHT = 10;
const RATE = 1;

let branchList = [];
const fieldSize = 50;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const divider = 4;
let field;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255, 255, 255);
  field = generateField();
}

class TreeBranch {
  constructor(x, y, canSplit, lifespan, maxForce, maxSpeed) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), 0);
    this.acceleration = 0;
    this.lifespan = lifespan;
    this.canSplit = canSplit;
    this.maxForce = maxForce;
    this.maxSpeed = maxSpeed;
  }
  draw() {
    push();
    strokeWeight(0);
    fill(100, 150, 10);
    ellipse(this.position.x, this.position.y, 2);
    pop();
  }
  multiply() {
    let newBranch;
    if (random(0, 100) < 10 - branchList.length) {
      newBranch = new TreeBranch(this.position.x, this.position.y, true, this.lifespan + random(-50, 50));
    }else{
      newBranch = new TreeBranch(this.position.x, this.position.y, false, this.lifespan + random(-50, 200));
    }
    branchList.push(newBranch);
  }
  update() {
    //cited from Garritt's lecture on vectors and complexity
    if (this.position.x < 0 || this.position.x > innerWidth) {
      this.velocity.x *= -1;
    }

    if (this.position.y < 0 || this.position.y > innerWidth) {
      this.velocity.y *= -1;
    }

    if (random(0, this.lifespan) > this.lifespan - 5 && this.canSplit) {
      this.multiply();
    }

    this.acceleration = p5.Vector.sub(mouse, this.position);
    this.acceleration.normalize();
    this.acceleration.mult(0.05);
    this.acceleration.y *= random(0, 1);
    this.acceleration.x *= random(-1, 1);
    if (this.acceleration.y > 0) {
      this.acceleration.y *= -1;
    }
    this.velocity.add(this.acceleration);
    this.velocity.limit(1);
    this.position.add(this.velocity);
    this.lifespan--;
  }
  isDead() {
    if (this.lifespan <= 0){
      return true;
    }
  }
}

let mouse = createVector(mouseX, mouseY);
function draw() {
  mouse = createVector(mouseX, mouseY);

  for (let branch of branchList) {
    if (!branch.isDead()){
      branch.draw();
      branch.update();
    }
  }
}


// Functions -----------------------------
function mouseClicked() {
  startTree(mouseX, mouseY, true, random(100, 400), 0.1, 4);
}

function startTree(x, y, canSplit, lifespan, maxForce, maxSpeed) {
  let newBranch = new TreeBranch(x, y, canSplit, lifespan, maxForce, maxSpeed);
  branchList.push(newBranch);
}

//cited from garritt's lecture on flow fields
function generateField() {
  let field = [];
  noiseSeed(Math.random() * 100);
  for (let x = 0; x < maxCols; x++) {
    field.push([]);
    for (let y = 0; y < maxRows; y++) {
      const value = noise(x / divider, y / divider) * Math.PI * 2;
      field[x].push(p5.Vector.fromAngle(value));
    }
  }
  return field;
}