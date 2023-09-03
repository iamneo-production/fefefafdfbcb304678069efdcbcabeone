const x = "X";
const o = "O";
let currentPlayer = x;
let gameEnded = false;

const result = document.querySelector("#result");
const resetBtn = document.querySelector("#reset-btn");

function checkWin() {
  const boxes = document.querySelectorAll(".bt");
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      boxes[a].value === currentPlayer &&
      boxes[b].value === currentPlayer &&
      boxes[c].value === currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  const boxes = document.querySelectorAll(".bt");
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].value === "") {
      return false;
    }
  }
  return true;
}

function endGame() {
  gameEnded = true;
  result.textContent =
    currentPlayer === x ? "Player X won 🎉" : "Player X won 🎉";
  resetBtn.disabled = false;
}

function resetGame() {
  const boxes = document.querySelectorAll(".bt");
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].value = "";
    boxes[i].readOnly = false;
    boxes[i].classList.remove(x);
    boxes[i].classList.remove(o);
  }
  currentPlayer = x;
  gameEnded = false;
  result.textContent = "Player X Turn";
  resetBtn.disabled = true;
}

function handleBoxClick(event) {
  const box = event.target;
  if (gameEnded || box.value !== "") {
    return;
  }
  box.value = currentPlayer;
  box.classList.add(currentPlayer);
  box.readOnly = true;
  if (checkWin()) {
    endGame();
    return;
  }
  if (checkDraw()) {
    gameEnded = true;
    result.textContent = "It's a draw!";
    resetBtn.disabled = false;
    return;
  }
  currentPlayer = currentPlayer === x ? o : x;
  result.textContent =
    currentPlayer === x ? "Player X Turn" : "Player O Turn";
}

resetBtn.addEventListener("click", resetGame);

const boxes = document.querySelectorAll(".bt");
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", handleBoxClick);
}
