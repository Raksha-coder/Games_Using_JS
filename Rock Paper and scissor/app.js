const computerChoiceDisplay = document.getElementById("computer-choice");
const userChoiceDisplay = document.getElementById("user-choice");
const resultDisplay = document.getElementById("result");
const possibleChoices = document.querySelectorAll("button");

let userChoices;
let computerChoice;
let result;
possibleChoices.forEach((possiblechoice) =>
  possiblechoice.addEventListener("click", (e) => {
    userChoices = e.target.id;
    userChoiceDisplay.innerHTML = userChoices;
    generateComputerChoice();
    getResults();
  })
);

function generateComputerChoice() {
  //random number
  const randomNumber = Math.floor(Math.random() * possibleChoices.length) + 1; //which is 3
  //I want the random number between 1 2 and 3

  switch (randomNumber) {
    case 1:
      computerChoice = "rock";
      break;
    case 2:
      computerChoice = "scissors";
      break;
    case 3:
      computerChoice = "paper";
      break;
  }

  computerChoiceDisplay.innerHTML = computerChoice;
}

function getResults() {
  if (userChoices === computerChoice) {
    result = "It's a Draw";
  } else if (userChoices === "rock" && computerChoice === "paper") {
    result = "you lose";
  } else if (userChoices === "rock" && computerChoice === "scissors") {
    result = "you won";
  } else if (userChoices === "paper" && computerChoice === "scissors") {
    result = "you lose";
  } else if (userChoices === "paper" && computerChoice === "rock") {
    result = "you won";
  } else if (userChoices === "scissors" && computerChoice === "rock") {
    result = "you lose";
  } else if (userChoices === "scissors" && computerChoice === "paper") {
    result = "you won";
  }

  resultDisplay.innerHTML = result;
}
