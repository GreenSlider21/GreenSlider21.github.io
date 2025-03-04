// creating variables
let ballX;
let ballY;
let radius = 10;
let ySpeed = 0;
let xSpeed = 0.01;
let gravity = 0.1;
let pegR = 10*2;
let dropperX;
let dropperSpeed = 3;
let dropperWidth = 40;
let dropperHeight = 70;
let moveLeft = false;
let moveRight = false;
let dropBall = false;
let score = 0;
let goalY;
let goalWidth = 10;
let goalHeight = 20;
let sproing;

function setup() {
  createCanvas(windowWidth, windowHeight);
  dropperX = width/2;
  goalY = height - goalHeight/2;
  sproing = loadSound("sproing.m4a");
}

function draw() {
  background(220); 
  plinkoGravity();
  peg();
  collision();
  ballDropper();
  plinkoBall(); 
  scoreZones();
  scorePoints();
  scoreDisplay();
  spaceKeyPressed();
  rKeyPressed();
}

function plinkoGravity() {
  // checks if a ball is being dropped, add gravity to dropped balls, and resets plinko ball values
  if (dropBall === true){
    // constantly adds gravity to the ball
    ySpeed += gravity;
    ballY += ySpeed;

    // makes the ball bounce off the wall
    if (ballX >= width - radius){
      xSpeed = -xSpeed;
    }
  
    if (ballX <= 0 + radius){
      xSpeed = -xSpeed;
    }
  
    // adds a resistance to the speed causing a gradual slow down
    ySpeed = ySpeed * 0.99;
  }

  //resets the balls poition, direction, and speed
  else {
    ballX = dropperX;
    ballY = dropperHeight + radius;
    ySpeed = 0;
    moveLeft = false;
    moveRight = false;
  }
}

function plinkoBall() {
  // creates a plinko ball
  if (dropBall === true){
    circle(ballX, ballY, radius*2);
  }
}

function peg(){
  // creates plinko pegs
  for (let pegX = radius*4; pegX - radius*2 <= width - radius*4; pegX += radius*8){
    for (let pegY = 150; pegY <= height; pegY += radius*16){
      circle(pegX,pegY,pegR);
    }
  }
  for (let pegX = radius*8; pegX - radius*2 <= width - radius*4; pegX += radius*8){
    for (let pegY = 150 + radius*8; pegY <= height; pegY += radius*16){
      circle(pegX,pegY,pegR);
    }
  }
}

function collision(){
  // makes the ball bounce off a peg
  for (let pegX = radius*4; pegX - radius*2 <= width - radius *4; pegX += radius*8){
    for (let pegY = 150; pegY <= height; pegY += radius*16){
      if (dist(ballX, ballY, pegX, pegY) <= pegR){
        ySpeed = -ySpeed;
        fill(random(0, 255), random(0, 255), random(0, 255));
        sproing.play();
        if (pegX - ballX >=0){
          moveLeft = true;
          moveRight = false;
        }
        else{
          moveLeft = false;
          moveRight = true;
        }
      }
    }
  }

  for (let pegX = radius*8; pegX - radius*2 <= width - radius*4; pegX += radius*8){
    for (let pegY = 150 + radius*8; pegY <= height; pegY += radius*16){
      if (dist(ballX, ballY, pegX, pegY) <= pegR){
        ySpeed = -ySpeed;
        fill(random(0, 255), random(0, 255), random(0, 255));
        sproing.play();
        if (pegX - ballX >=0){
          moveLeft = true;
          moveRight = false;
        }
        else{
          moveLeft = false;
          moveRight = true;
        }
      }
      
      
      if (moveLeft === true){
        ballX -= xSpeed;
      }
      if (moveRight === true){
        ballX += xSpeed;
      }
    }
  }
}

function spaceKeyPressed(){
  // lets space key drop balls
  if (key === " "){
    dropBall = true;
  }
}

function rKeyPressed(){
  // lets the r key kill balls
  if (key === "r"){
    dropBall = false;
  }
}

function mouseClicked() {
  // lets clicking drop balls
  dropBall = true;
}

function mouseWheel(event) {
  // lets mouse wheel move dropper
  if (event.delta > 0) {
    dropperX += dropperSpeed;
  } 
  else {
    dropperX -= dropperSpeed;
  }
}

function ballDropper(){
  // drops plinko balls and moves left and right for differnt drop spots
  rectMode(CENTER);
  rect(dropperX,dropperHeight/2,dropperWidth,dropperHeight);
  // a key move left
  if (keyIsDown(65)){
    dropperX -= dropperSpeed;
  }
  
  // d key move right
  if (keyIsDown(68)){
    dropperX += dropperSpeed;
  }
  
  // stops the dropper from going to far right and left
  if (dropperX >= width - dropperWidth/2){
    dropperX -= dropperSpeed;
  }
  
  if (dropperX <= 0 + dropperWidth/2){
    dropperX += dropperSpeed;
  }
}

function scoreZones(){
  // creates differnt score zones
  for (let goalX = 0; goalX <= width; goalX += width/6){
    rect(goalX, goalY, goalWidth, goalHeight);
  }
}

function scorePoints(){
  // scores point depending on the goal landed in and kills the plinko ball
  if (ballY >= height - goalHeight && dropBall === true){
    
    if (ballX >= 0 && ballX <= width/6 ||
        ballX <= width && ballX >= width/6*5){
      dropBall = false;
      score += 1;
    }
    else if (ballX >= width/6 && ballX <= width/6*2 ||
        ballX >= width/6*4 && ballX <= width/6*5){
      dropBall = false;
      score += 3;
    }

    else if (ballX >= width/6*2 && ballX <= width/6*3 ||
        ballX >= width/6*3 && ballX <= width/6*4){
      dropBall = false;
      score += 2;
    } 
  }
}

function scoreDisplay(){
  // Displays the curent score
  textSize(40);
  textFont("playbill");
  text(score, 100, 100);
}