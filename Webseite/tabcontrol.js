"use strict"

let currentTab = 0; // Current tab is set to be the first tab (0)

const TAB_INFO = 0;
const TAB_ROOF = TAB_INFO + 1;
const TAB_COMSUMPTION = TAB_ROOF + 1;
const TAB_COSTS = TAB_COMSUMPTION + 1;
const TAB_SUMMARY = TAB_COSTS + 1;

showTab(currentTab); // Display the current tab

function showTab(n) {
  console.log("showTab")
  // This function will display the specified tab of the form...
  let tabs = document.getElementsByClassName("tab");
  tabs[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  document.getElementById("nextBtn").style.display = "inline";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == TAB_COSTS) {
    document.getElementById("nextBtn").innerHTML = "Berechnen";
  } else {
    document.getElementById("nextBtn").innerHTML = "Weiter";
  }

  if(n == TAB_SUMMARY){
    document.getElementById("nextBtn").style.display = "none";
    calculate();
  }

  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  console.log("nextPrev: " + n)
  // This function will figure out which tab to display
  let tabs = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  tabs[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= tabs.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  console.log("validate form")
  // This function deals with validation of the form fields
  let tabs = document.getElementsByClassName("tab");
  let inputFields = tabs[currentTab].getElementsByTagName("input");
  let valid = true;

  // Consumption tab is a special case
  // The form is valid if
  // EITHER all monthly consumption values were entered
  // OR the yearly consumption value was entered
  if (currentTab == TAB_COMSUMPTION) {
    console.log("consumption tab validation")
    valid = isConsumptionTabValid();
    finishStep(valid);
    return valid;
  }

  // A loop that checks every input field in the current tab:
  for (let i = 0; i < inputFields.length; i++) {
    // If a field is empty...
    if (inputFields[i].value == "") {
      console.log("invalid form: " + inputFields[i])
      // add an "invalid" class to the field:
      inputFields[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  console.log("finish step " + valid)
  finishStep(valid);
  return valid; // return the valid status
}

function isConsumptionTabValid() {
  let valid = true;
  let inputFields;

  // ++++ Check TabPane ++++
  // +++++++++++++++++++++++

  // Is monthly or yearly electricity consumption selected?
  let monthlyComsumption = document.getElementById("btnMonthlyTab");
  let tabToCheck;
  if (monthlyComsumption.className.includes("active")) {
    // monthly electricity consumption selected
    tabToCheck = document.getElementById("monthly");
  }
  else {
    // monthly electricity consumption is not selected,
    // so the annual consumption must be active.
    tabToCheck = document.getElementById("yearly");
  }

  inputFields = tabToCheck.getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (let i = 0; i < inputFields.length; i++) {
    // If a field is empty...
    if (inputFields[i].value == "") {
      // add an "invalid" class to the field:
      inputFields[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }

  // ++++ Check Last InputField ++++
  // +++++++++++++++++++++++++++++++

  // auch noch das letzte Eingabefeld prüfen
  let consumptionField = document.getElementById("dailyConsumption");
  if (consumptionField.value == "") {
    // add an "invalid" class to the field:
    consumptionField.className += " invalid";
    // and set the current valid status to false
    valid = false;
  }
  return valid;
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  let x = document.getElementsByClassName("step");
  for (let i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

function finishStep(valid) {
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
}

function switchTab(evt, tabName) {
  // Declare all variables
  let i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

