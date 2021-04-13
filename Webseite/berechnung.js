/*
input values from website
*/
var roofAngle = document.getElementById("roofAngle").value;
roundRoofAngle();
var roofOrientation = document.getElementById("roofOrientation").value;
var roofSurface = document.getElementById("roofSurface").value;

readElectricityConsumption(document.getElementsByClassName("tabcontent"));
var dailyElectricityConsumption = document.getElementById("dailyConsumption");

var eegCosts = document.getElementById("eegCostShare").value;
var electricityCosts = document.getElementById("electricityCosts").value;

var minimumCostsTotal = document.getElementById("minimumCostsTotal").value;
var maximumCostsTotal = document.getElementById("maximumCostsTotal").value;

/*
default values (for now)
*/

var neededRoofAreaPerModule = 1.6;
//irradiation (Einstrahlung)
var irradiation = 1049.43;
//peak efficiency (Peakleistung)
var peakEfficiency = 200;
//degree of effectiveness (Wirkungsgrad)
var degreeOfEffectiveness = 20;
//area factor table (Flächenfaktor)
var areaFactorTable = [
        [100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100],
        [90,91,92,93,94,95,100,102,104,105,107,108,108,108,107,105,104,102,100,95,94,93,92,91,90],
        [79,80,82,85,89,94,97,102,106,109,112,113,113,113,112,109,106,102,97,94,89,85,82,80,79],
        [69,70,72,76,82,88,95,100,106,110,113,114,115,114,113,110,106,100,95,88,82,76,72,70,69],
        [59,60,63,68,75,84,90,97,104,109,112,117,118,117,112,109,104,97,90,84,75,68,63,60,59],
        [49,51,55,61,69,77,85,93,101,106,112,115,116,115,112,106,101,93,85,77,69,61,55,51,49],
        [42,44,48,55,64,72,80,87,95,102,107,110,111,110,107,102,95,87,80,72,64,55,48,44,42],
        [38,39,44,50,47,65,74,81,89,95,100,103,104,103,100,95,89,81,74,65,47,50,44,39,38],
        [36,37,41,46,52,60,67,75,81,87,92,94,95,94,92,87,81,75,67,60,52,46,41,37,36],
        [33,34,37,43,48,54,61,67,74,78,83,84,85,84,83,78,74,67,61,54,48,43,37,34,33]   
    ];
//amortization
var minCostPerModule = 250;
var maxCostPerModule = 450;

/*
values that need to be calculated
*/
var pvEfficiencyPerModule;
var neededAmountOfModules;
var neededRoofAreaTotal;
var savedElectricityCostsTotal;
var eegCostsTotal;
var revenueTotal; 
var amortizationMin;
var amortizationMax;

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

//calculate all needed values with monthly consumption values
function calculateWithMonthlyValues(n){
    //TODO
}

//calculate all needed values with a yearly consumption value
function calculateWithYearlyValues(n){
    calculatePVEfficiency();
    calculateNeededModules(n);

    //electricity revenue
    var electricityProduced = irradiation*areaFactor*((peakEfficiency*neededAmountOfModules)/1000)*(1-(degreeOfEffectiveness/100));
    var dailyConsumption = n*(dailyElectricityConsumption/100);
    //electricityCostsTotal
    savedElectricityCostsTotal = calculateSavedElectricityCosts(electricityProduced, dailyConsumption);
    //eeg
    eegCostsTotal = calculateEEGCosts(electricityProduced,dailyConsumption);
    //revenue
    revenueTotal = electricityProduced - dailyConsumption;
    //min and max amortization
    amortizationMin = calculateAmortization(minCostPerModule);
    amortizationMax = calculateAmortization(maxCostPerModule);
}

function calculateAmortization(moduleCosts){
    amortizationYear0 = moduleCosts * neededAmountOfModules;
    amortizationYear1 = amortizationYear0 - revenueTotal + (0,01 * amortizationYear0);
    return amortizationYear0 / (amortizationYear0 - amortizationYear1);
}

function calculatePVEfficiency(){
    //Calculate pv efficiency per module
    var areaFactor = areaFactorTable[getIndexRoofAngle()][getIndexRoofOrientation()]/100;
    pvEfficiencyPerModule = irradiation*areaFactor*(peakEfficiency/1000)*(1-(degreeOfEffectiveness/100));
}

