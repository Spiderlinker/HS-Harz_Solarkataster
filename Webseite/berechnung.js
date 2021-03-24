var roofAngle = document.getElementById("roofAngle").value;
var roofOrientation = document.getElementById("roofOrientation").value;
var roofSurface = document.getElementById("roofSurface").value;

var dailyElectricityConsumption = document.getElementById("dailyConsumption");

var eegCosts = document.getElementById("eegCostShare").value;
var electricityCosts = document.getElementById("electricityCosts").value;

var minimumCostsTotal = document.getElementById("minimumCostsTotal").value;
var maximumCostsTotal = document.getElementById("maximumCostsTotal").value;

function readElectricityConsumption(n){
    if(n == "monthly"){
        var januaryConsumption = document.getElementById("januaryConsumption").value;
        var februaryConsumption = document.getElementById("februaryConsumption").value;
        var marchConsumption = document.getElementById("marchConsumption").value;
        var aprilConsumption = document.getElementById("aprilConsumption").value;
        var mayConsumption = document.getElementById("mayConsumption").value;
        var juneConsumption = document.getElementById("juneConsumption").value;
        var julyConsumption = document.getElementById("julyConsumption").value;
        var augustConsumption = document.getElementById("augustConsumption").value;
        var septemberConsumption = document.getElementById("septemberConsumption").value;
        var octoberConsumption = document.getElementById("octoberConsumption").value;
        var novemberConsumption = document.getElementById("novemberConsumption").value;
        var decemberConsumption = document.getElementById("decemberConsumption").value;
    }
    else{
        var yearlyConsumption = document.getElementById("yearlyConsumption").value;
        calculateWithYearlyValues(yearlyConsumption);
    }
}

function calculateWithMonthlyValues(n){

}

function calculateWithYearlyValues(n){

}