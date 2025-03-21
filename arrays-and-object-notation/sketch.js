// Baby's First Cribbage
// Liam Prange
// 3/10/2025
//
// Extra for Experts:
// I added background music that loops

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
let playerPositionX = [];
let playerPositionY = [];
let oppPositionX = [];
let oppPositionY = [];
let discardTime = 0;
let discardDelay = 500;
let scoreTime = 0;
let scoreDelay = 500;
let bgm;
let cardX;
let cardY;

function preload(){
  // preloading each seperate suit as differnt arrays so that they can be accessed easily later
  for (let png = 0; png < cardNum.length; png++) {
    clubsImages.push(loadImage("deck_images/" + cardNum[png] + "_of_clubs.png"));
    diamondsImages.push(loadImage("deck_images/" + cardNum[png] + "_of_diamonds.png"));
    heartsImages.push(loadImage("deck_images/" + cardNum[png] + "_of_hearts.png"));
    spadesImages.push(loadImage("deck_images/" + cardNum[png] + "_of_spades.png"));
  }

  // preloads the background music
  bgm = loadSound("m64bal.m4a");
}

function setup() {
  createCanvas(700, 700);
  cardScale();
  createDeck();
  music();
}

function draw() {
  background(53, 101, 77);
  scoreBoard();
  scoreDisplay();
  changeScore();
  showCards();
  spaceKeyPressed();
  cuttingTime();
  drawHand();
  oppDrawHand();
  cutDeck();
  discardPlayerCards();
  discardOppCards();
  resetDeck();
  pegs();
}

function music() {
  // plays background music
  bgm.loop();
  bgm.setVolume(0.05);
}

function spaceKeyPressed() {
  // lets space key draw card
  if (key === " ") {
    playerDraws = true;
    oppDraws = true;
  }
}

function cuttingTime() {
  //cuts the deck when both players are down to four cards
  if (playerHand.length === 4 && oppHand.length === 4){
    cutDraws = true;
  }
}

function resetDeck () {
  // resets the deck when you press r so that you can play more hands
  if (playerHand.length > 0 && oppHand.length > 0 && key === "r"){
    if (playerHand.length > 0) {
      deck.push(structuredClone(playerHand.pop()));
    }
    if (oppHand.length > 0) {
      deck.push(structuredClone(oppHand.pop()));
    }
    if (cutCard.length > 0) {
      deck.push(structuredClone(cutCard.pop()));
    }
  }
}

function cardScale() {
  // scales down the card sizes and adds card spacing
  cardSize = 0.16;
  cardShiftX = 100;
  cardShiftY = 225;
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
  if (playerDraws === true && playerHand.length < 6 && playerHand.length === 0) {
    for (let knave = 0; knave < 6; knave++) {
      let theRandom = Math.round(random(0, deck.length - knave));
      playerHand.push(structuredClone(deck[theRandom]));
      deck.splice(theRandom, 1);
    }
  }
  playerDraws = false;
}

function oppDrawHand() {
  // takes six random cards out of the deck and puts them in the oppHand array
  if (oppDraws === true && oppHand.length < 6 && oppHand.length === 0) {
    for (let fool = 0; fool < 6; fool++) {
      let aRandom = Math.round(random(0, deck.length - fool));
      oppHand.push(structuredClone(deck[aRandom]));
      deck.splice(aRandom, 1);
    }
  }
  oppDraws = false;
}

function cutDeck() {
  // takes one random card out of the deck and puts it in the cutCard array
  if (cutDraws === true) {
    if (cutCard.length < 1){
      let anoutherRandom = Math.round(random(0, deck.length));
      cutCard.push(structuredClone(deck[anoutherRandom]));
      deck.splice(anoutherRandom, 1);
    }
    else {
      cutDraws = false;
    }
  }
}

function showCards() {
  for (let pip = 0; pip < displayCards.length; pip++) {
    // displays the cards the player can see
    for (let treys = 0; treys < displayCards[pip].length; treys++) {

      cardX = treys*cardShiftX;
      cardY = -pip*cardShiftY + 560;
      
      // displays clubs
      if (displayCards[pip][treys].suitValue === "clubs") {
        image(clubsImages[displayCards[pip][treys].imageValue], cardX, cardY, 
          clubsImages[displayCards[pip][treys].imageValue].width * cardSize, clubsImages[displayCards[pip][treys].imageValue].height * cardSize);
      }
      // displays diamonds
      if (displayCards[pip][treys].suitValue === "diamonds") {
        image(diamondsImages[displayCards[pip][treys].imageValue], cardX, cardY, 
          diamondsImages[displayCards[pip][treys].imageValue].width * cardSize, diamondsImages[displayCards[pip][treys].imageValue].height * cardSize);
      }
      // displays heartss
      if (displayCards[pip][treys].suitValue === "hearts") {
        image(heartsImages[displayCards[pip][treys].imageValue], cardX, cardY, 
          heartsImages[displayCards[pip][treys].imageValue].width * cardSize, heartsImages[displayCards[pip][treys].imageValue].height * cardSize);
      }
      // displays spades
      if (displayCards[pip][treys].suitValue === "spades") {
        image(spadesImages[displayCards[pip][treys].imageValue], cardX, cardY, 
          spadesImages[displayCards[pip][treys].imageValue].width * cardSize, spadesImages[displayCards[pip][treys].imageValue].height * cardSize);
      }
    }
  }
}

