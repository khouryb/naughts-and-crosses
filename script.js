/**
 *    *** STEP ONE ***
 */

// I need to listen for a click on a square

// then i need to place an x (on page startup) inside that square then an o and so on whilst not allowing squares to be over-ridden

// after four goes or from the beginning, whichever is easiest, i need to check for winning conditions

const boardSelect = document.querySelector(".board");
const players = {
  playerOne: "X",
  playerTwo: "O",
};
const winHistory = document.querySelector(".win-history");
let currentPlayer = players.playerOne;
let currentSelection = 0;
let arrayPlayerOne = [];
let arrayPlayerTwo = [];
let squareArray = [];
let gameActive = false;
let goesFirstButton = true;
let playerOneBool = false;
let playerTwoBool = false;
let playerOneScore = 0;
let playerTwoScore = 0;
let tieScore = 0;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boardSelect.addEventListener("click", boardEvent);

document.querySelector(".play-again").addEventListener("click", () => {
  clearBoard();
});

document.querySelector(".menu").addEventListener("click", (e) => {
  goesFirst(e);
});

document.querySelector(".reset").addEventListener("click", () => {
  enableMenuButtons();
  clearBoard();
  resetValues();
});

function boardEvent(e) {
  // Create an array of all the children of the .board
  if (gameActive === true) {
    squareArray = Array.from(e.target.parentNode.children);
    currentSelection = squareArray.indexOf(e.target);

    // Allows the user to populate the board with x and o
    populateBoard();
    // checks for the winner after each click
    checkWinner(arrayPlayerOne, arrayPlayerTwo);
    checkTie();
  }
}

//checks for a winner after each click
function checkWinner(playerOneArray, playerTwoArray) {
  for (let i = 0; i < winningCombinations.length; i++) {
    if (
      winningCombinations[i].every((array) => playerOneArray.includes(array))
    ) {
      gameHistory("X wins!");
      playerOneBool = true;
      playerOneScore++;
      document.querySelector(".playerOne").innerHTML = playerOneScore;
      endGame();
    } else if (
      winningCombinations[i].every((array) => playerTwoArray.includes(array))
    ) {
      gameHistory("O wins!");
      playerTwoBool = true;
      playerTwoScore++;
      document.querySelector(".playerTwo").innerHTML = playerTwoScore;
      endGame();
    }
  }
}

// checks for a tie after each click
function checkTie() {
  if (
    playerOneBool === false &&
    playerTwoBool === false &&
    arrayPlayerOne.length + arrayPlayerTwo.length === 9
  ) {
    gameHistory("It's a draw!");
    tieScore++;
    document.querySelector(".tie").innerHTML = tieScore;
    gameActive = false;
  }
}

// this function allows players to put their icons on the board
function populateBoard() {
  if (
    squareArray[currentSelection].classList.contains("X") ||
    squareArray[currentSelection].classList.contains("O")
  ) {
  } else {
    squareArray[currentSelection].classList.add(currentPlayer);
    squareArray[currentSelection].innerHTML = currentPlayer;
    playerTurn(currentSelection);
  }
}

// switches player turn
function playerTurn(value) {
  if (currentPlayer === players.playerTwo) {
    arrayPlayerTwo.push(value);
    currentPlayer = players.playerOne;
  } else {
    arrayPlayerOne.push(value);
    currentPlayer = players.playerTwo;
  }
}

function clearBoard() {
  squareArray.forEach((e) => {
    e.classList.remove("X", "O");
    e.innerHTML = "";
  });
  playerOneBool = false;
  playerTwoBool = false;
  gameActive = true;
  currentSelection = 0;
  arrayPlayerOne = [];
  arrayPlayerTwo = [];
  squareArray = [];
}

function endGame() {
  squareArray.forEach((e) => {
    e.classList.add("O");
    e.classList.add("X");
  });
  gameActive = false;
}

function goesFirst(event) {
  if (goesFirstButton === true) {
    if (event.target.classList.contains("buttonX")) {
      currentPlayer = players.playerOne;
      gameActive = true;
      goesFirstButton = false;
      disableMenuButtons();
    } else if (event.target.classList.contains("buttonO")) {
      currentPlayer = players.playerTwo;
      gameActive = true;
      goesFirstButton = false;
      disableMenuButtons();
    }
  }
}

function gameHistory(string) {
  pElement = document.createElement("li");
  pElement.innerHTML = string;
  winHistory.prepend(pElement);
  console.log(winHistory.childElementCount);
  if (winHistory.childElementCount > 6) {
    winHistory.removeChild(winHistory.lastChild);
  }
}

// removes all child nodes for the game history
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//function resets the HTML of
function resetValues() {
  playerOneScore = 0;
  playerTwoScore = 0;
  tieScore = 0;
  goesFirstButton = true;
  gameActive = false;
  removeAllChildNodes(document.querySelector(".win-history"));
  document.querySelector(".playerOne").innerHTML = "0";
  document.querySelector(".playerTwo").innerHTML = "0";
  document.querySelector(".tie").innerHTML = "0";
}

function disableMenuButtons() {
  document.querySelector(".buttonX").style.opacity = "0.3";
  document.querySelector(".buttonO").style.opacity = "0.3";
}

function enableMenuButtons() {
  document.querySelector(".buttonX").style.opacity = "1";
  document.querySelector(".buttonO").style.opacity = "1";
}
