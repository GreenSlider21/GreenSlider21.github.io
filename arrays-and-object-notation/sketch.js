// Cribbage
// Liam Prange
// 3/10/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let clubsImages = [];
let diamondsImages = [];
let heartsImages = [];
let spadesImages = [];
let deck = [];
let cardNum = [2, 3, 4, 5, 6, 7, 8, 9, 10, "ace", "jack", "king", "queen"];
let cardSuit = ["clubs", "diamonds", "hearts", "spades"];
let cardWorth = [2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 10, 10, 10];
let cardImage = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function preload(){
  for (let png = 0; png < cardNum.length; png++) {
    clubsImages.push(loadImage("deck_images/" + cardNum[png] + "_of_clubs.png"));
    diamondsImages.push(loadImage("deck_images/" + cardNum[png] + "_of_diamonds.png"));
    heartsImages.push(loadImage("deck_images/" + cardNum[png] + "_of_hearts.png"));
    spadesImages.push(loadImage("deck_images/" + cardNum[png] + "_of_spades.png"));
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
  draw_card();
}


function createDeck() {
  for (let num = 0; num < cardNum.length; num++) {
    for (let suit = 0; suit < cardSuit.length; suit++) {
      let card = {
        suit_value: cardSuit[suit],
        number_value: cardNum[num],
        worth_value: cardWorth[num],
        image_value: cardImage[num],
      };
      deck.push(card);
    }
  }
}

function draw_card() {
  if (deck[0].suit_value === "clubs"){
    image(clubsImages[deck[0].image_value], width/2, height/2);
  }  
}