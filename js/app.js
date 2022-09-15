/*-------------- Constants -------------------*/
const mainDeck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]

// for testing
// const mainDeck = ["dA","cA","hA","sA","d10","c10","h10","s07","s02","h04"]

// const mainDeck = ["dA","cA","d10","c10"]


/*--------------- Variables ------------------*/
let deck1 = []
let deck2 = []
let warDeck1 = []
let warDeck2 = []
let deckDisplay1 = []
let deckDisplay2 = []

/*---------- Cached Element References -------*/
const deck1El = document.getElementById('deck-1')
const deck2El = document.getElementById('deck-2')
const warDeck1El = document.getElementById('war-deck-1')
const warDeck2El = document.getElementById('war-deck-2')
const deck1DisplayEl = document.getElementById('deck-1-display')
const deck2DisplayEl = document.getElementById('deck-2-display')
const messageEl = document.getElementById('message')
const dealBtn = document.getElementById('deal-btn')
const resetBtn = document.getElementById('reset-btn')
const favicon = document.getElementById('favicon')

const warClick = new Audio('../audio/lightsaber.mp3')
const winnerTheme = new Audio('../audio/star-wars-theme.mp3')
const chewyRoar = new Audio('../audio/chewy.roar.mp3')

/*----------- Event Listeners ----------------*/
dealBtn.addEventListener('click', init)
document.getElementById('deck-1').addEventListener('click', handleClick)
document.getElementById('deck-1-display').addEventListener('click', renderWar)
document.getElementById('reset-btn').addEventListener('click', reset)

/*-------------- Functions -------------------*/
function init() {
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

  dealBtn.setAttribute('hidden', true)
  resetBtn.removeAttribute('hidden')
  messageEl.textContent = ''
  messageEl.classList.remove('background')

  computerDraw()
}

function computerDraw() {  
  if (deck2.length < 2) {
    deck2El.classList.remove('back')
  } else {
    deck2El.classList.add('back')
  }

  if (deckDisplay2.length === 0 && deck2.length > 0) {
    let drawnCard = deck2[0]
    deckDisplay2.push(drawnCard)
    deck2DisplayEl.classList.add(drawnCard)
    deck2.shift()
  } else {
  }
}

function handleClick() {
  if (deck1.length < 2) {
    deck1El.classList.remove('back')
  } else {
    deck1El.classList.add('back')
  }

  if (deckDisplay2.length === 1 && deckDisplay1.length === 0) {
    let drawnCard = deck1[0]
    deckDisplay1.push(drawnCard)
    deck1DisplayEl.classList.add(drawnCard)
    deck1.shift()
    render()
  } else {
  }
}

function render() {
  let card1 = deckDisplay1[0]
  let card2 = deckDisplay2[0]

  let cardVal1 = parseInt(card1.replace(/(A)/, 14).replace(/(K)/, 13).replace(/(Q)/, 12).replace(/(J)/, 11).replace(/(c)|(d)|(h)|(s)/, ''))

  let cardVal2 = parseInt(card2.replace(/(A)/, 14).replace(/(K)/, 13).replace(/(Q)/, 12).replace(/(J)/, 11).replace(/(c)|(d)|(h)|(s)/, ''))

  if (cardVal1 === cardVal2) {
    if (deck1.length === 0 || deck2.length === 0) {
      checkWinner()
    } else {
      setTimeout(() => war(), 2000)
    }
  } else if (cardVal1 > cardVal2) {
    deck1.push(deckDisplay1[0])
    deck1.push(deckDisplay2[0])
    checkWinner()
  } else {
    deck2.push(deckDisplay1[0])
    deck2.push(deckDisplay2[0])
    checkWinner()
  }

  if (deck1.length === 0) {
    deck1El.classList.remove('back')
  } else {
    deck1El.classList.add('back')
  }

  if (deck2.length === 0) {
    deck2El.classList.remove('back')
  } else {
    deck2El.classList.add('back')
  }

  console.log(deck1);
  console.log(deck2);
}

function returnCards() {
  deck1DisplayEl.classList.remove(deckDisplay1[0])
  deck2DisplayEl.classList.remove(deckDisplay2[0])
  deckDisplay1.pop()
  deckDisplay2.pop()
  setTimeout(() => computerDraw(), 1000)
}

