// Cribbage
// Liam Prange
// 3/10/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let deck = [];
let cardNum = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
let suit = ["hearts ", "diamonds ", "spades ", "clubs "];

for (let num = 0; num < cardNum.length; num++) {
  for (let type = 0; type < suit.length; type++) {
    let card = {
      suit_value: suit[type],
      number_value: cardNum[num],
    };
    deck.push(card);
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  createDeck();

}

function draw() {
  background(220);
}


function createDeck() {

}