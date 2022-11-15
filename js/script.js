// VARIABLES
const displaySmall = document.querySelector(".display-small");
const displayBig = document.querySelector(".display-big");
const acBtn = document.querySelector(".ac");

let numberBtns = document.querySelectorAll(".num");
let operatorBtns = document.querySelectorAll(".operator");

let operator = "";
let previousNumber = "";
let currentNumber = "";

// FUNCTIONS
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "×":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
  }
}

// EVENT LISTENERS
numberBtns.forEach((num) => {
  num.addEventListener("click", (e) => {
    displayBig.textContent += e.target.textContent;
    currentNumber = displayBig.textContent;
  });
});

operatorBtns.forEach((op) => {
  op.addEventListener("click", (e) => {
    if (e.target.textContent !== "=") {
      if (previousNumber === "") {
        previousNumber = currentNumber;
      } else {
        previousNumber = operate(
          operator,
          Number(previousNumber),
          Number(currentNumber)
        );
      }
      operator = e.target.textContent;
      displaySmall.textContent = `${previousNumber} ${operator}`;
      currentNumber = "";
      displayBig.textContent = currentNumber;
    } else if (e.target.textContent === "=") {
      displaySmall.textContent += ` ${currentNumber} ${e.target.textContent}`;
      displayBig.textContent = operate(
        operator,
        Number(previousNumber),
        Number(currentNumber)
      );
    } else {
      displayBig.textContent = "ERROR";
    }
  });
});

acBtn.addEventListener("click", () => {
  displaySmall.textContent = "";
  displayBig.textContent = "";
  operator = "";
  previousNumber = "";
  currentNumber = "";
});
