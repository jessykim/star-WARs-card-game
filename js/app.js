/*-------------- Constants -------------------*/
const mainDeck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]


/*--------------- Variables ------------------*/
let deck1 = []
let deck2 = []
let warDeck1 = []
let warDeck2 = []
let deckDisplay1 = []
let deckDisplay2 = []
let winner
let cardToRemove


/*---------- Cached Element References -------*/
let deck1El = document.getElementById('deck-1')
let deck2El = document.getElementById('deck-2')
let warDeck1El = document.getElementById('war-deck-1')
let warDeck2El = document.getElementById('war-deck-2')
let deck1DisplayEl = document.getElementById('deck-1-display')
let deck2DisplayEl = document.getElementById('deck-2-display')
let messageEl = document.getElementById('message')
let dealBtn = document.getElementById('deal-btn')
let resetBtn = document.getElementById('reset-btn')


/*----------- Event Listeners ----------------*/
document.getElementById('deal-btn').addEventListener('click', init)
document.getElementById('deck-1').addEventListener('click', handleClick)


/*-------------- Functions -------------------*/

// init function to start the game
function init() {
  // randomly select 26 random index numbers from main deck
  // push 26 cards in each of the decks
  while (mainDeck.length > 0) {
    let randIdx = Math.floor(Math.random() * mainDeck.length)
    let cardPicked = mainDeck.splice(randIdx, 1)[0]
    deck1.push(cardPicked)
    deck1El.classList.add('back')

    let randIdx2 = Math.floor(Math.random() * mainDeck.length)
    let cardPicked2 = mainDeck.splice(randIdx2, 1)[0]
    deck2.push(cardPicked2)
    deck2El.classList.add('back')
  }
  computerDraw()
}

function computerDraw() {
  // add first card in deck2 on deckDisplay2
  if (deckDisplay2.length === 0) {
    let drawnCard = deck2[0]
    deckDisplay2.push(drawnCard)
    deck2DisplayEl.classList.add(drawnCard)
    // remove drawn card from deck2
    deck2.shift()
  } else {
  }
}

// create a function that draws the first card out of deck1 when the user clicks on deck1
function handleClick() {
  // if deckDisplay2 has a card drawn, then allow user to click on deck1 to draw 1 card to the center
  if (deckDisplay2.length === 1) {
    let drawnCard = deck1[0]
    deckDisplay1.push(drawnCard)
    deck1DisplayEl.classList.add(drawnCard)
    deck1.shift()
    compareDraw()
  } else {
  }
}

// create a function that compares the value of each drawn card
// the highest card wins; both cards are added to the winning deck
// if both card values are equal; call WAR function
function compareDraw(arr1, arr2) {
  // change class name so that the value of the card is a number (i.e. d06 -> 6)
  // if the value includes A = 14, K = 13, Q = 12, J = 11
  let card1 = deckDisplay1[0].toString()
  let card2 = deckDisplay2[0].toString()

  let cardVal1 = parseInt(card1.replace(/(A)/, 14).replace(/(K)/, 13).replace(/(Q)/, 12).replace(/(J)/, 11).replace(/(c)|(d)|(h)|(s)/, ''))

  let cardVal2 = parseInt(card2.replace(/(A)/, 14).replace(/(K)/, 13).replace(/(Q)/, 12).replace(/(J)/, 11).replace(/(c)|(d)|(h)|(s)/, ''))

  console.log(card1);
  console.log(card2);

  if (cardVal1 === cardVal2) {
    war()
  } else if (cardVal1 > cardVal2) {
    // if user card is higher than comp card; push both cards to deck1
    deck1.push(deckDisplay1[0])
    deck1.push(deckDisplay2[0])
  } else {
    // if comp card is higher; push both cards to deck2
    deck2.push(deckDisplay1[0])
    deck2.push(deckDisplay2[0])
  }
  
  if (deckDisplay1.length !== 0) {
    deck1DisplayEl.classList.remove(card1)
    deck2DisplayEl.classList.remove(card2)
    deckDisplay1.pop()
    deckDisplay2.pop()
    computerDraw()
  }
  console.log(deck1);
  console.log(deck2);
}

// create a war function
// draws 3 cards from deck1 and deck2 and pushes to warDeck1 and warDeck2 (front is hidden)
// comp draws 1 card (face up) to deckDisplay2
// user clicks on deck1 to draw 1 card to deckDisplay1
// call compareDraw function
function war() {
  warDeck1.push(deck1[0], deck1[1], deck1[2])
  warDeck2.push(deck2[0], deck2[1], deck2[2])
  
  warDeck1El.classList.add('back')
  warDeck2El.classList.add('back')

  console.log(warDeck1);
  console.log(warDeck2);
  console.log(deck1);
  console.log(deck2);
  computerDraw()
}