// Card game
// Liam Prange
// 3/10/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let deck = [];
let suit = ["hearts ", "diamonds ", "spades ", "clubs "];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let suitNumber = 0; suitNumber < 4; suitNumber++){
    makeDeck(suit[suitNumber]);
  }
}

function draw() {
  background(220);
}

function makeDeck(suit) {
  for (let card = 1; card < 14; card++){
    deck.push(suit + card);
  }
}