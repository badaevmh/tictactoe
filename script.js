"use strict";
const area = document.getElementById("area"),
  closeBtn = document.querySelector(".btn-close"),
  resetBtn = document.querySelector(".btn-reset"),
  modal = document.querySelector(".modal"),
  overlay = document.querySelector(".overlay"),
  winnerName = document.querySelector(".winner"),
  gameCells = document.getElementsByClassName("cell"),
  arr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

let move = 0;
let crossScores = 0,
  circleScores = 0,
  drawScores = 0;
let result = "";
let drawCheck = gameCells.length;

const openModal = function () {
  modal.classList.remove("hidden");
};

const closeModal = function () {
  for (let i = 0; i < gameCells.length; i++) {
    gameCells[i].textContent = "";
  }
  drawCheck = gameCells.length;
  modal.classList.add("hidden");
};

area.addEventListener("click", (e) => {
  if (e.target.innerHTML == "") {
    move % 2 === 0 ? (e.target.innerHTML = "X") : (e.target.innerHTML = "O");
    move++;
    check();
  }
});

const check = function () {
  drawCheck--;
  for (let i = 0; i < arr.length; i++) {
    if (
      gameCells[arr[i][0]].innerHTML == "X" &&
      gameCells[arr[i][1]].innerHTML == "X" &&
      gameCells[arr[i][2]].innerHTML == "X"
    ) {
      result = "крестики";
      crossScores++;
      document.querySelector(".cross-score").textContent = crossScores;
      showWinner(result);
      openModal();
    } else if (
      gameCells[arr[i][0]].innerHTML == "O" &&
      gameCells[arr[i][1]].innerHTML == "O" &&
      gameCells[arr[i][2]].innerHTML == "O"
    ) {
      result = "нолики";
      circleScores++;
      document.querySelector(".circle-score").textContent = circleScores;
      showWinner(result);
      openModal();
    } else if (!drawCheck) {
      drawScores++;
      document.querySelector(".draw-score").textContent = drawScores;
      showWinner();
      winnerName.textContent = "НИЧЬЯ";
      openModal();
    }
  }
};

const showWinner = function (winner) {
  winnerName.textContent = `Победил: ${winner}`;
};
closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});
resetBtn.addEventListener("click", () => {
  location.reload();
});
