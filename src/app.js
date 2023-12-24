const container = document.getElementById("game");
const errorContent = document.getElementById("error");
const mainContent = document.querySelector(".main-content");
const mainContentV2 = document.querySelector(".main-content-v2");
const mainContentV3 = document.querySelector(".main-content-v3");
const mainContentV4 = document.querySelector(".main-content-v4");
const mainContentV5 = document.querySelector(".main-content-v5");
const mainContentV6 = document.querySelector(".main-content-v6");
const welcomeHeading = document.querySelector(".wel-head-content");
const startButton = document.querySelector("#user-start-btn");
const randomNumber = document.getElementById("random-no");
const okayButton = document.getElementById("okay-button");
const enteredNumber = document.getElementById("enteredNumber");
const inputNumbersField = document.querySelectorAll(".numbers-input");
const output = document.getElementById("output");
const result = document.getElementById("result");
const updateName = document.querySelectorAll(".update-name");
const leaderboard = document.querySelectorAll(".Leader-board");
const score = document.getElementById("score");
const user = document.getElementById("user");

window.userName = "Guest";

function getNameHandler(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formDataObject = Object.fromEntries(formData.entries());
  errorContent.innerHTML = "";
  window.userName = formDataObject.userName || "Guest";
  welcomeHeading.innerHTML = `Welcome to the Game ${window.userName}`;
  mainContent.classList.add("add-trans");
  mainContentV2.classList.add("isActive");
}
const newGame = new window.Game(container);
currentIndex = 0;

function setNumber(newGame) {
  let level = newGame.getLevels();
  let values = newGame.getNumbersFromLevel();
  let currentIndex = 0; // Add this line to define currentIndex
  //   console.log({ values, level, currentIndex });
  mainContentV3.classList.add("isActive");
  let index = 0;
  let countDownId = setInterval(() => {
    if (index < level) {
      randomNumber.innerHTML = `${values[index]}`;
      index++;
    } else {
      clearInterval(countDownId);
      randomNumber.innerHTML = "";
      output.innerHTML = "";
      mainContentV3.classList.remove("isActive");
      mainContentV4.classList.add("isActive");
    }
  }, 2000);
}

function startGame() {
  startButton.addEventListener("click", () => {
    mainContentV2.classList.remove("isActive");
    newGame.start();
    setNumber(newGame);
  });
}
startGame();

function inputSubmitHandler(event) {
  event.preventDefault();
  let formValues = new FormData(event.target);
  const formValuesObject = Object.fromEntries(formValues.entries());
  //   console.log(formValuesObject.enteredNumber.split(""));
  let enteredValues = formValuesObject.enteredNumber
    .split("")
    .map((item) => parseInt(item));

  newGame.getNumbersFromUser(enteredValues);
  //   console.log(newGame.getEnteredNumber());
  mainContentV4.classList.remove("isActive");
  enteredNumber.value = "";
  if (!newGame.endGame) {
    setNumber(newGame);
    return;
  }
  let data = prompt("Enter name to be updated:");
}

function addContentNumbers(event) {
  //   console.log("leve", newGame.getLevels());
  //   console.log("lenf", output.innerHTML.length);
  //   console.log(event.target.textContent);
  output.innerHTML += `${event.target.textContent}`;
  if (output.innerHTML.length == newGame.getLevels()) {
    // console.log("inside");
    let enteredValues = output.innerHTML
      .split("")
      .map((item) => parseInt(item));

    newGame.getNumbersFromUser(enteredValues);
    // console.log(newGame.getEnteredNumber());
    mainContentV4.classList.remove("isActive");
    if (!newGame.endGame) {
      setNumber(newGame);
      return;
    }
    mainContentV4.classList.remove("isActive");
    mainContentV3.classList.remove("isActive");
    let finalResult = newGame.getLevels();
    mainContentV5.classList.add("isActive");
    result.innerHTML = `Your Score is : ${finalResult}`;
    localStorage.setItem(
      "data",
      JSON.stringify({ name: window.userName, score: finalResult })
    );
  }
}

inputNumbersField.forEach((item) => {
  item.addEventListener("click", addContentNumbers);
});

updateName.forEach((item) => {
  item.addEventListener("click", () => {
    mainContentV5.classList.remove("isActive");
    mainContentV2.classList.remove("isActive");
    mainContent.classList.remove("add-trans");
  });
});

leaderboard.forEach((item) => {
  item.addEventListener("click", () => {
    mainContentV5.classList.remove("isActive");
    mainContentV2.classList.remove("isActive");
    mainContentV6.classList.add("isActive");
  });
});

function setData() {
  let data = JSON.parse(localStorage.getItem("data"));
  console.log(data);
  if (data) {
    user.innerHTML = `${data.name}`;
    score.innerHTML = `${data.score}`;
  }
}
setData();