function discardPlayerCards() {
  // takes the card clicked and discards it for the player
  if(millis() - discardTime > discardDelay){
    for (let pip = 0; pip < displayCards.length; pip++) {
      for (let treys = 0; treys < displayCards[pip].length; treys++) {

        cardX = treys*cardShiftX;
        cardY = -pip*cardShiftY + 560;

        if (pip === 0 && playerHand.length > 4 && mouseY > cardY && mouseY < cardY + 116 &&
               mouseX > cardX && mouseX < cardX + 80 && 
               mouseIsPressed) {
          deck.push(structuredClone(playerHand[treys]));
          playerHand.splice(treys, 1);
          discardTime = millis();
        }
      }
    }
  }
}

function discardOppCards() {
  // takes the card clicked and discards it for the opp
  if(millis() - discardTime > discardDelay){
    for (let pip = 0; pip < displayCards.length; pip++) {
      for (let treys = 0; treys < displayCards[pip].length; treys++) {

        cardX = treys*cardShiftX;
        cardY = -pip*cardShiftY + 560;

        if (pip === 2 && oppHand.length > 4 && mouseY > cardY && mouseY < cardY + 116 &&
              mouseX > cardX && mouseX < cardX + 80 && 
              mouseIsPressed) {
          deck.push(structuredClone(oppHand[treys]));
          oppHand.splice(treys, 1);
          discardTime = millis();
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

  fill("blue");
  for (let i = 0; i <= 530; i += 10) {
    circle(i+135, 325, 10);
    if (playerPositionX.length <= 57){
      playerPositionX.push(i);
    }
  }
  for (let i = 530; i <= 560; i += 10) {
    circle(665, i-195, 10);
    if (playerPositionY.length <= 4){
      playerPositionY.push(i);
    }
  }

  //blue lane
  rect(400, 475, 550, 20);
  rect(665, 450, 20, 50);

  fill("red");
  for (let i = 0; i <= 530; i += 10) {
    circle(i+135, 475, 10);
    if (oppPositionX.length <= 57){
      oppPositionX.push(i);
    }
  }
  for (let i = 530; i <= 560; i += 10) {
    circle(665, i-95, 10);
    if (oppPositionY.length <= 4){
      oppPositionY.push(i);
    }
  }

  //winner position
  fill("yellow");
  rect(665, 400, 20, 20);

  fill("purple");
  circle(665, 400, 10);
}

function scoreDisplay() {
  // Displays the curent score
  textSize(40);
  textFont("playbill");
  fill("red");
  text(playerPoints, 300, 415);
  fill("blue");
  text(oppPoints, 500, 415);
}

function changeScore() {
  // lets the players add and subtract from there score
  fill("red");
  circle(250, 400, 75);
  circle(375, 400, 75);
  textSize(100);
  textFont("playbill");
  fill("blue");
  text("+", 358, 433);
  text("-", 244, 430);

  circle(450, 400, 75);
  circle(575, 400, 75);
  fill("red");
  text("+", 433, 433);
  text("-", 569, 430);

  if(millis() - scoreTime > scoreDelay){
    if (dist(mouseX, mouseY, 250, 400) <= 75/2 && mouseIsPressed){
      playerPoints -= 1;
      scoreTime = millis();
    }
    else if (dist(mouseX, mouseY, 375, 400) <= 75/2 && mouseIsPressed){
      playerPoints += 1;
      scoreTime = millis();
    }
    else if (dist(mouseX, mouseY, 450, 400) <= 75/2 && mouseIsPressed){
      oppPoints += 1
      scoreTime = millis();
    }
    else if (dist(mouseX, mouseY, 575, 400) <= 75/2 && mouseIsPressed){
      oppPoints -= 1
      scoreTime = millis();
    }
  }
}

function pegs() {
  // moves pegs to the apropriate holes based on player score
  if (playerPoints < 54) {
    circle(playerPositionX[playerPoints] + 135, 325, 5);
  }
  else if (playerPoints > 53 && playerPoints < 58) {
    circle(665, playerPositionY[playerPoints - 54] - 195, 5);
  }
  else if (playerPoints > 57) {
    circle(665, 400, 5);
  }

  fill("blue");
  if (oppPoints < 54) {
    circle(oppPositionX[oppPoints] + 135, 475, 5);
  }
  else if (oppPoints > 53 && oppPoints < 58) {
    circle(665, -oppPositionY[oppPoints - 54] + 995, 5)
  }
  else if (oppPoints > 57) {
    circle(665, 400, 5);
  }
}