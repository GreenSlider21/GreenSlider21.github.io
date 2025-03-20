// Baby's First Cribbage
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
let playerDraws = false;
let oppDraws = false;
let cutDraws = false;
let combo = [];
let playerPosition = [];
let oppPosition = [];

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
  createCanvas(800, 800);
  cardScale();
  createDeck();
}

function draw() {
  background(53, 101, 77);
  showCards();
  spaceKeyPressed();
  cuttingTime();
  drawHand();
  oppDrawHand();
  cutDeck();
  discardCards();
  scoreCards();
  scoreBoard();
}

function spaceKeyPressed() {
  // lets space key draw card
  if (key === " "){
    playerDraws = true;
    oppDraws = true;
  }
}

function cuttingTime() {
  if (playerHand.length === 4 && oppHand.length === 4){
    cutDraws = true;
  }
}

function cardScale() {
  // scales down the card sizes and adds card spacing
  cardSize = 0.16;
  cardShiftX = 100;
  cardShiftY = 325;
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
  if (playerDraws === true) {
    if (playerHand.length < 6) {
      for (let knave = 0; knave < 6; knave++) {
        let theRandom = Math.round(random(0, 51 - knave));
        playerHand.push(structuredClone(deck[theRandom]));
        deck.splice(theRandom, 1);
      }
    }
    else {
      playerDraws = false;
    }
  }
}

function oppDrawHand() {
  // takes six random cards out of the deck and puts them in the oppHand array
  if (oppDraws === true) {
    if (oppHand.length < 6) {
      for (let fool = 0; fool < 6; fool++) {
        let aRandom = Math.round(random(0, 45 - fool));
        oppHand.push(structuredClone(deck[aRandom]));
        deck.splice(aRandom, 1);
      }
    }
    else {
      oppDraws = false;
    }
  }
}

function cutDeck() {
  // takes one random card out of the deck and puts it in the cutCard array
  if (cutDraws === true) {
    if (cutCard.length < 1){
      let anoutherRandom = Math.round(random(0, 39));
      cutCard.push(structuredClone(deck[anoutherRandom]));
      deck.splice(anoutherRandom, 1);
    }
    else {
      cutCard = false
    }
  }
}

function showCards() {
  for (let pip = 0; pip < displayCards.length; pip++) {
    // displays the cards the player can see
    for (let treys = 0; treys < displayCards[pip].length; treys++) {
      // displays clubs
      if (displayCards[pip][treys].suitValue === "clubs") {
        image(clubsImages[displayCards[pip][treys].imageValue], treys*cardShiftX, -pip*cardShiftY + windowHeight/1.4, 
          clubsImages[displayCards[pip][treys].imageValue].width * cardSize, clubsImages[displayCards[pip][treys].imageValue].height * cardSize);
      }
      // displays diamonds
      if (displayCards[pip][treys].suitValue === "diamonds") {
        image(diamondsImages[displayCards[pip][treys].imageValue], treys*cardShiftX, -pip*cardShiftY + windowHeight/1.4, 
          diamondsImages[displayCards[pip][treys].imageValue].width * cardSize, diamondsImages[displayCards[pip][treys].imageValue].height * cardSize);
      }
      // displays heartss
      if (displayCards[pip][treys].suitValue === "hearts") {
        image(heartsImages[displayCards[pip][treys].imageValue], treys*cardShiftX, -pip*cardShiftY + windowHeight/1.4, 
          heartsImages[displayCards[pip][treys].imageValue].width * cardSize, heartsImages[displayCards[pip][treys].imageValue].height * cardSize);
      }
      // displays spades
      if (displayCards[pip][treys].suitValue === "spades") {
        image(spadesImages[displayCards[pip][treys].imageValue], treys*cardShiftX, -pip*cardShiftY + windowHeight/1.4, 
          spadesImages[displayCards[pip][treys].imageValue].width * cardSize, spadesImages[displayCards[pip][treys].imageValue].height * cardSize);
      }
    }
  }
}

function discardCards() {
  // takes the card clicked and discards it
  for (let pip = 0; pip < displayCards.length; pip++) {
    for (let treys = 0; treys < displayCards[pip].length; treys++) {
      if (mouseY > -pip*cardShiftY + windowHeight/1.4 && mouseY < -pip*cardShiftY + windowHeight/1.4 + 116 &&
             mouseX > treys*cardShiftX && mouseX < treys*cardShiftX + 80 && 
             mouseIsPressed) {
        background(0);
      }
    }
  }
}

function scoreCards() {
  // takes the card clicked and puts in a combo array to see if this is a new combo and if it's worth any points 
  if (playerHand.length === 4 && oppHand.length === 4){
    for (let pip = 0; pip < displayCards.length; pip++) {
      for (let treys = 0; treys < displayCards[pip].length; treys++) {
        if (mouseY > -pip*cardShiftY + windowHeight/1.4 && mouseY < -pip*cardShiftY + windowHeight/1.4 + 116 &&
               mouseX > treys*cardShiftX && mouseX < treys*cardShiftX + 80 && 
               mouseIsPressed) {
          background(255);
        }
      }
    }
  }
}

function scoreBoard() {
  rectMode(CENTER);
  noStroke();
  //board background 
  fill("#cdb891");
  rect(400, 400, 600, 200);
  // red lane
  fill("red");
  rect(400, 325, 550, 20);
  rect(665, 350, 20, 50);
  rect(400, 375, 550, 20);

  fill("blue");
  for (let i = 0; i <= 530; i += 10) {
    circle(i+135, 325, 10);
  }
  for (let i = 0; i <= 30; i += 10) {
    circle(665, i+335, 10);
  }
  for (let i = 530; i >= 0; i -= 10) {
    circle(i+135, 375, 10);
  }

  //blue lane
  rect(400, 475, 550, 20);
  rect(665, 450, 20, 50);
  rect(400, 425, 550, 20);

  fill("red");
  for (let i = 0; i <= 530; i += 10) {
    circle(i+135, 475, 10);
  }
  for (let i = 0; i <= 30; i += 10) {
    circle(665, i+435, 10);
  }
  for (let i = 530; i >= 0; i -= 10) {
    circle(i+135, 425, 10);
  }

  //winners position
  fill("yellow");
  rect(115, 400, 20, 20);

  fill("purple");
  circle(115, 400, 10);
}