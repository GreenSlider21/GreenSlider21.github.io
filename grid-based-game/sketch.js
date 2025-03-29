// Dig Dug
// Liam Prange
// 3/28/2025
//
// Extra for Experts:
// 
// art source
// https://opengameart.org/

const CELL_SIZE = 45;
const OPEN_TILE = 0;
const IMPASSABLE = 1;
const PLAYER = 9;
const POOKA = 8;
const FYGAR = 7;
const ROCK = 2;
let grid;
let rows = 16;
let cols = 14;
let thePlayer = {
  x: 6,
  y: 8,
};
let digTime = 0;
let digDelay = 400;
let level;

function preload() {
  level = loadJSON("level.json");
}

function setup() {
  createCanvas(windowWidth * 0.9, windowHeight * 0.9);
  grid = generateRandomGrid(cols, rows);

  // add the player to the grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function draw() {
  background(220);
  displayGrid();
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
  if (key === "l") {
    grid = level;
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

  else if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === IMPASSABLE) {
    if (millis() - digTime > digDelay) {
      digTime = millis();

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
}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  toggleCell(x,y);
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
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === IMPASSABLE) {
        fill("black");
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === PLAYER) {
        fill("red");
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
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
