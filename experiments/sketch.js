function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255, 255, 255);
}

let ball;
let oscillator;
let volume;
let mousePosition;
let ballList = [];

window.addEventListener("load", () => {
  //variables
  ball1 = new SoundBall(100, 100, "C4");
  ball2 = new SoundBall(200, 100, "G4");
  ballList = [ball1, ball2];
  volume = new Tone.Volume().toDestination();
  oscillator = new Tone.Oscillator(440, "sine").connect(volume);

  oscillator.type = "sawtooth";
  volume.volume.value = -20;
});

//constants
const BALL_SIZE = 50;
const FRICTION = 1;

//classes
class SoundBall {
  constructor(x, y, pitch) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.pitch = pitch;

  }
  draw() {
    ellipse(this.position.x, this.position.y, BALL_SIZE);
  }
  update() {
    //cited from garritt's lecture
    let friction = this.velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(FRICTION);
    friction.div(BALL_SIZE);
    this.acceleration.add(friction);

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  move() {
    if (keyIsDown(32)) {
      this.velocity.add(1, -1);
    }
  }
}




//draw function
function draw() {
  background(255, 255, 255);
  let pitch;
  let ballSound = false;
  
  for (let ball of ballList) {
    ball.update();
    ball.draw();
    mousePosition = {
      position: createVector(mouseX, mouseY)
    };

    if (checkCollision(mousePosition, ball)) {
      ballSound = true;
      pitch = ball.pitch;
    }
  }

  if (ballSound) {
    oscillator.frequency.value = pitch;
    console.log(oscillator.frequency.value)
    volume.volume.value = -20;
  } else {
    volume.volume.value = -100;
  }
  
}

function mouseClicked() {
  oscillator.start();
}

function keyPressed() {
  console.log(keyCode);
}

function checkCollision(object, block) {
  if (object.position.x > block.position.x - 25 && object.position.x < block.position.x + 25 && object.position.y > block.position.y - 25 && object.position.y < block.position.y + 25) {
    return true;
  } else {
    return false;
  }
}