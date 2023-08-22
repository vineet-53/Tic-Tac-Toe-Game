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
function clearUiValues() {
  boxes.forEach((box) => {
    box.textContent = "";
    box.classList.remove("win");
  });
}
function setGameInfo() {
  answer == null
    ? (gameInfo.textContent = "Tic Tac Toe Game")
    : answer == ""
    ? (gameInfo.textContent = `Current Player - ${currentPlayer}`)
    : (gameInfo.textContent = `Winner -${answer}`);
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
  answer = "";
  gameProgress = true;
  initGame();
  clearUiValues();
}
function stopGame() {
  answer = null;
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
function checkTheWinner() {
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
}
function nextPlayerTurn() {
  currentPlayer == "X" ? (currentPlayer = "O") : (currentPlayer = "X");
  setGameInfo();
}
function handleClick(box, boxIndex) {
  box.textContent = currentPlayer;
  gameGrid[boxIndex] = `${currentPlayer}`;
  //check the answer
  checkTheWinner();
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
