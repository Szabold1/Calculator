// VARIABLES
const displaySmall = document.querySelector(".display-small");
const displayBig = document.querySelector(".display-big");
const acBtn = document.querySelector(".ac");
const plusMinusBtn = document.querySelector(".plus-minus");
const percentBtn = document.querySelector(".percent");
const decimalPointBtn = document.querySelector(".decimal-point");

const numberBtns = document.querySelectorAll(".num");
const operatorBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector(".equal");

let operator = "";
let previousNumber = "";
let currentNumber = "";
let equalSign = "";
let result = "";
let lastBtnClicked = "";

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

function setDisplays() {
  displaySmall.textContent = `${previousNumber} ${operator} ${currentNumber} ${equalSign}`;
  displayBig.textContent = result;
}

function setResult() {
  result = operate(operator, Number(previousNumber), Number(currentNumber));
  if (typeof result === "number" && !Number.isInteger(result)) {
    result = Math.round((result + Number.EPSILON) * 1000) / 1000;
  }
  if (
    result === Infinity ||
    result === -Infinity ||
    previousNumber === "Error"
  ) {
    result = "Error";
  }
}

// EVENT LISTENERS

// NUMBER BUTTONS
numberBtns.forEach((num) => {
  num.addEventListener("click", (e) => {
    currentNumber += e.target.textContent;
    setResult();
    setDisplays();
    lastBtnClicked = "number";
  });
});

// OPERATOR BUTTONS
operatorBtns.forEach((op) => {
  op.addEventListener("click", (e) => {
    if (currentNumber.toString().endsWith(".")) {
      currentNumber = currentNumber.slice(0, -1);
    }
    if (currentNumber !== "") {
      if (previousNumber === "") {
        previousNumber = currentNumber;
        currentNumber = "";
      } else {
        setResult();
        previousNumber = result;
        result = "";
        currentNumber = "";
      }
      equalSign = "";
      operator = e.target.textContent;
      setDisplays();
      lastBtnClicked = "operator";
    }
  });
});

// EQUAL BUTTON
equalBtn.addEventListener("click", (e) => {
  if (currentNumber && previousNumber) {
    equalSign = e.target.textContent;
    setResult();
    setDisplays();
    lastBtnClicked = "equal";
  }
});

// AC BUTTON
acBtn.addEventListener("click", () => {
  previousNumber = "";
  operator = "";
  currentNumber = "";
  equalSign = "";
  result = "";
  lastBtnClicked = "";
  setDisplays();
});

// PLUS - MINUS BUTTON
plusMinusBtn.addEventListener("click", () => {
  if (lastBtnClicked === "number") {
    currentNumber *= -1;
    setResult();
    setDisplays();
  }
  if (lastBtnClicked === "decimal") {
    currentNumber *= -1;
    setResult();
    currentNumber += ".";
    setDisplays();
  }
});

percentBtn.addEventListener("click", () => {
  if (lastBtnClicked === "number" || lastBtnClicked === "decimal") {
    if (currentNumber.toString().endsWith(".")) {
      currentNumber = currentNumber.slice(0, -1);
    }
    currentNumber /= 100;
    setResult();
    setDisplays();
  }
});

// DECIMAL POINT BUTTON
decimalPointBtn.addEventListener("click", () => {
  if (lastBtnClicked === "number" && !currentNumber.toString().includes(".")) {
    currentNumber += ".";
    setDisplays();
    lastBtnClicked = "decimal";
  }
});
