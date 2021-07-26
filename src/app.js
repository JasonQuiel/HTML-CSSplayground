// DOM selector 
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addQuestionBtn = document.getElementById('add-question');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep track of current card
let currentActiveCard = 0; // Which Card to show

// Store DOM cards
const cardsEl = []; //Store DOM cards which array of elements 

// Store card data
const cardsData = getCardsData(); // fetch the data and store it in the local storage.

// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index)); // loop through the data and creat cards
}

// Create a single card in DOM
function createCard(data, index) { // Each Card will contain a question and answer
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
  <div class="inner-card">
  <div class="inner-card-front">
    <p>
      ${data.question}
    </p>
  </div>
  <div class="inner-card-back">
    <p>
      ${data.answer}
    </p>
  </div>
</div>
  `;

  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card); // Put in the container

  updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`; // Add 1 to it because it's 0 by default 
}

// Get cards from local storage
function getCardsData() { 
  // local storage only store string so we will take the array fetch back as an array by using parse
  const cards = JSON.parse(localStorage.getItem('cards')); 
  return cards === null ? [] : cards; //  if the cards are null return an empty array 
}

// Add card to local storage
function setCardsData(cards) {
  // Adding a card to the array and overwrite the array in storage
  localStorage.setItem('cards', JSON.stringify(cards)); // We want to turn it to a sting
  window.location.reload(); // To reflect on the DOM
}

createCards();

// Event listeners

// Next button
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard + 1; // If we are at 1 it will 2 and so on

  // We need to set the index on the last card.
  if (currentActiveCard > cardsEl.length - 1) {  // -1 is because the array base is 0 
    currentActiveCard = cardsEl.length - 1; // Set current active card to last place
  }

  cardsEl[currentActiveCard].className = 'card active'; // Set the next card active by overwriting class name and gives the effect in CSS

  updateCurrentText(); // To update the card numbers
});

// Prev button
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard = currentActiveCard - 1; // -1 for going back 

  if (currentActiveCard < 0) { // To prevent going pass 0 
    currentActiveCard = 0; // Set the current to 0 
  }

  cardsEl[currentActiveCard].className = 'card active'; // Set the next card active by overwriting class name and gives the effect in CSS

  updateCurrentText();
});

// Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show')); // Add show class which will present our form card with CSS style
// Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show')); // Add the hide container CSS style.

// Add new card
addQuestionBtn.addEventListener('click', () => {
  const question = questionEl.value; // Getting values from the form
  const answer = answerEl.value; // Getting values from the form
  console.log(question, answer)

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer }; // Create a new card object

    createCard(newCard);

    questionEl.value = ''; // Clear the form inputs
    answerEl.value = ''; // Clear the form inputs

    addContainer.classList.remove('show'); // Hide class container

    cardsData.push(newCard); // Add new card to the array
    setCardsData(cardsData); // Passing to storage
  }
});

// Clear cards button
clearBtn.addEventListener('click', () => {
  localStorage.clear(); // using clear method
  cardsContainer.innerHTML = ''; // take the cards out of the DOM 
  window.location.reload(); // Then reloading to update the page
});