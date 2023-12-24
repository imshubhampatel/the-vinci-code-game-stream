const container = document.getElementById("game");
const errorContent = document.getElementById("error");
const mainContent = document.querySelector(".main-content");
const mainContentV2 = document.querySelector(".main-content-v2");
const mainContentV3 = document.querySelector(".main-content-v3");
const mainContentV4 = document.querySelector(".main-content-v4");
const welcomeHeading = document.querySelector(".wel-head-content");
const startButton = document.querySelector("#user-start-btn");
const randomNumber = document.getElementById("random-no");
const okayButton = document.getElementById("okay-button");

function getNameHandler(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formDataObject = Object.fromEntries(formData.entries());
  console.log(formDataObject);
  if (formDataObject.userName.length < 4) {
    errorContent.innerHTML = "Name must be at least 4 characters long";
    return;
  } else {
    errorContent.innerHTML = "";
    welcomeHeading.innerHTML = `Welcome to the Game ${formDataObject.userName}`;
  }

  mainContent.classList.add("add-trans");
  mainContentV2.classList.add("isActive");
}

const newGame = new window.Game(container);
currentIndex = 0;

function setNumber(newGame) {
  let level = 3;
  let values = [6, 4, 3, 5];
  let currentIndex = 0; // Add this line to define currentIndex
  console.log({ values, level, currentIndex });

  mainContentV3.classList.add("isActive");

  let index = 0;
  let countDownId = setInterval(() => {
    console.log({
      index,
      level: level,
      countDownId,
    });

    if (index < level) {
      if (index == 0) {
        console.log("inside ");
        console.log("dfsdf", values[index]);
        randomNumber.innerHTML = values[index];
      }
      index++;
    } else {
      clearInterval(countDownId);
    }
  }, 2000);
}

function startGame() {
  startButton.addEventListener("click", () => {
    mainContentV2.classList.remove("isActive");
    newGame.start();
    setNumber(newGame);
  });

  okayButton.addEventListener("click", () => {
    mainContentV3.classList.remove("isActive");
    setNumber(newGame);
  });
}

startGame();

function inputSubmitHandler(event) {
  event.preventDefault();
  let formValues = new FormData(event.target);
  const formValuesObject = Object.fromEntries(formValues.entries());
  console.log(formValuesObject);
  newGame.getNumbersFromUser(formValuesObject.enteredNumber);
  console.log(newGame.getEnteredNumber());
  mainContentV4.classList.remove("isActive");
  mainContentV3.classList.add("isActive");
  newGame.gameLoop();
  setNumber(newGame);
}
