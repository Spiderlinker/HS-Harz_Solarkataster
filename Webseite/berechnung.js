var roofAngle = document.getElementById("roofAngle").nodeValue;
var roofOrientation = document.getElementById("roofOrientation").nodeValue;
var roofSurface = document.getElementById("roofSurface").nodeValue;

var dailyElectricityConsumption = document.getElementById("dailyConsumption");

var eegCosts = document.getElementById("eegCostShare").nodeValue;
var electricityCosts = document.getElementById("electricityCosts").nodeValue;

var minimumCostsTotal = document.getElementById("minimumCostsTotal").nodeValue;
var maximumCostsTotal = document.getElementById("maximumCostsTotal").nodeValue;

function readElectricityConsumption(n){
    if(n == "monthly"){
        var januaryConsumption = document.getElementById("januaryConsumption").nodeValue;
        var februaryConsumption = document.getElementById("februaryConsumption").nodeValue;
        var marchConsumption = document.getElementById("marchConsumption").nodeValue;
        var aprilConsumption = document.getElementById("aprilConsumption").nodeValue;
        var mayConsumption = document.getElementById("mayConsumption").nodeValue;
        var juneConsumption = document.getElementById("juneConsumption").nodeValue;
        var julyConsumption = document.getElementById("julyConsumption").nodeValue;
        var augustConsumption = document.getElementById("augustConsumption").nodeValue;
        var septemberConsumption = document.getElementById("septemberConsumption").nodeValue;
        var octoberConsumption = document.getElementById("octoberConsumption").nodeValue;
        var novemberConsumption = document.getElementById("novemberConsumption").nodeValue;
        var decemberConsumption = document.getElementById("decemberConsumption").nodeValue;
    }
    else{
        var yearlyConsumption = document.getElementById("yearlyConsumption").nodeValue;
        calculateWithYearlyValues(yearlyConsumption);
    }
}

function calculateWithMonthlyValues(n){

}

function calculateWithYearlyValues(n){

}