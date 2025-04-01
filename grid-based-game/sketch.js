// Dig Dug
// Liam Prange
// 3/28/2025
//
// Extra for Experts:
// 
// art source
// https://opengameart.org/

const CELL_SIZE = 20;
const OPEN_TILE = 0;
const IMPASSABLE = 1;
const PLAYER = 9;
const POOKA = 8;
const FYGAR = 7;
const ROCK = 2;
let grid;
let rows = 16*2;
let cols = 14*2;
let thePlayer = {
  x: 6*2,
  y: 8*2,
};
let walkTime = 0;
let walkDelay = 200;
let digTime = 0;
let digDelay = 400;
let level;

function preload() {
  level = loadJSON("level.json");
}

function setup() {
  createCanvas(cols * CELL_SIZE, rows * CELL_SIZE);
  grid = generateRandomGrid(cols, rows);

  // add the player to the grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function draw() {
  background(220);
  // noStroke();
  displayGrid();
  playerControls();
}

function keyPressed() {
  if (key === "l") {
    grid = level;
  }
}

function playerControls() {
  if (keyIsDown(87) === true) {
    // move up
    movePlayer(thePlayer.x, thePlayer.y - 1);
  }
  if (keyIsDown(83) === true) {
    // move down
    movePlayer(thePlayer.x, thePlayer.y + 1);
  }
  if (keyIsDown(65) === true) {
    // move left
    movePlayer(thePlayer.x - 1, thePlayer.y);
  }
  if (keyIsDown(68) === true) {
    // move right
    movePlayer(thePlayer.x + 1, thePlayer.y);
  }
}

function movePlayer(x, y) {
  if (x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === OPEN_TILE || 
    x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] === PLAYER) {
    if (millis() - walkTime > walkDelay) {
      walkTime = millis();

      // previos player location
      let oldX = thePlayer.x;
      let oldY = thePlayer.y;
    
      //  keep track of player current location
      thePlayer.x = x;
      thePlayer.y = y;
    
      // reset the old spot to be open
      grid[oldY][oldX] = OPEN_TILE;
      grid[oldY+1][oldX] = OPEN_TILE;
      grid[oldY][oldX+1] = OPEN_TILE;
      grid[oldY+1][oldX+1] = OPEN_TILE;
    
      // put the player on grid
      grid[thePlayer.y][thePlayer.x] = PLAYER;
      grid[thePlayer.y+1][thePlayer.x] = PLAYER;
      grid[thePlayer.y][thePlayer.x+1] = PLAYER;
      grid[thePlayer.y+1][thePlayer.x+1] = PLAYER;
    }
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
      grid[oldY+1][oldX] = OPEN_TILE;
      grid[oldY][oldX+1] = OPEN_TILE;
      grid[oldY+1][oldX+1] = OPEN_TILE;
    
      // put the player on grid
      grid[thePlayer.y][thePlayer.x] = PLAYER;
      grid[thePlayer.y+1][thePlayer.x] = PLAYER;
      grid[thePlayer.y][thePlayer.x+1] = PLAYER;
      grid[thePlayer.y+1][thePlayer.x+1] = PLAYER;
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  toggleCell(x,y);
  toggleCell(x+1,y);
  toggleCell(x,y+1);
  toggleCell(x+1,y+1);
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
        square(x * CELL_SIZE + 1, y * CELL_SIZE, CELL_SIZE);
        square(x * CELL_SIZE, y * CELL_SIZE + 1, CELL_SIZE);
        square(x * CELL_SIZE + 1, y * CELL_SIZE + 1, CELL_SIZE);
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
      // if (random(100) < 50) {
      //   newGrid[y].push(OPEN_TILE);
      // }
      // else {
      newGrid[y].push(IMPASSABLE);
      // }
    }
  }
  return newGrid;
}