function returnWarCards() {
  deck1DisplayEl.classList.remove(deckDisplay1[0])
  deck2DisplayEl.classList.remove(deckDisplay2[0])
  deckDisplay1 = []
  deckDisplay2 = []
  setTimeout(() => computerDraw(), 1000)
}

function war() { 
  messageEl.textContent = "We have WAR! Click on the card drawn for you at the center to see who wins!"
  messageEl.classList.add('background')

  deck1DisplayEl.classList.remove(deckDisplay1[0])
  deck2DisplayEl.classList.remove(deckDisplay2[0])

  let drawnCard1 = deck1[0]
  deckDisplay1.unshift(drawnCard1)
  deck1DisplayEl.classList.add(drawnCard1, 'back')
  deck1.shift()
  console.log(drawnCard1);
  console.log(deckDisplay1);

  if (deck1.length === 0) {
    deck1El.classList.remove('back')
  } else {
  }
  
  let drawnCard2 = deck2[0]
  deckDisplay2.unshift(drawnCard2)
  deck2DisplayEl.classList.add(drawnCard2, 'back')
  deck2.shift()
  console.log(drawnCard2);
  console.log(deckDisplay2);

  if (deck2.length === 0) {
    deck2El.classList.remove('back')
  } else {
  }
  
  if (deck1.length >= 3) {
    for (let i = 0; i < 3; i++) {
      warDeck1.push(deck1[i])
    }
  } else {
    for (let i = 0; i < deck1.length; i++) {
      warDeck1.push(deck1[i])
    }
  }

  if (deck2.length >= 3) {
    for (let i = 0; i < 3; i++) {
      warDeck2.push(deck2[i])
    }
  } else {
    for (let i = 0; i < deck2.length; i++) {
      warDeck2.push(deck2[i])
    }
  }

  if (warDeck1.length > 0) {
    warDeck1El.classList.add('back-red')
  } else {
  }
  
  if (warDeck2.length > 0) {
    warDeck2El.classList.add('back-red')
  } else {
  }
  deck1.splice(0, 3)
  deck2.splice(0, 3)

  console.log(deck1);
  console.log(deck2);
  console.log(warDeck1);
  console.log(warDeck2);
}

function renderWar() {
  messageEl.textContent = ''
  messageEl.classList.remove('background')

  deck1DisplayEl.classList.remove('back')
  deck2DisplayEl.classList.remove('back')

  let warCard1 = deckDisplay1[0]
  let warCard2 = deckDisplay2[0]
  
  let warCardVal1 = parseInt(warCard1.replace(/(A)/, 14).replace(/(K)/, 13).replace(/(Q)/, 12).replace(/(J)/, 11).replace(/(c)|(d)|(h)|(s)/, ''))
  
  let warCardVal2 = parseInt(warCard2.replace(/(A)/, 14).replace(/(K)/, 13).replace(/(Q)/, 12).replace(/(J)/, 11).replace(/(c)|(d)|(h)|(s)/, ''))
  
  if (warCardVal1 === warCardVal2) {
    if (deck1.length === 0 || deck2.length === 0) {
      checkWinner()
    } else {
      setTimeout(() => doubleWar(), 2000)
    }
  } else if (warCardVal1 > warCardVal2) {
    deck1WarWinner()
  } else if (warCardVal1 < warCardVal2) {
    deck2WarWinner()
  } 

  console.log(warCard1);
  console.log(warCard2);
  console.log(deck1);
  console.log(deck2);
}

function doubleWar() {
  messageEl.textContent = "We have DOUBLE WAR! No need to click, let's see who wins!"
  messageEl.classList.add('background')

  deck1DisplayEl.classList.remove(deckDisplay1[0])
  deck2DisplayEl.classList.remove(deckDisplay2[0])

  let drawnCard1 = deck1[0]
  deckDisplay1.unshift(drawnCard1)
  deck1DisplayEl.classList.add(drawnCard1, 'back')
  deck1.shift()
  
  if (deck1.length === 0) {
    deck1El.classList.remove('back')
  } else {
  }

  let drawnCard2 = deck2[0]
  deckDisplay2.unshift(drawnCard2)
  deck2DisplayEl.classList.add(drawnCard2, 'back')
  deck2.shift()

  if (deck2.length === 0) {
    deck2El.classList.remove('back')
  } else {
  }
  
  if (deck1.length >= 3) {
    for (let i = 0; i < 3; i++) {
      warDeck1.push(deck1[i])
    }
  } else {
    for (let i = 0; i < deck1.length; i++) {
      warDeck1.push(deck1[i])
    }
  }

  if (deck2.length >= 3) {
    for (let i = 0; i < 3; i++) {
      warDeck2.push(deck2[i])
    }
  } else {
    for (let i = 0; i < deck2.length; i++) {
      warDeck2.push(deck2[i])
    }
  }

  if (warDeck1.length > 0) {
    warDeck1El.classList.add('back-red')
  } else {
  }
  
  if (warDeck2.length > 0) {
    warDeck2El.classList.add('back-red')
  } else {
  }
  deck1.splice(0, 3)
  deck2.splice(0, 3)
  
  setTimeout(() => renderWar(), 2000)
}

