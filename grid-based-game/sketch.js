// Dig Dug
// Liam Prange
// 3/28/2025
// https://www.youtube.com/watch?v=9rrogEHWTBE
// https://www.youtube.com/watch?v=tZ7dhmhT9Ug
// Extra for Experts:
// 
// art source
// https://opengameart.org/

// constants
const CELL_SIZE = 20;
const OPEN_TILE = 0;
const DIGABLE = 1;
const PLAYER = 9;
const POOKA = 8;
const FYGAR = 7;
const ROCK = 2;
const ROWS = 32;
const COLS = 28;
const WALKDELAY = 200;
const DIGDELAY = 400;

// variables
let grid;
let thePlayer = {
  x: 12,
  y: 16,
};
let walkTime = 0;
let digTime = 0;
let level;

function preload() {
  level = loadJSON("level.json");
}

function setup() {
  createCanvas(COLS * CELL_SIZE, ROWS * CELL_SIZE);
  grid = level;

  // add the player to the grid
  grid[thePlayer.y][thePlayer.x] = PLAYER;
}

function draw() {
  background(220);
  // noStroke();
  displayGrid();
  playerControls();
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
  if (x >= 0 && x < COLS - 1 && y >= 0 && y < ROWS - 1 && 
    (grid[y][x] === DIGABLE || grid[y+1][x] === DIGABLE ||grid[y][x+1] === DIGABLE ||grid[y+1][x+1] === DIGABLE)) {
    if (millis() - digTime > DIGDELAY) {
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

  else if (x >= 0 && x < COLS - 1 && y >= 0 && y < ROWS - 1 && grid[y][x] === OPEN_TILE || 
    x >= 0 && x < COLS - 1 && y >= 0 && y < ROWS - 1 && grid[y][x] === PLAYER) {
    if (millis() - walkTime > WALKDELAY) {
      walkTime = millis();

      // previos player location
      let oldX = thePlayer.x;
      let oldY = thePlayer.y;

      //  keep track of player current location
      thePlayer.x = x;
      thePlayer.y = y;
      console.log(thePlayer.x, thePlayer.y, x, y, oldX, oldY);
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
  if (x >= 0 && x < COLS && y >= 0 && y < ROWS){
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = DIGABLE;
    }
    else if (grid[y][x] === DIGABLE) {
      grid[y][x] = OPEN_TILE;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[y][x] === OPEN_TILE) {
        fill("white");
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
      else if (grid[y][x] === DIGABLE) {
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
      else if (grid[y][x] === POOKA) {
        fill("orange");
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
        square(x * CELL_SIZE + 1, y * CELL_SIZE, CELL_SIZE);
        square(x * CELL_SIZE, y * CELL_SIZE + 1, CELL_SIZE);
        square(x * CELL_SIZE + 1, y * CELL_SIZE + 1, CELL_SIZE);
      }
      else if (grid[y][x] === FYGAR) {
        fill("green");
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
        square(x * CELL_SIZE + 1, y * CELL_SIZE, CELL_SIZE);
        square(x * CELL_SIZE, y * CELL_SIZE + 1, CELL_SIZE);
        square(x * CELL_SIZE + 1, y * CELL_SIZE + 1, CELL_SIZE);
      }
    }
  }
}
