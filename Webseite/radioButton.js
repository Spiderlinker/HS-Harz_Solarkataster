"use strict"

// Optimal values for roofs. Values can be used for flat roofs
const OPTIMAL_ROOF_ANGLE = 30;
const OPTIMAL_ROOF_ORIENTATION = 180;

/*
 * Percentage values for electricity consumed during the day.
 * Values are stored in this variable via a key-value principle
 */
const dailyConsumptionPercentageMap = {
  privateDaytime: 50,
  privateEvening: 35,
  privateSpreadOverDay: 25,

  commercialDaytime: 80,
  commercialEvening: 35,
  commercialSpreadOverDay: 25
}

/* 
 * This method activates the given RadioGroup. 
 * All other RadioGroups are hidden. In addition, 
 * the first RadioButtons of the given RadioGroup is selected.
 * 
 * @param evt Event of pressed RadioButtons
 * @param radioGroup Group of RadioButtons, which should be activated
 */
function radioButtonChecked(evt, radioGroup) {
  // Get all elements with class="radioGroup" and hide them
  let tabcontent = document.getElementsByClassName(evt.currentTarget.getAttribute("group"));
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  let radioGroupToActivate = document.getElementById(radioGroup);
  radioGroupToActivate.style.display = "block"; // show radio group

  if (radioGroupToActivate.getAttribute("selectFirstInput")) {
    // select first element in radio group (if exists)
    let childElements = radioGroupToActivate.getElementsByTagName("input");
    if (childElements.length > 0) {
      childElements[0].click();
    }
  }
}

function setDefaultRoofValues(){
  document.getElementById("roofAngle").value = OPTIMAL_ROOF_ANGLE;
  document.getElementById("roofOrientation").value = OPTIMAL_ROOF_ORIENTATION;
}

/* 
 * Sets the DailyConsumption in percent in the text field provided.
 * The value to be set is taken from the dailyConsumptionPercentageMap. 
 * The key for the value from the map is taken from the value of the clicked RadioButton.
 */
function setDailyConsumptionPercentage(event) {
  document.getElementById("dailyConsumption").value = dailyConsumptionPercentageMap[event.currentTarget.value];
}