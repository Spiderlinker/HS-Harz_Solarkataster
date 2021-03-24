var roofAngle = document.getElementById("roofAngle").value;
var roofOrientation = document.getElementById("roofOrientation").value;
var roofSurface = document.getElementById("roofSurface").value;

readElectricityConsumption(document.getElementsByClassName("tabcontent"));
var dailyElectricityConsumption = document.getElementById("dailyConsumption");

var eegCosts = document.getElementById("eegCostShare").value;
var electricityCosts = document.getElementById("electricityCosts").value;

var minimumCostsTotal = document.getElementById("minimumCostsTotal").value;
var maximumCostsTotal = document.getElementById("maximumCostsTotal").value;

//default values (for now)
//irradiation (Einstrahlung)
var irradiation = 1049.43;
//peak efficiency (Peakleistung)
var peakEfficiency = 200;
//degree of effectiveness (Wirkungsgrad)
var degreeOfEffectiveness = 20;
//TODO flaechenfaktor

function readElectricityConsumption(n){
    if(n.getElementById.value == "monthly"){
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
    //TODO
}

function calculateWithYearlyValues(n){
    //module efficiency per year

}