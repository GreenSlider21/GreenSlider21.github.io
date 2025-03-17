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
let playerHand = [];

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
  // console.log(deck[0].suitValue);
  showCard();
}


function createDeck() {
  for (let num = 0; num < cardNum.length; num++) {
    for (let suit = 0; suit < cardSuit.length; suit++) {
      let card = {
        suitValue: cardSuit[suit],
        numberValue: cardNum[num],
        worthValue: cardWorth[num],
        imageValue: cardImage[num],
      };
      deck.push(card);
    }
  }
}

function showCard() {
  if (deck[0].suitValue === "clubs"){
    image(clubsImages[deck[0].imageValue], width/2, height/2);
  }  
}

function drawHand() {
  // .slice
  deck.slice(random(deck.length));
}