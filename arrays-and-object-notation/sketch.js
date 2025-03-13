// Cribbage
// Liam Prange
// 3/10/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let deck = [];
let cardNum = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
let cardSuit = ["hearts", "diamonds", "spades", "clubs"];
let cardWorth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
let secondaryWorth = [11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function setup() {
  createCanvas(windowWidth, windowHeight);
  createDeck();
}

function draw() {
  background(220);
  // console.log(deck[0].suit_value);
  // console.log(deck[0].number_value);
  // console.log(deck[0].worth_value);
  // console.log(deck[0].secondary_value);
}


function createDeck() {
  for (let num = 0; num < cardNum.length; num++) {
    for (let suit = 0; suit < cardSuit.length; suit++) {
      let card = {
        suit_value: cardSuit[suit],
        number_value: cardNum[num],
        worth_value: cardWorth[num],
        secondary_value: secondaryWorth[num],
      };
      deck.push(card);
    }
  }
}

function draw_card() {
  
}