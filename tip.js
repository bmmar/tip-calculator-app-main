const billAmount = document.querySelector("#currency-field");
const billEntryField = document.querySelector(".bill-amount");
const fivePerCent = document.querySelector(".five-pc");
const tenPerCent = document.querySelector(".ten-pc");
const fifteenPerCent = document.querySelector(".fifteen-pc");
const twentyFivePerCent = document.querySelector(".twenty-five-pc");
const fiftyPerCent = document.querySelector(".fifty-pc");
const customPerCent = document.querySelector(".custom-pc");
const allPercentBtns = document.querySelectorAll(".percentages button");
const numPeople = document.querySelector(".num-people");
const tip = document.querySelector(".tip-per-person-amount");
const totalPerPerson = document.querySelector(".total-per-person-amount");
const resetBtn = document.querySelector(".reset-button");
const billErrorMsg = document.querySelector("span.bill-error-msg");
const peopleErrorMsg = document.querySelector(".people-error-msg");
const numPeopleEntryField = document.querySelector(".num-people-input");
const customPCEntry = document.querySelector("#custom-percent");

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

let percent = 0;
let tipAmount = 0;
let total = 0;

// Working.  Now some details to cover.
// The reset button should perhaps "indent" when clicked
// Develop a routine for the custom %age button

billAmount.addEventListener("blur", () => {
  console.log(billAmount.value);
  billAmount.value = parseFloat(billAmount.value);
});

fivePerCent.addEventListener("click", () => {
  clearBtnSelection();
  fivePerCent.classList.add("percent-clicked");
  percent = 5;
  calculate();
});
tenPerCent.addEventListener("click", () => {
  clearBtnSelection();
  tenPerCent.classList.add("percent-clicked");
  percent = 10;
  calculate();
});
fifteenPerCent.addEventListener("click", () => {
  clearBtnSelection();
  percent = 15;
  fifteenPerCent.classList.add("percent-clicked");
  calculate();
});
twentyFivePerCent.addEventListener("click", () => {
  clearBtnSelection();
  twentyFivePerCent.classList.add("percent-clicked");
  percent = 25;
  calculate();
});
fiftyPerCent.addEventListener("click", () => {
  clearBtnSelection();
  fiftyPerCent.classList.add("percent-clicked");
  percent = 50;
  calculate();
});
customPerCent.addEventListener("click", () => {
  clearBtnSelection();
  customPCEntry.classList.add("custom-percent-clicked");
  percent = parseInt(customPCEntry.value);
  console.log("custom percent is: " + percent);
  calculate();
});

customPCEntry.addEventListener("input", () => {
  percent = parseInt(customPCEntry.value);
  console.log("custom percent is: " + percent);
  calculate();
});

numPeople.addEventListener("input", () => {
  calculate();
});

resetBtn.addEventListener("click", () => {
  clearBtnSelection();
  billAmount.value = "0.00";
  numPeople.value = "0";
  tip.textContent = "0.00";
  totalPerPerson.textContent = "0.00";
});

function clearBtnSelection() {
  for (let i = 0; i < allPercentBtns.length; i++) {
    if (allPercentBtns[i].classList.contains("percent-clicked")) {
      allPercentBtns[i].classList.remove("percent-clicked");
    }
    if (customPCEntry.classList.contains("custom-percent-clicked")) {
      customPCEntry.classList.remove("custom-percent-clicked");
    }
  }
}

function calculate() {
  if (percent === 0 || isNaN(percent)) {
    tipAmount = 0;
  } else {
    tipAmount = billAmount.value * (percent / 100);
  }  
  bill = parseFloat(billAmount.value);
  total = bill + tipAmount;

  if (validateAll()) {
    tip.textContent = "$" + formatter.format(tipAmount / numPeople.value);
    totalPerPerson.textContent =
      "$" + formatter.format(total / numPeople.value);
  }
}

function validateAll() {
  if (bill > 50000) {
    billEntryField.classList.add("bill-amount-error");
    billErrorMsg.textContent = "Can't be > $50000";
    billErrorMsg.classList.add("active");
    return false;

  } else if (bill === 0 || isNaN(bill)) { 
    billEntryField.classList.add("bill-amount-error");
    billErrorMsg.textContent = "Can't be 0";
    billErrorMsg.classList.add("active");
    return false;
  }
  else if (billErrorMsg.classList.contains("active")) {
    billErrorMsg.classList.remove("active");
    billEntryField.classList.remove("bill-amount-error");
  }
  if (numPeople.value === 0 || numPeople.value === "") {
    console.log("People cannot be zero");
    peopleErrorMsg.classList.add("active");
    numPeopleEntryField.classList.add("num-people-error");
    return false;
  } else if (peopleErrorMsg.classList.contains("active")) {
    peopleErrorMsg.classList.remove("active");
    numPeopleEntryField.classList.remove("num-people-error");
  }
  return true;
}
