const startGameButton = document.getElementById("start-game");
const clearBoardButton = document.getElementById("clear-board");
const listOfButtons = document.getElementById("list-of-buttons");
const emptySlotsForLetters = document.getElementById("empty-slots-for-letters");
const alphabetAsText = "aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz";
const alphabet = alphabetAsText.split("");
const userWordInputField = document.getElementById("user-word-input");
let userWordInputArrayOfLetters;
let userWordInputText;
const userInputSection = document.getElementById('user-input-section');
const form = document.querySelector('form');
const guessCounter = document.getElementById('guess-counter');
let numberOfGuessesRemaining = 8;

function game() {
  startGame();
  addEventListenersToButtons();
}

function clearBoard() {
  location.reload();
}

async function startGame() {
  const result = await getUserInput();
  if (!result) {
    return;
  } else {
    alphabet.forEach((letter) => {
      let button = document.createElement("button");
      button.innerText = letter;
      listOfButtons.append(button);
    });
    startGameButton.disabled = true;
    clearBoardButton.disabled = false;
    form.hidden = true;
    guessCounter.hidden = false;
  }
}

function addEventListenersToButtons() {
  const dashes = document.querySelectorAll('.dashes');
  listOfButtons.addEventListener("click", (event) => {
    event.target.disabled = true;
    const clickedLetter = event.target.innerText;
    if (userWordInputArrayOfLetters.includes(clickedLetter)) {
      for (let index = 0; index < userWordInputArrayOfLetters.length; index++) {
        if(userWordInputArrayOfLetters[index] === clickedLetter) {
          dashes[index].textContent = `${clickedLetter}`;
        }
      }
    } else {
      numberOfGuessesRemaining--;
      guessCounter.textContent = `Még ${numberOfGuessesRemaining} hibalehetőséged van, utána rotty!`;
    };
    determineWinnerOrLoser();
  });
}

function determineWinnerOrLoser(){
  let array = [];
  const dashes = document.querySelectorAll('.dashes');
  for (let index = 0; index < dashes.length; index++) {
    array.push(dashes[index].textContent);
  }
  if(numberOfGuessesRemaining < 1) {
    alert('Leütöttek mint a büdös szart! (Éljen Erdei!)');
    clearBoard();
  } else if (array.join('') === userWordInputText) {
    alert('Szia uram, Ön nyert!')
  }
}

function createDashes(userInput) {
  let displayItem = userInput.replace(/./g, '<span class="dashes">_</span>');
  userInputSection.innerHTML = displayItem;
}

async function getUserInput() {
  userWordInputText = userWordInputField.value.trim().toLowerCase();
  if (userWordInputText === "") {
    alert("Írjál már be valamit baszod!");
    return;
  } else {
    userWordInputField.value = '';
    userWordInputArrayOfLetters = userWordInputText.split("");
    createDashes(userWordInputText);
    return userWordInputArrayOfLetters;
  }
}

startGameButton.addEventListener("click", game);
clearBoardButton.addEventListener("click", clearBoard);