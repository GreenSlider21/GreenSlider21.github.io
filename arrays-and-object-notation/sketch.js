// Cribbage
// Liam Prange
// 3/10/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cardImages = [];
let allImages = "deck_images/";
let deck = [];
let cardNum = [2, 3, 4, 5, 6, 7, 8, 9, 10, "A", "J", "K", "Q"];
let cardSuit = ["clubs", "diamonds", "hearts", "spades"];
let cardWorth = [2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 10, 10, 10];

function preload(){
  for (let png = 0; png < allImages.length; png++) {
    cardImages.push(loadImage("deck_images/" + allImages[png] + ".png"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  createDeck();
}

function draw() {
  background(220);
  // console.log(deck[0].suit_value);
  // console.log(deck[0].number_value);
  // console.log(deck[0].worth_value);
  image(cardImages, width/2, height/2);
}


function createDeck() {
  for (let num = 0; num < cardNum.length; num++) {
    for (let suit = 0; suit < cardSuit.length; suit++) {
      let card = {
        suit_value: cardSuit[suit],
        number_value: cardNum[num],
        worth_value: cardWorth[num],
      };
      deck.push(card);
    }
  }
}

function draw_card() {
  
}