function calculateNeededModules(n){
    //Calculate amounts of needed modules and area
    neededAmountOfModules = n/pvEfficiencyPerModule;
    neededRoofAreaTotal = neededAmountOfModules*neededRoofAreaPerModule;
}

function calculateSavedElectricityCosts(pvEffiency, dailyConsumption){
    if(pvEffiency-dailyConsumption >= 0){
        return dailyConsumption*electricityCosts;
    }
    else{
        return pvEffiency*electricityCosts;
    }
}

function calculateEEGCosts(pvEffiency, dailyConsumption){
    if(pvEffiency > dailyConsumption){
        return (pvEffiency-dailyConsumption)*eegCosts;
    }
    else{
        return 0;
    }
}

//rounds the roof angle according to the factor table
function roundRoofAngle(){
    if(roofAngle < 5)
        roofAngle = 0;
    else if(roofAngle >= 5 && roofAngle < 15)
        roofAngle = 10;
    else if(roofAngle >= 15 && roofAngle < 25)
        roofAngle = 20;
    else if(roofAngle >= 25 && roofAngle < 35)
        roofAngle = 30;
    else if(roofAngle >= 35 && roofAngle < 45)
        roofAngle = 40;
    else if(roofAngle >= 45 && roofAngle < 55)
        roofAngle = 50;
    else if(roofAngle >= 55 && roofAngle < 65)
        roofAngle = 60;
    else if(roofAngle >= 65 && roofAngle < 75)
        roofAngle = 70;
    else if(roofAngle >= 75 && roofAngle < 85)
        roofAngle = 80;
    else if(roofAngle >= 85)
        roofAngle = 90;
}
//returns the index of the roof orientation for the area factor table
function getIndexRoofOrientation(){
    //TODO round roof angle
    var indexRoofOrientation;
    switch(roofOrientation){
        case 0:
            indexRoofOrientation = 0;
            break;
        case 15:
            indexRoofOrientation = 1;
            break;
        case 30:
            indexRoofOrientation = 2;
            break;
        case 45:
            indexRoofOrientation = 3;
            break;
        case 60:
            indexRoofOrientation = 4;
            break;
        case 75:
            indexRoofOrientation = 5;
            break;
        case 90:
            indexRoofOrientation = 6;
            break;
        case 105:
            indexRoofOrientation = 7;
            break;
        case 120:
            indexRoofOrientation = 8;
            break;
        case 135:
            indexRoofOrientation = 9;
            break;
        case 150:
            indexRoofOrientation = 10;
            break;
        case 165:
            indexRoofOrientation = 11;
            break;
        case 180:
            indexRoofOrientation = 12;
            break;
        case 195:
            indexRoofOrientation = 13;
            break;
        case 210:
            indexRoofOrientation = 14;
            break;
        case 225:
            indexRoofOrientation = 15;
            break;
        case 240:
            indexRoofOrientation = 16;
            break;
        case 255:
            indexRoofOrientation = 17;
            break;
        case 270:
            indexRoofOrientation = 18;
            break;
        case 285:
            indexRoofOrientation = 19;
            break;
        case 300:
            indexRoofOrientation = 20;
            break;
        case 315:
            indexRoofOrientation = 21;
            break;
        case 330:
            indexRoofOrientation = 22;
            break;
        case 345:
            indexRoofOrientation = 23;
            break;
        case 360:
            indexRoofOrientation = 24;
            break;
    }
    return indexRoofOrientation;
}

//returns the index of the roof angle for the area factor table
function getIndexRoofAngle(){
    //TODO round roof angle
    var indexRoofAngle;
    switch(roofAngle){
        case 0:
            indexRoofAngle = 0;
            break;
        case 10:
            indexRoofAngle = 1;
            break;
        case 20:
            indexRoofAngle = 2;
            break;
        case 30:
            indexRoofAngle = 3;
            break;
        case 40:
            indexRoofAngle = 4;
            break;
        case 50:
            indexRoofAngle = 5;
            break;
        case 60:
            indexRoofAngle = 6;
            break;
        case 70:
            indexRoofAngle = 7;
            break;
        case 80:
            indexRoofAngle = 8;
            break;
        case 90:
            indexRoofAngle = 9;
            break;
    }
    return indexRoofAngle;
}