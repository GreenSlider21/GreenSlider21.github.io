// Grid Based Game
// Liam Prange
// 3/28/2025
//
// Extra for Experts:
// 
// art source
// https://opengameart.org/

const CELL_SIZE = 100;
const OPEN_TILE = 0;
const IMPASSABLE = 1;
const PLAYER = 9;
let grid;
let rows;
let cols;
let thePlayer = {
  x: 0,
  y: 0,
};
let selectCharacter = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.ceil(width/CELL_SIZE);
  rows = Math.ceil(height/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);

  // add the player to the grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function draw() {
  background(220);
  displayGrid();
  console.log(selectCharacter);
  moveCharacter();
}

function keyPressed() {
  if (key === "w") {
    // move up
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  if (key === "s") {
    // move down
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  if (key === "a") {
    // move left
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
  if (key === "d") {
    // move right
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
}

function movePlayer(x, y) {
  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === OPEN_TILE) {
    // previos player location
    let oldX = thePlayer.x;
    let oldY = thePlayer.y;
  
    //  keep track of player current location
    thePlayer.x = x;
    thePlayer.y = y;
  
    // reset the old spot to be open
    grid[oldY][oldX] = OPEN_TILE;
  
    // put the player on grid
    grid[thePlayer.y][thePlayer.x] = PLAYER;
  }
}

function mousePressed() {
  if (Math.floor(mouseY/CELL_SIZE) === thePlayer.y && Math.floor(mouseX/CELL_SIZE) === thePlayer.x) {
    console.log("ya hit");
    selectCharacter = true;
  }
  else {
    console.log("ya missed");
    selectCharacter = false;
  }
}

function moveCharacter() {
  if (selectCharacter === true) {
    movePlayer(thePlayer.x + 1);
    movePlayer(thePlayer.y + 1);
  }
}

function toggleCell(x, y) {
  // make sure cell your toggling is actually in the grid
  if (x >= 0 && x < cols && y >= 0 && y < rows){
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSABLE;
    }
    else if (grid[y][x] === IMPASSABLE) {
      grid[y][x] = OPEN_TILE;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === OPEN_TILE) {
        fill("white");
      }
      else if (grid[y][x] === IMPASSABLE) {
        fill("black");
      }
      else if (grid[y][x] === PLAYER) {
        fill("red");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      //toss a 0 or 1 in randomly
      if (random(100) < 50) {
        newGrid[y].push(OPEN_TILE);
      }
      else {
        newGrid[y].push(IMPASSABLE);
      }
    }
  }
  return newGrid;
}