function deck1WarWinner() {
  for (let i = 0; i < deckDisplay1.length; i++) {
    deck1.push(deckDisplay1[i])
  }
  for (let i = 0; i < deckDisplay2.length; i++) {
    deck1.push(deckDisplay2[i])
  }

  for (let i = 0; i < warDeck1.length; i++) {
    deck1.push(warDeck1[i])
  }
  for (let i = 0; i < warDeck2.length; i++) {
    deck1.push(warDeck2[i])
  }
  warDeck1El.classList.remove('back-red')
  warDeck2El.classList.remove('back-red')
  warDeck1.splice(0,6)
  warDeck2.splice(0,6)

  if (deck2.length === 0) {
    checkWinner()
  } else {
    setTimeout(() => returnWarCards(), 2000)
  }
}

function deck2WarWinner() {
  for (let i = 0; i < deckDisplay1.length; i++) {
    deck2.push(deckDisplay1[i])
  }
  for (let i = 0; i < deckDisplay2.length; i++) {
    deck2.push(deckDisplay2[i])
  }
  
  for (let i = 0; i < warDeck1.length; i++) {
    deck2.push(warDeck1[i])
  }
  for (let i = 0; i < warDeck2.length; i++) {
    deck2.push(warDeck2[i])
  }
  warDeck1El.classList.remove('back-red')
  warDeck2El.classList.remove('back-red')
  warDeck1.splice(0,6)
  warDeck2.splice(0,6)

  if (deck1.length === 0) {
    checkWinner()
  } else {
    setTimeout(() => returnWarCards(), 2000)
  }
}

function checkWinner() {
  if (deck2.length === 0 && deck1.length > 0) {
    messageEl.textContent = "Congratulations! Yo-da winna!"
    messageEl.classList.add('background')
    deck2El.classList.remove('back')
    resetBtn.removeAttribute('hidden')
    removeEventListener('click', renderWar)
  } else if (deck1.length === 0 && deck2.length > 0) {
    messageEl.textContent = "Better luck next time! Click reset for a rematch!"
    messageEl.classList.add('background')
    deck1El.classList.remove('back')
    resetBtn.removeAttribute('hidden')
    removeEventListener('click', renderWar)
  } else if (deck1.length === 0 && deck2.length === 0) {
    messageEl.textContent = "It's a tie! Click reset for a rematch!"
    messageEl.classList.add('background')
    deck1El.classList.remove('back')
    deck2El.classList.remove('back')
    resetBtn.removeAttribute('hidden')
    removeEventListener('click', renderWar)
  } else {
    setTimeout(() => returnCards(), 2000)
  }
}

function reset() {
  dealBtn.removeAttribute('hidden')
  resetBtn.setAttribute('hidden', true)
  deck1El.classList.remove('back')
  deck2El.classList.remove('back')
  warDeck1El.classList.remove('back')
  warDeck2El.classList.remove('back')
  deck1DisplayEl.classList.remove(deckDisplay1[0])
  deck2DisplayEl.classList.remove(deckDisplay2[0])
  messageEl.textContent = "Click deal to begin!"
  messageEl.classList.add('background')
  deck1 = []
  deck2 = []
  deckDisplay1 = []
  deckDisplay2 = []
  warDeck1 = []
  warDeck2 = []
  mainDeck.push("dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02")
  // below is for testing/presenting
  // mainDeck.push("dA","cA","hA","sA","d10","c10","h10","s07","s02","h04")
  // mainDeck.push("dA","cA","d10","c10")
}