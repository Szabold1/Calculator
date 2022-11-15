// VARIABLES
let displaySmall = document.querySelector(".display-small");
let displayBig = document.querySelector(".display-big");

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
      operator = e.target.textContent;
      previousNumber = currentNumber;
      currentNumber = "";
      displaySmall.textContent = `${previousNumber} ${operator}`;
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
