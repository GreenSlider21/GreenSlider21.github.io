// Local Storage Demo

let numberofClicks = 0;
let highestClickEver = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // is there an old highscore?
  if (getItem("highClick")) {
    highestClickEver = getItem("highClick");
  }
}

function draw() {
  background(220);
  displayClicks();
  displayHighest();
}

function mousePressed() {
  numberofClicks++;
  if (numberofClicks > highestClickEver) {
    highestClickEver = numberofClicks;
    storeItem("highClick", highestClickEver);
  }
}

function displayClicks() {
  fill("black");
  textSize(50);
  textAlign(CENTER, CENTER);
  text(numberofClicks, width/2, height/2);
}

function displayHighest() {
  fill("green");
  textSize(50);
  textAlign(CENTER, CENTER);
  text(highestClickEver, width/2, height/2 - 200);
}