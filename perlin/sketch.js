// Perlin
// moving a circle

let time = 0;
// let yTime = 1000;
let x;
let y;
let deltaTime = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  fill("black");
  x = noise(time) * width;
  y = noise(time + 1) * height;
  circle(x, y, 50);

  time += deltaTime;
}
