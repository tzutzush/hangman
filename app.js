const startGameButton = document.getElementById("start-game");
const clearBoardButton = document.getElementById("clear-board");
const clearBoardAfterWinButton = document.getElementById(
  "clear-board-after-win"
);
const listOfButtons = document.getElementById("list-of-buttons");
const emptySlotsForLetters = document.getElementById("empty-slots-for-letters");
// prettier-ignore
const alphabet = ['a', 'á', 'b', 'c', 'd', 'e', 'é', 'f', 'g', 'h', 'i', 'í', 'j', 'k', 'l', 'm', 'n', 'o', 'ó', 'ö', 'ő', 'p', 'q', 'r', 's', 't', 'u', 'ú', 'ü', 'ű', 'v', 'w', 'x', 'y', 'z']
const userWordInputField = document.getElementById("user-word-input");
const solutionModal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const userInputSection = document.getElementById("user-input-section");
const form = document.querySelector("form");
const guessCounter = document.getElementById("guess-counter");

class App {
  numberOfGuessesRemaining = 8;
  userWordInputArrayOfLetters;
  userWordInputText;

  constructor() {
    // set focus

    userWordInputField.focus();

    // start game button

    startGameButton.addEventListener("click", this.getUserInput.bind(this));

    // clear board button

    clearBoardButton.addEventListener("click", this.clearBoard);

    // clear board after win/lose button

    clearBoardAfterWinButton.addEventListener("click", this.clearBoard);

    // Adding event listener to UL

    listOfButtons.addEventListener("click", this.checkButton.bind(this));
  }

  // Getting user input and creating dashes

  getUserInput() {
    this.userWordInputText = userWordInputField.value.trim().toLowerCase();
    if (!this.userWordInputText) {
      alert("Írjál már be valamit baszod!");
      return;
    }
    userWordInputField.value = "";
    this.userWordInputArrayOfLetters = this.userWordInputText.split("");
    this.createDashes(this.userWordInputText);
    this.createButtons();
  }

  // create buttons

  createButtons() {
    alphabet.forEach((letter) => {
      listOfButtons.insertAdjacentHTML(
        "beforeend",
        `<button class = "button letter-button">${letter}</button>`
      );
    });
    startGameButton.disabled = true;
    clearBoardButton.disabled = false;
    form.hidden = true;
    guessCounter.hidden = false;
  }

  // chech clicked button against user's input

  checkButton(event) {
    const dashes = document.querySelectorAll(".dashes");
    if (!event.target.classList.contains("letter-button")) return;
    event.target.disabled = true;
    const clickedLetter = event.target.innerText;
    if (this.userWordInputArrayOfLetters.includes(clickedLetter)) {
      this.userWordInputArrayOfLetters.forEach((letter, index) => {
        if (letter === clickedLetter) {
          dashes[index].textContent = `${clickedLetter}`;
        }
      });
    } else {
      this.numberOfGuessesRemaining--;
      guessCounter.textContent = `Még ${this.numberOfGuessesRemaining} hibalehetőséged van, utána rotty!`;
    }
    this.determineWinnerOrLoser();
  }

  // Check win-lose condition

  determineWinnerOrLoser() {
    let array = [];
    const dashes = document.querySelectorAll(".dashes");
    dashes.forEach((dash) => array.push(dash.textContent));

    if (this.numberOfGuessesRemaining < 1) {
      solutionModal.querySelector(
        ".solution"
      ).textContent = `Vesztettél, a helyes megoldás ${this.userWordInputText} volt.`;
      solutionModal.querySelector(
        "h1"
      ).textContent = `Leütöttek mint a büdös szart! Éljen Erdei!`;
      this.openModalAndOverlay();
    }

    if (array.join("") === this.userWordInputText) {
      solutionModal.querySelector(
        ".solution"
      ).textContent = `Nyertél, a helyes megoldás ${this.userWordInputText} volt.`;
      this.openModalAndOverlay();
    }
  }

  // create dashes

  createDashes(userInput) {
    let displayItem = userInput.replace(/./g, '<span class="dashes">_</span>');
    userInputSection.innerHTML = displayItem;
  }

  // Open modal and overlay

  openModalAndOverlay() {
    solutionModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }

  // clear board

  clearBoard() {
    location.reload();
  }
}

const app = new App();
