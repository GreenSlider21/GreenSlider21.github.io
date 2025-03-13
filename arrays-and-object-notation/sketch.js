// Card game
// Liam Prange
// 3/10/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let deck = [];
let suit = ["hearts ", "diamonds ", "spades ", "clubs "];
let card = {
  suit_value: "suit",
  number_value: "card",
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let suitNumber = 0; suitNumber < 4; suitNumber++){
    makeDeck(suit[suitNumber]);
  }
  // createDeck();

}

function draw() {
  background(220);
  if (deck[0].suit === "hearts "){
    console.log(true);
  }
}

function makeDeck(suit) {
  for (let num = 1; num < 14; num++){
    deck.push(suit + num);
  }
}

// function createDeck() {

// }