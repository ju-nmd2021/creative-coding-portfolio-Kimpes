let branchList = [];
const fieldSize = 30;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const divider = 4;
let field;
let mouse = createVector(mouseX, mouseY);
const SHARP_CURVES = 1;
const LINE_WIGGLE = 2;
const LINE_SIZE = 2;
const LINE_GAP = 10;
const LINE_GAP_VARIATION = 5;
const MAX_LIFE = 200;
const SPLIT_POTENTIAL = 5;
const STARTING_TREES_CAN_SPLIT = false;
const LINE_SIZE_VARIATION = 0;
const STRAY_LINE_PROBABILITY = 0;

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0, 0, 0);
  colorMode(HSB, 100);
  field = generateField();
  for (let i = 10; i < innerWidth; i += LINE_GAP) {
    for (let j = 10; j < innerHeight; j += LINE_GAP) {
      let color;
      if (random(0, 100) < STRAY_LINE_PROBABILITY){
        color = [random(15, 100), random(80, 100), random(60, 100)];
        startTree(i + random(-LINE_GAP_VARIATION, LINE_GAP_VARIATION), j + random(-LINE_GAP_VARIATION, LINE_GAP_VARIATION), STARTING_TREES_CAN_SPLIT, random(50, MAX_LIFE), SHARP_CURVES, 100, color);
      }
        color = [random(0, 15), random(80, 100), random(60, 100)];
        startTree(i + random(-LINE_GAP_VARIATION, LINE_GAP_VARIATION), j + random(-LINE_GAP_VARIATION, LINE_GAP_VARIATION), STARTING_TREES_CAN_SPLIT, random(50, MAX_LIFE), SHARP_CURVES, 100, color);
    }
  }
}

// Branch Class --------------------------
class TreeBranch {
  constructor(x, y, canSplit, lifespan, maxForce, maxSpeed, color) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.lifespan = lifespan;
    this.canSplit = canSplit;
    this.maxForce = maxForce;
    this.maxSpeed = maxSpeed;
    this.color = color;
    this.splitPotential = SPLIT_POTENTIAL;
  }
  draw() {
    push();
    strokeWeight(0);
    fill(this.color[0], this.color[1], this.color[2]);
    ellipse(this.position.x + random(-LINE_WIGGLE, LINE_WIGGLE), this.position.y  + random(-LINE_WIGGLE, LINE_WIGGLE), LINE_SIZE + random(-LINE_SIZE_VARIATION, LINE_SIZE_VARIATION));
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
      let newColour = [this.color[0] + random(-2, 2), this.color[1] + random(-40, 40), this.color[2] + random(-40, 40)];
      newBranch = new TreeBranch(this.position.x, this.position.y, true, this.lifespan + random(0, 500), 0.1, 4, newColour);
    }else{
      let newColour = [this.color[0] + random(-2, 2), this.color[1] + random(-40, 40), this.color[2] + random(-40, 40)];
      newBranch = new TreeBranch(this.position.x, this.position.y, false, this.lifespan + random(-50, 200), 0.1, 4, newColour);
    }
    branchList.push(newBranch);
  }
  update() {
    if (random(0, this.lifespan) > this.lifespan - 10 && this.canSplit) {
      if (this.splitPotential > 0) {
        this.multiply();
        this.splitPotential--;
      }
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
  let color = [random(0, 100), random(0, 100), random(0, 100)];
  startTree(mouseX, mouseY, true, random(50, 1000), 0.1, 4, color);
}

function startTree(x, y, canSplit, lifespan, maxForce, maxSpeed, color) {
  let newBranch = new TreeBranch(x, y, canSplit, lifespan, maxForce, maxSpeed, color);
  branchList.push(newBranch);
}

//cited from garritt's lecture on flow fields
function generateField() {
  let field = [];
  noiseSeed(Math.random() * 100);
  for (let x = 0; x < maxCols; x++) {
    field.push([]);
    for (let y = 0; y < maxRows; y++) {
      const value = noise(x / divider, y / divider) * Math.PI * 2 + (Math.PI / 2);
      field[x].push(p5.Vector.fromAngle(value));
    }
  }
  return field;
}