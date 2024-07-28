const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
let score = document.querySelector("#score");
let timeLeft = document.querySelector("#time-left");
let startButton = document.querySelector(".start-btn");

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;

function randomSquare() {
  //initially if there is any mole class on any square, remove it.
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomPosition = squares[Math.floor(Math.random() * 9)]; //random square position
  randomPosition.classList.add("mole");
  hitPosition = randomPosition.id; //jaha jaha mole hoga , we will get it's id

  //when someone click or mousedown
  squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id == hitPosition) {
        result++;
        score.textContent = result;
        //back to null
        hitPosition = null;
      }
    });
  });
}

let countDownStopper;
function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime == 0) {
    clearInterval(countDownStopper);
    clearInterval(timerId);
    alert("Game Over!, your score is " + score.textContent);
  }
}

function moveMole() {
  currentTime = 60;
  result = 0;
  score.innerHTML = 0;
  timerId = setInterval(randomSquare, 1000);
  countDownStopper = setInterval(countDown, 500); //after every second
}
startButton.addEventListener("click", moveMole);
