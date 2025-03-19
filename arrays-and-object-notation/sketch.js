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
let oppHand = [];
let cutCard = [];
let cardSize;
let cardShiftX;
let cardShiftY;
let playerPoints = 0;
let oppPoints = 0;
let displayCards = [playerHand, cutCard, oppHand];
let drawCards = false;

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
  cardScale();
  createDeck();
}

function draw() {
  background(53, 101, 77);
  showCards();
  spaceKeyPressed();
  drawHand();
  oppDrawHand();
  cutDeck();
}

function spaceKeyPressed(){
  // lets space key draw card
  if (key === " "){
    drawCards = true;
  }
}

function cardScale() {
  // scales down the card sizes and positions so that the game is still tecnically playable on any size windown
  if (width < height) {
    cardSize = width/5000;
    cardShiftX = width*cardSize;
    cardShiftY = width*cardSize;
  }
  else {
    cardSize = height/5000;
    cardShiftX = height*cardSize;
    cardShiftY = width*cardSize;
  }
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
  // takes six random cards out of the deck and puts them in the playerHand array
  if (drawCards === true) {
    for (let knave = 0; knave < 6; knave++) {
      let theRandom = Math.round(random(0, 51 - knave));
      playerHand.push(structuredClone(deck[theRandom]));
      deck.splice(theRandom, 1);
    }
  }
}

function oppDrawHand() {
  // takes six random cards out of the deck and puts them in the oppHand array
  if (drawCards === true) {
    for (let fool = 0; fool < 6; fool++) {
      let aRandom = Math.round(random(0, 45 - fool));
      oppHand.push(structuredClone(deck[aRandom]));
      deck.splice(aRandom, 1);
    }
  }
}

function cutDeck() {
  // takes one random card out of the deck and puts it in the cutCard array
  if (drawCards === true) {
    let anoutherRandom = Math.round(random(0, 39));
    cutCard.push(structuredClone(deck[anoutherRandom]));
    deck.splice(anoutherRandom, 1);
  }
}

function showCards() {
  for (let pip = 0; pip < displayCards.length; pip++){
    // displays the cards the player can see
    for (let treys = 0; treys < displayCards[pip].length; treys++) {
      // displays clubs
      if (displayCards[pip][treys].suitValue === "clubs") {
        image(clubsImages[displayCards[pip][treys].imageValue], treys*cardShiftX, -pip*cardShiftY + windowHeight/1.2, 
          clubsImages[displayCards[pip][treys].imageValue].width * cardSize, clubsImages[displayCards[pip][treys].imageValue].height * cardSize);
      }
      // displays diamonds
      if (displayCards[pip][treys].suitValue === "diamonds") {
        image(diamondsImages[displayCards[pip][treys].imageValue], treys*cardShiftX, -pip*cardShiftY + windowHeight/1.2, 
          diamondsImages[displayCards[pip][treys].imageValue].width * cardSize, diamondsImages[displayCards[pip][treys].imageValue].height * cardSize);
      }
      // displays heartss
      if (displayCards[pip][treys].suitValue === "hearts") {
        image(heartsImages[displayCards[pip][treys].imageValue], treys*cardShiftX, -pip*cardShiftY + windowHeight/1.2, 
          heartsImages[displayCards[pip][treys].imageValue].width * cardSize, heartsImages[displayCards[pip][treys].imageValue].height * cardSize);
      }
      // displays spades
      if (displayCards[pip][treys].suitValue === "spades") {
        image(spadesImages[displayCards[pip][treys].imageValue], treys*cardShiftX, -pip*cardShiftY + windowHeight/1.2, 
          spadesImages[displayCards[pip][treys].imageValue].width * cardSize, spadesImages[displayCards[pip][treys].imageValue].height * cardSize);
      }
    }
  }
}

