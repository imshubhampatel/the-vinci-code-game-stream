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
    this.generateNumbersForLevel();
  }

  generateNumbersForLevel() {
    for (let i = 0; i < this.level; i++) {
      this.generatedNumbers.push(this.randomNumber());
    }
  }

  displayNumbersForLevel() {
    for (let i = 0; i < this.level; i++) {
      let randomNumber = document.getElementById("random-no");
      mainContentV3.classList.add("isActive");
      randomNumber.innerHTML = this.generatedNumbers[i];
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
      let enteredValue = parseInt(number);
      if (enteredValue === "" || enteredValue === null) {
        enteredValue = NaN;
      }
      this.enteredNumbers.push(Number(enteredValue));
    }
  }
  getEnteredNumber() {
    return this.enteredNumbers;
  }

  verifyLevel() {
    for (let i = 0; i < this.level; i++) {
      if (this.enteredNumbers[i] !== this.generatedNumbers[i]) return false;
    }
    return true;
  }

  gameLoop() {
    this.generateNumbersForLevel();
    this.displayNumbersForLevel();
    this.getNumbersFromUser();
    if (this.verifyLevel()) {
      this.updateLevel(this.level + 1);
      this.gameLoop();
    } else {
      alert(`Your score is: ${this.level}`);
    }
  }
}

window.Game = Game;
