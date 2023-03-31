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
let currentPlayer = players.playerOne;
let currentSelection = 0;
let arrayPlayerOne = [];
let arrayPlayerTwo = [];
let squareArray = [];
let gameActive = true;
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

document.querySelector(".reset").addEventListener("click", (e) => {
  clearBoard();
});

function boardEvent(e) {
  // Create an array of all the children of the .board
  if (gameActive === true) {
    squareArray = Array.from(e.target.parentNode.children);
    currentSelection = squareArray.indexOf(e.target);

    // Allows the user to populate the board with
    populateBoard();
    checkWinner(arrayPlayerOne, arrayPlayerTwo);
    checkTie();
    //   console.log(playerOneWins);
  }
}

function checkWinner(playerOneArray, playerTwoArray) {
  for (let i = 0; i < winningCombinations.length; i++) {
    if (
      winningCombinations[i].every((array) => playerOneArray.includes(array))
    ) {
      console.log("player one wins!");
      playerOneBool = true;
      playerOneScore++;
      document.querySelector(".playerOne").innerHTML = playerOneScore;
      endGame();
    } else if (
      winningCombinations[i].every((array) => playerTwoArray.includes(array))
    ) {
      console.log("player two wins!");
      playerTwoBool = true;
      playerTwoScore++;
      document.querySelector(".playerTwo").innerHTML = playerTwoScore;
      endGame();
    }
    //  else {
    //   checkTie();
    // }
  }
}

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

function checkTie() {
  if (
    playerOneBool === false &&
    playerTwoBool === false &&
    arrayPlayerOne.length + arrayPlayerTwo.length === 9
  ) {
    console.log("It's a tie!");
    tieScore++;
    document.querySelector(".tie").innerHTML = tieScore;
    gameActive = false;
  }
}
