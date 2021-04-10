var currentTab = 0; // Current tab is set to be the first tab (0)

var TAB_ROOF = 0;
var TAB_COMSUMPTION = 1;
var TAB_COSTS = 2;
var TAB_SUMMARY = 3;

showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var tabs = document.getElementsByClassName("tab");
  tabs[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (tabs.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Weiter";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var tabs = document.getElementsByClassName("tab");
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
  // This function deals with validation of the form fields
  var tabs = document.getElementsByClassName("tab");
  var inputFields = tabs[currentTab].getElementsByTagName("input");
  var valid = true;

  // Sonderfall bei dem Verbrauchstab
  // Hier ist die Form gültig, wenn
  // ENTWEDER alle monatlichen Verbrauchsdaten
  // ODER der jährliche Stromverbrauch eingetragen ist
  if (currentTab == TAB_COMSUMPTION) {
    valid = isConsumptionTabValid();
    finishStep(valid);
    return valid;
  }

  // A loop that checks every input field in the current tab:
  for (var i = 0; i < inputFields.length; i++) {
    // If a field is empty...
    if (inputFields[i].value == "") {
      // add an "invalid" class to the field:
      inputFields[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  finishStep(valid);
  return valid; // return the valid status
}

function isConsumptionTabValid() {
  var valid = true;
  var inputFields;

  // ++++ Check TabPane ++++
  // +++++++++++++++++++++++

  // Ist monatlich oder jährlicher Stromverbrauch ausgewählt?
  var monthlyComsumption = document.getElementById("monthlyTabButton");
  var tabToCheck;
  if (monthlyComsumption.className.includes("active")) {
    // monatlicher Stromverbrauch aktiviert
    tabToCheck = document.getElementById("monthly");
  }
  else {
    // monatlicher Stromverbrauch ist nicht angewählt,
    // dann muss der jährliche Verbrauch aktiv sein.
    tabToCheck = document.getElementById("yearly");
  }

  inputFields = tabToCheck.getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (var i = 0; i < inputFields.length; i++) {
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
  var consumptionField = document.getElementById("consumption");
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
  var x = document.getElementsByClassName("step");
  for (var i = 0; i < x.length; i++) {
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
  var i, tabcontent, tablinks;

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
