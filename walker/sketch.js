// Walker OOP Demo

class Walker {
  constructor(x, y, colour) {
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.speed = 10;
    this.radius = 5;
  }

  display() {
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.radius *2);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      // up
      this.y -= this.speed;
    }
    else if (choice < 50) {
      // down
      this.y += this.speed;
    }
    else if (choice < 75) {
      // left
      this.x -= this.speed;
    }
    else {
      // right
      this.x += this.speed;
    }
  }
}

// let luke;
// let liam;
let theWalkers = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  // luke = new Walker(width/2, height/2, "red");
  // liam = new Walker(width/2, height/2, "blue");
  spawnWalker(width/2, height/2);
}

function draw() {
  // luke.move();
  // liam.move();

  // luke.display();
  // liam.display();
  for (let myWalker of theWalkers) {
    myWalker.move();
    myWalker.display();
  }
}

function mousePressed() {
  spawnWalker(width/2, height/2);
}

function spawnWalker(x, y) {
  let r = random(255);
  let g = random(255);
  let b = random(255);
  let someColour = color(r, g, b);
  let someWalker = new Walker(x, y, someColour);
  theWalkers.push(someWalker);
}