// Displaying a 0 when the screen loads
window.onload = function () {
  const display = document.querySelector(".calc-display");
  display.textContent = "0";
};

// Selecting elements
class calcElement {
  constructor() {
    this.display = document.querySelector(".calc-display");
    this.numbers = document.querySelectorAll(".numbers");
    this.operators = document.querySelectorAll(".operators");
    this.answer = document.querySelector(".answer");
    this.clearEntry = document.querySelector(".clearEntry");
    this.delete = document.querySelector(".delete");
  
    // Adding event listeners
    this.numbers.forEach((number) => {
      number.addEventListener("click", () => {
        this.appendtodisplay(number.textContent);
      });
    });

    this.operators.forEach(operator => {
      operator.addEventListener('click', () => {
        this.appendtodisplay(operator.textContent);
      });
    });

    this.answer.addEventListener("click", () => {
      const expression = this.display.textContent;
      try {
        const result = eval(expression);
        this.display.textContent = result;
      } catch (error) {
        this.display.textContent = "Error";
      }
    });

    this.delete.addEventListener("click", () => {
      let currentDisplay = this.display.textContent;
      this.display.textContent = currentDisplay.slice(0, -1);
    });

    this.clearEntry.addEventListener("click", () => {
      this.display.textContent = "0";
    });

  }

  appendtodisplay(value) {
    if (this.display.textContent === "0" || this.display.textContent === "Error") {
      this.display.textContent = value;
    } else {
      this.display.textContent += value;
    }
  }
}

// Creating an instance of CalcElement
const calculator = new calcElement();