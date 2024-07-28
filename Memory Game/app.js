// adding an array of objects for all items.
// 4*4 matrix
const cardArray = [
  {
    name: "ice-cream",
    img: "./Images/ice-cream_3250484.png",
  },
  {
    name: "pizza",
    img: "./Images/pizza.png",
  },
  {
    name: "hot-dog",
    img: "./Images/hot-dog.png",
  },
  {
    name: "coffee",
    img: "./Images/coffee-cup.png",
  },
  {
    name: "ice-cream",
    img: "./Images/ice-cream_3250484.png",
  },
  {
    name: "burger",
    img: "./Images/burger.png",
  },
  {
    name: "ice-cream",
    img: "./Images/ice-cream_3250484.png",
  },
  {
    name: "pizza",
    img: "./Images/pizza.png",
  },
  {
    name: "hot-dog",
    img: "./Images/hot-dog.png",
  },
  {
    name: "coffee",
    img: "./Images/coffee-cup.png",
  },
  {
    name: "ice-cream",
    img: "./Images/ice-cream_3250484.png",
  },
  {
    name: "burger",
    img: "./Images/burger.png",
  },
];

// i want to display this array items in a random way and then display it.
cardArray.sort(() => {
  0.5 - Math.random();
});

const gridDisplay = document.querySelector("#grid");
let result = document.querySelector("#result");
let cardChosen = [];
let cardChosenIds = [];
let cardsWon = [];

function createBoard() {
  // i want to create an element for each object in array.
  for (let i = 0; i < cardArray.length; i++) {
    const imgTag = document.createElement("img");
    imgTag.setAttribute("src", "./Images/bg.png");
    imgTag.setAttribute("data-id", i);
    imgTag.style.width = "80px";
    imgTag.style.height = "80px";
    imgTag.style.border = "1px solid black";

    imgTag.addEventListener("click", flipCard);

    gridDisplay.appendChild(imgTag);
  }
}

createBoard();

function checkMatch() {
  const cards = document.querySelectorAll("img");
  const optionOne = cardChosenIds[0];
  const optionTwo = cardChosenIds[1];

  //if we found a match
  if (cardChosen[0] == cardChosen[1]) {
    alert("you found a match");
    cards[optionOne].setAttribute("src", "./Images/white.jpg");
    cards[optionTwo].setAttribute("src", "./Images/white.jpg");
    cards[optionOne].removeEventListener("click", flipCard);
    cards[optionTwo].removeEventListener("click", flipCard);
    cardsWon.push(cardChosen);
  } else if(cardChosen[0] != cardChosen[1])
  {
    cards[optionOne].setAttribute("src", "./Images/bg.png");
    cards[optionTwo].setAttribute("src", "./Images/bg.png");
  }
  cardChosen = []; //make cardchosen to empty.
  cardChosenIds = [];

  result.textContent = cardsWon.length;

  if (cardsWon.length == (cardArray.length / 2)) {
    alert("you won the game");
    result.textContent = "congratulations !!";
  }
}

function flipCard() {
  let cardId = this.getAttribute("data-id");
  this.setAttribute("src", cardArray[cardId].img);
  cardChosenIds.push(cardId);
  cardChosen.push(cardArray[cardId].name);

  if (cardChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}
