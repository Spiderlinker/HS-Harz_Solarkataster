
/*
 * Prozentwerte für den Strom, der tagsüber verbraucht wird.
 * Werte sind über ein Key-Value-Prinzip in dieser Variable hinterlegt
 */
var dailyConsumptionPercentageMap = {
  privateDaytime: 50,
  privateEvening: 35,
  privateSpreadOverDay: 25,

  commercialDaytime: 80,
  commercialEvening: 35,
  commercialSpreadOverDay: 25
}

/* 
 * Diese Methode aktiviert die gegebene RadioGroup. 
 * Alle anderen RadioGroups werden versteckt. Zudem wird der erste
 * RadioButtons der gegebenen RadioGroup selektiert.
 * 
 * @param evt Event des gedrückten RadioButtons
 * @param radioGroup Gruppe von RadioButtons, die aktiviert werden soll
 */
function radioButtonChecked(evt, radioGroup) {
  // Get all elements with class="radioGroup" and hide them
  var tabcontent = document.getElementsByClassName("radioGroup");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  var radioGroupToActivate = document.getElementById(radioGroup);
  radioGroupToActivate.style.display = "block"; // show radio group

  // select first element in radio group (if exists)
  var childElements = radioGroupToActivate.getElementsByTagName("input");
  if (childElements.length > 0) {
    childElements[0].click();
  }
}

/* 
 * Setzt die DailyConsumption in Prozent in das vorgesehene Textfeld.
 * Der zu setzende Wert wird aus der dailyConsumptionPercentageMap entnommen.
 * Der Key für den Wert aus der Map wird aus dem value des geklickten
 * RadioButtons entnommen.
 */
function setDailyConsumptionPercentage(event) {
  document.getElementById("consumption").value = dailyConsumptionPercentageMap[event.currentTarget.value];
}