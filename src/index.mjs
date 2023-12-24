class Game {
  constructor(container) {
    this.container = container;
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  start() {
    this.updateLevel(1);
  }

  handleMenuClick = function (event) {
    switch (event.target.dataset?.val) {
      case "2":
        console.log("Will Show Leaderboard Now...");
        break;
      case "3":
        this.name = prompt("Enter name to be updated:") || "Guest";
        this.displayMenu();
    }
  }.bind(this);

  displayMenu() {
    this.container.innerHTML = `Welcome ${this.name},`;
    this.container.removeEventListener("click", this.handleMenuClick);
    this.container.addEventListener("click", this.handleMenuClick);
  }
  updateLevel(level = 1) {
    this.generatedNumbers = [];
    this.enteredNumbers = [];
    this.level = level;
    this.endGame = false;
    this.generateNumbersForLevel();
  }

  generateNumbersForLevel() {
    for (let i = 0; i < this.level; i++) {
      this.generatedNumbers.push(this.randomNumber());
    }
  }

  displayNumbersForLevel() {
    for (let i = 0; i < this.level; i++) {
      this.generatedNumbers[i];
    }
  }

  getNumbersFromLevel() {
    return this.generatedNumbers;
  }

  getLevels() {
    return this.level;
  }

  getNumbersFromUser(number) {
    for (let i = 0; i < this.level; i++) {
      let enteredValue = number;
      console.log({ enteredValue });
      if (enteredValue === "" || enteredValue === null) {
        enteredValue = NaN;
      }
      this.enteredNumbers = number;
    }
    this.gameLoop();
  }

  getEnteredNumber() {
    return this.enteredNumbers;
  }

  verifyLevel() {
    for (let i = 0; i < this.level; i++) {
      console.log(this.enteredNumbers, this.generatedNumbers, this.level);
      if (this.enteredNumbers[i] !== this.generatedNumbers[i]) return false;
    }
    return true;
  }

  gameLoop() {
    this.verifyLevel();
    console.log(this.verifyLevel());
    if (this.verifyLevel()) {
      this.updateLevel(this.level + 1);
      this.enteredNumbers = [];
      this.generatedNumbers = [];
      this.generateNumbersForLevel();
    } else {
      this.endGame = true;
    }
  }
}

window.Game = Game;
