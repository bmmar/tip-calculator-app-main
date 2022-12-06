const billAmount = document.querySelector("#currency-field");
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

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

let percent = 0;
let tipAmount = 0;
let total = 0;

// Working.  Now some details to cover.  Need to validate $ amount (leading zeroes, 5 decimal places etc.)
// Need to validate num of people entry with a  "cannot be zero" routine.
// The reset button should perhaps "indent" when clicked
// Develop a routine for the custom %age button
// And any valid combination of entries should display the calculated amounts.

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
  customPerCent.classList.add("percent-clicked");
  percent = 0;
  calculate();
});

numPeople.addEventListener("input", () => {
  calculate();
});

resetBtn.addEventListener("click", () => {
  clearBtnSelection();
  billAmount.value = "0.00";
  numPeople.value = "1";
});

function clearBtnSelection() {
  for (let i = 0; i < allPercentBtns.length; i++) {
    if (allPercentBtns[i].classList.contains("percent-clicked")) {
      allPercentBtns[i].classList.remove("percent-clicked");
    }
  }
}

function calculate() {
  tipAmount = billAmount.value * (percent / 100);
  bill = parseFloat(billAmount.value);
  total = bill + tipAmount;
  if (validateAll()) {
    tip.textContent = "$" + formatter.format(tipAmount / numPeople.value);
    totalPerPerson.textContent =
      "$" + formatter.format(total / numPeople.value);
    // console.log("Bill is for " + bill);
    // console.log("Tip at " + percent + "% is " + formatter.format(tipAmount));
    // console.log("Number of people: " + numPeople.value);
    // console.log(
    //   "Tip per person: " + formatter.format(tipAmount / numPeople.value)
    // );
    // console.log("Total per person: " + formatter.format(total / numPeople.value));
  }
}

function validateAll() {
  // if (bill > 50000) {
  //   console.log("Bill cannot be greater than $50000");
  //    return false;
  // }
  if (numPeople.value === 0 || numPeople.value === "") {
    console.log("Num people cannot be 0");
    return false;
  }
  return true;
}
