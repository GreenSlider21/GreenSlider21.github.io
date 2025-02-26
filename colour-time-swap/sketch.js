// let someTime = 2000;
let waitTime = 2000;
let lastSwitchedTime = 0;
let isWhite = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  // console.log(millis());
  // if (millis() < someTime){
  //   background("white");
  // }
  // else{
  //   background("black");
  // }
  swapStateIfNeeded();
  showBackground();
}  

function swapStateIfNeeded() {
  if(millis() > lastSwitchedTime + waitTime){
    isWhite = !isWhite;
    lastSwitchedTime = millis();
  }
}

function showBackground(){
  if(isWhite){
    background("white");
  }
  else{
    background("black");
  }
}