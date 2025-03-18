// Cribbage
// Liam Prange
// 3/10/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// creating varriables and arrays for later
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
let cardSize = 0.40;
let playerPoints = 0;

function preload(){
  // preloading each seperate suit as differnt arrays so that they can be accessed easily later
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
  drawHand();
}

function draw() {
  background(53, 101, 77);
  showHand();
}


function createDeck() {
  // unsing arrays created earlier to create one card of each suit and number with appropriate values for calculations and images then putting all of this in a deck array
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

function drawHand() {
  // takes six random cards out of the deck and put them in the playerHand array
  for (let knave = 0; knave < 6; knave++) {
    let theRandom = Math.round(random(51 - knave));
    playerHand.push(structuredClone(deck[theRandom]));
    deck.splice(theRandom, 1);
  }
}

function showHand() {
  // displays the cards in the players hand currently
  for (let treys = 0; treys < playerHand.length; treys++) {
    // displays clubs
    if (playerHand[treys].suitValue === "clubs") {
      image(clubsImages[playerHand[treys].imageValue], treys*210, height - 300, 
        clubsImages[playerHand[treys].imageValue].width * cardSize, clubsImages[playerHand[treys].imageValue].height * cardSize);
    }
    // displays diamonds
    if (playerHand[treys].suitValue === "diamonds") {
      image(diamondsImages[playerHand[treys].imageValue], treys*210, height - 300, 
        diamondsImages[playerHand[treys].imageValue].width * cardSize, diamondsImages[playerHand[treys].imageValue].height * cardSize);
    }
    // displays heartss
    if (playerHand[treys].suitValue === "hearts") {
      image(heartsImages[playerHand[treys].imageValue], treys*210, height - 300, 
        heartsImages[playerHand[treys].imageValue].width * cardSize, heartsImages[playerHand[treys].imageValue].height * cardSize);
    }
    // displays spades
    if (playerHand[treys].suitValue === "spades") {
      image(spadesImages[playerHand[treys].imageValue], treys*210, height - 300, 
        spadesImages[playerHand[treys].imageValue].width * cardSize, spadesImages[playerHand[treys].imageValue].height * cardSize);
    }
  }
}

// function handWorth () {
//   for (let point of playerHand) {
//     if (SOMETHING THAT LOOKS AT EVERY CARD IN PLAYERHAND + REVEALED CARD FINDS COMBINATIONS TO MAKE UNIQUE 15) {
//       playerPoints += 2 FOR EACH UNIQUE COMBINATION
//     }
//     if (SOMETHING THAT LOOKS AT EVERY CARD IN PLAYERHAND + REVEALED CARD FINDS COMBINATIONS TO MAKE UNIQUE RUNS) {
//       playerPoints += RUN LENGTH
//     }
//     if (SOMETHING THAT LOOKS AT EVERY CARD IN PLAYERHAND + REVEALED CARD FINDS COMBINATIONS TO MAKE UNIQUE PAIRS) {
//       playerPoints += 2 FOR EACH UNIQUE COMBINATION
//     }
//     if (SOMETHING THAT LOOKS AT EVERY JACK IN PLAYERHAND FINDS IF SUIT MATCHES REVEALED CARD) {
//       playerPoints += 1
//     }
//   }
// }