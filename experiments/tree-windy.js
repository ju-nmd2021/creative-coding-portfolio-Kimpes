let branchList = [];
const fieldSize = 50;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const divider = 4;
let field;
let mouse = createVector(mouseX, mouseY);

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255, 255, 255);
  field = generateField();
}

// Branch Class --------------------------
class TreeBranch {
  constructor(x, y, canSplit, lifespan, maxForce, maxSpeed) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), 0);
    this.acceleration = createVector(0, 0);
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
  follow(desiredDirection) {
    desiredDirection = desiredDirection.copy();
    desiredDirection.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desiredDirection, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }
  applyForce(force) {
    this.acceleration.add(force);
  }
  checkBorders() {
    if (this.position.x <= 0) {
      this.position.x = innerWidth;
    } else if (this.position.x >= innerWidth) {
      this.position.x = 0;
    }
    if (this.position.y <= 0) {
      this.position.y = innerHeight;
    } else if (this.position.y >= innerHeight) {
      this.position.y = 0;
    }
  }
  multiply() {
    let newBranch;
    if (random(0, 100) < 10 - branchList.length) {
      newBranch = new TreeBranch(this.position.x, this.position.y, true, this.lifespan + random(-50, 50), 0.1, 4);
    }else{
      newBranch = new TreeBranch(this.position.x, this.position.y, false, this.lifespan + random(-50, 200), 0.1, 4);
    }
    branchList.push(newBranch);
  }
  update() {
    if (random(0, this.lifespan) > this.lifespan - 5 && this.canSplit) {
      this.multiply();
    }
    
    if (this.acceleration.y > 0) {
      this.acceleration.y *= -1;
    }
    this.velocity.add(this.acceleration);
    this.velocity.limit(1);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan--;
  }
  isDead() {
    if (this.lifespan <= 0){
      return true;
    }
  }
}


// Draw Function ---------------------------
function draw() {
  mouse = createVector(mouseX, mouseY);

  for (let id in branchList) {
    let branch = branchList[id];
    if (!branch.isDead()){
      branch.checkBorders();
      const x = Math.floor(branch.position.x / fieldSize);
      const y = Math.floor(branch.position.y / fieldSize);
      const desiredDirection = field[x][y];
      branch.follow(desiredDirection);
      branch.draw();
      branch.update();
    } else {
      branchList.splice(id, 1);
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