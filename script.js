const winningPostions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];
const gameInfo = document.querySelector(".game-status");
const startButton = document.querySelector(".game-start-button");
const stopButton = document.querySelector(".game-stop-button");
const boxes = document.querySelectorAll(".box");
let currentPlayer;
let gameGrid;
let gameProgress = false;
let answer = null;
let chanceCounter = 0;

function clearUiValues() {
  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("win");
  });
}
function setGameInfo() {
  if (answer == null) {
    gameInfo.textContent = "Tic Tac Toe Game";
  } else if (answer == "") {
    if (chanceCounter == 9) {
      gameInfo.textContent = `Game Draw`;
      gameProgress = false;
    } else gameInfo.textContent = `Current Player - ${currentPlayer}`;
  } else {
    gameInfo.textContent = `Winner -${answer}`;
  }
  if (gameProgress) {
    startButton.classList.add("hidden");
    stopButton.classList.remove("hidden");
  } else {
    startButton.classList.remove("hidden");
    stopButton.classList.add("hidden");
  }
}
function initGame() {
  // set the values
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  setGameInfo();
}
function startGame() {
  chanceCounter = 0;
  answer = "";
  gameProgress = true;
  initGame();
  clearUiValues();
}
function stopGame() {
  answer = null;
  chanceCounter = 0;
  gameProgress = false;
  clearUiValues();
  initGame();
}
function setWinner(winner, positions) {
  answer = winner;
  positions.forEach((position) => {
    boxes[position].classList.add("win");
  });
  gameProgress = false;
}
function checkTheWinner(chanceCounter) {
  winningPostions.forEach((positions) => {
    [firstIndex, secondIndex, thirdIndex] = positions;
    if (
      gameGrid[firstIndex] == "" ||
      gameGrid[secondIndex] == "" ||
      gameGrid[thirdIndex] == ""
    )
      return;

    if (
      gameGrid[firstIndex] == gameGrid[secondIndex] &&
      gameGrid[thirdIndex] == gameGrid[secondIndex]
    ) {
      console.log("winner");
      setWinner(gameGrid[firstIndex], positions);
    }
  });
  setGameInfo();
}
function nextPlayerTurn() {
  currentPlayer == "X" ? (currentPlayer = "O") : (currentPlayer = "X");
  setGameInfo();
}
function handleClick(box, boxIndex) {
  box.textContent = currentPlayer;
  gameGrid[boxIndex] = `${currentPlayer}`;
  chanceCounter++;
  //check the answer

  checkTheWinner(chanceCounter);
  nextPlayerTurn();
}
startButton.addEventListener("click", () => {
  startGame();
});
stopButton.addEventListener("click", () => {
  stopGame();
});
boxes.forEach((box, boxIndex) => {
  box.addEventListener("click", () => {
    if (!gameProgress) return;
    handleClick(box, boxIndex);
  });
});
