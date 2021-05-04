"use strict"

/*
    input values from website
*/
let roofAngle = 0;
let roofOrientation = 0;
let roofSurface = 0;

// let electricityConsumption = readElectricityConsumption(document.getElementsByClassName("tabcontent"));
let electricityConsumption = null;

//daily consumption profile (Tagesverbrauchsprofil)
let dailyConsumptionProfile = 0;

let eegPrice = 0;

let electricityCosts = 0;

let minimumCostsTotal = 0;
let maximumCostsTotal = 0;

/*
    Constants
*/
const MONTHLY = "monthly";
const YEARLY = "yearly";
const NUMBER_OF_MONTHS = 12;

const URL_PARAMS = new URLSearchParams(window.location.search);

/*
    default values (for now)
*/
let lat = URL_PARAMS.get('lat');
let lon = URL_PARAMS.get('lng');

//monthly portion of yearly consumption
let portionOfYearlyConsumption = [10.53, 8.93, 9.33, 8.31, 7.83, 7.02, 6.95, 7.14, 7.33, 8.33, 8.69, 9.61];

let neededRoofAreaPerModule = 1.6;
// Irradiation (Einstrahlung)
let totalIrradiation; // durchschnittliche Einstrahlung pro Jahr
let monthlyIrradiation; // durchschnittliche Einstrahlung pro Monat

//peak efficiency (Peakleistung)
let peakEfficiency = 200;
//degree of effectiveness (Wirkungsgrad)
let degreeOfEffectiveness = 20;
//area factor table (Flächenfaktor)
let areaFactorTable = [
    [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    [90, 91, 92, 93, 94, 95, 100, 102, 104, 105, 107, 108, 108, 108, 107, 105, 104, 102, 100, 95, 94, 93, 92, 91, 90],
    [79, 80, 82, 85, 89, 94, 97, 102, 106, 109, 112, 113, 113, 113, 112, 109, 106, 102, 97, 94, 89, 85, 82, 80, 79],
    [69, 70, 72, 76, 82, 88, 95, 100, 106, 110, 113, 114, 115, 114, 113, 110, 106, 100, 95, 88, 82, 76, 72, 70, 69],
    [59, 60, 63, 68, 75, 84, 90, 97, 104, 109, 112, 117, 118, 117, 112, 109, 104, 97, 90, 84, 75, 68, 63, 60, 59],
    [49, 51, 55, 61, 69, 77, 85, 93, 101, 106, 112, 115, 116, 115, 112, 106, 101, 93, 85, 77, 69, 61, 55, 51, 49],
    [42, 44, 48, 55, 64, 72, 80, 87, 95, 102, 107, 110, 111, 110, 107, 102, 95, 87, 80, 72, 64, 55, 48, 44, 42],
    [38, 39, 44, 50, 47, 65, 74, 81, 89, 95, 100, 103, 104, 103, 100, 95, 89, 81, 74, 65, 47, 50, 44, 39, 38],
    [36, 37, 41, 46, 52, 60, 67, 75, 81, 87, 92, 94, 95, 94, 92, 87, 81, 75, 67, 60, 52, 46, 41, 37, 36],
    [33, 34, 37, 43, 48, 54, 61, 67, 74, 78, 83, 84, 85, 84, 83, 78, 74, 67, 61, 54, 48, 43, 37, 34, 33]
];
let areaFactor = 0;
//amortization
let minCostPerModule = 250;
let maxCostPerModule = 450;

/*
    values that need to be calculated
*/
let monthlyConsumption = [];
let yearlyConsumption = 0;
//Tagesverbrauch
let dailyConsumptionTotal = 0;
let dailyConsumptionMonthly = [];
//Nachtverbrauch
let nightlyConsumptionMonthly = [];
//PV-Ertrag
let electricityRevenueTotal = 0;
let electricityRevenueMonthly = [];

let pvEfficiencyPerModule = 0;
let neededAmountOfModules = 0;
let neededRoofAreaTotal = 0;
//eingesparte Strombezugskosten
let savedElectricityCostsTotal = 0;
let savedElectricityCostsMonthly = [];
//EEG Umlage
let eegCostsTotal = 0;
let eegCostsMonthly = [];
//Euro
let revenueEuroTotal = 0;
let revenueEuroMonthly = [];
//Amortization
let amortizationMin = 0;
let amortizationMax = 0;

let amortizationMinYearlyCosts = [];
let amortizationMaxYearlyCosts = [];


function calculate() {
    readInputValues();
    getAverageIrradiationPerMonth(lat, lon, response => {
        monthlyIrradiation = response;
        totalIrradiation = sumArray(monthlyIrradiation);

        // Do not calculate until irradiation was queried

        calculateNeededValues(electricityConsumption);

        calculateAmortizationYearlyCosts();
        updateCharts();
    });
}

function readInputValues() {
    roofAngle = document.getElementById("roofAngle").value;
    roofOrientation = document.getElementById("roofOrientation").value;
    roofSurface = document.getElementById("roofSurface").value;

    // let electricityConsumption = readElectricityConsumption(document.getElementsByClassName("tabcontent"));
    electricityConsumption = readElectricityConsumption(document.getElementById("btnMonthlyTab"));

    // daily consumption profile (Tagesverbrauchsprofil)
    dailyConsumptionProfile = document.getElementById("dailyConsumption").value;

    eegPrice = parseInt(document.getElementById("eegCostShare").value) / 100; // durch 100 dividiert, da Angabe in ct
    electricityCosts = parseInt(document.getElementById("electricityCosts").value) / 100; // durch 100 dividiert, da Angabe in ct

    minCostPerModule = document.getElementById("minCostPerModule").value;
    maxCostPerModule = document.getElementById("maxCostPerModule").value;
    
    peakEfficiency = document.getElementById("peakPower").value;
    degreeOfEffectiveness = document.getElementById("moduleEfficiency").value;
}

function readElectricityConsumption(tabElement) {
    let consumption = [];

    if (tabElement.className.includes("active") == "monthly") {
        consumption["type"] = MONTHLY;
        consumption["data"] = [
            document.getElementById("januaryConsumption").value,
            document.getElementById("februaryConsumption").value,
            document.getElementById("marchConsumption").value,
            document.getElementById("aprilConsumption").value,
            document.getElementById("mayConsumption").value,
            document.getElementById("juneConsumption").value,
            document.getElementById("julyConsumption").value,
            document.getElementById("augustConsumption").value,
            document.getElementById("septemberConsumption").value,
            document.getElementById("octoberConsumption").value,
            document.getElementById("novemberConsumption").value,
            document.getElementById("decemberConsumption").value
        ]
    }
    else {
        consumption["type"] = YEARLY;
        consumption["data"] = document.getElementById("yearlyConsumption").value;
        //calculateWithYearlyValues(yearlyConsumption);
    }
    return consumption;
}


//calculate all needed values
function calculateNeededValues(electricityConsumption) {
    calculateMonthlyAndYearlyConsumptionValues(electricityConsumption);
    calculatePVEfficiency();
    calculateNeededModules(yearlyConsumption);

    //electricity revenue without irradiation
    const electricityRevenueFactor = areaFactor * ((peakEfficiency * neededAmountOfModules) / 1000) * (1 - (degreeOfEffectiveness / 100));
    calculateElectricityRevenue(electricityRevenueFactor);

    //saved electricity costs
    calculateAllSavedElectricityCosts();

    //eeg
    calculateAllEEGCosts();
    //revenue euro
    calculateRevenueEuro();

    //min and max amortization
    amortizationMin = calculateAmortization(minCostPerModule);
    amortizationMax = calculateAmortization(maxCostPerModule);
}

/*
calculate all monthly and yearly consumption values needed for further calculations
calculates: monthlyConsumption, dailyConsumptionMonthly, dailyConsumptionTotal, 
            nightlyConsumptionMonthly, yearlyConsumption
*/
function calculateMonthlyAndYearlyConsumptionValues(electricityConsumption) {
    //monthly consumption available
    if (electricityConsumption["type"] == MONTHLY) {
        monthlyConsumption = electricityConsumption["data"];
        for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
            dailyConsumptionMonthly[i] = monthlyConsumption[i] * (dailyConsumptionProfile / 100);
            dailyConsumptionTotal += dailyConsumptionMonthly[i];
        }
        //calculate yearly consumption
        yearlyConsumption = sumArray(monthlyConsumption);
    }
    //yearly consumption available
    else if (electricityConsumption["type"] == YEARLY) {
        for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
            monthlyConsumption[i] = electricityConsumption["data"] * (portionOfYearlyConsumption[i] / 100);
        }
        for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
            dailyConsumptionMonthly[i] = monthlyConsumption[i] * (dailyConsumptionProfile / 100);
        }
        dailyConsumptionTotal = electricityConsumption["data"] * (dailyConsumptionProfile / 100);
        yearlyConsumption = electricityConsumption["data"];
    }
    for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
        nightlyConsumptionMonthly[i] = monthlyConsumption[i] - dailyConsumptionMonthly[i];
    }

}

/*
calculate the pv efficiency per module
*/
function calculatePVEfficiency() {
    areaFactor = areaFactorTable[getIndexRoofAngle()][getIndexRoofOrientation()] / 100;
    pvEfficiencyPerModule = totalIrradiation * areaFactor * (peakEfficiency / 1000) * (1 - (degreeOfEffectiveness / 100));
}

/*
calculate amounts of needed modules and area needed for installation
*/
function calculateNeededModules(yearlyConsumption) {
    // Anzahl von Modulen aufrunden (ceil). Es git schließlich nur ganze Module ;)
    neededAmountOfModules = Math.ceil(yearlyConsumption / pvEfficiencyPerModule);
    neededRoofAreaTotal = neededAmountOfModules * neededRoofAreaPerModule;
}

/*
calculate electricity revenue 
*/
function calculateElectricityRevenue(electricityRevenueFactor) {
    for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
        electricityRevenueMonthly[i] = monthlyIrradiation[i] * electricityRevenueFactor;
    }
    electricityRevenueTotal = sumArray(electricityRevenueMonthly);
}

/*
calculate saved electricity costs for each month and the whole year
*/
function calculateAllSavedElectricityCosts() {
    for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
        savedElectricityCostsMonthly[i] = calculateSavedElectricityCosts(electricityRevenueMonthly[i], dailyConsumptionMonthly[i]);
    }
    savedElectricityCostsTotal = sumArray(savedElectricityCostsMonthly);
}

/*
calculate saved electricity costs
parameter electricityRevenue and dailyConsumption
*/
function calculateSavedElectricityCosts(electricityRevenue, dailyConsumption) {
    if (electricityRevenue - dailyConsumption >= 0) {
        return dailyConsumption * electricityCosts;
    }
    else {
        return electricityRevenue * electricityCosts;
    }
}

/*
calculate eeg costs for each month and the whole year
*/
function calculateAllEEGCosts() {
    for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
        eegCostsMonthly[i] = calculateEEGCosts(electricityRevenueMonthly[i], dailyConsumptionMonthly[i]);
    }
    eegCostsTotal = sumArray(eegCostsMonthly);
}

/*
calculate eeg costs
parameter pvRevenue and dailyConsumption
*/
function calculateEEGCosts(pvRevenue, dailyConsumption) {
    if (pvRevenue > dailyConsumption) {
        return (pvRevenue - dailyConsumption) * eegPrice;
    }
    else {
        return 0;
    }
}

/*
calculate revenue in euro for each month and the whole year
*/
function calculateRevenueEuro() {
    revenueEuroTotal = savedElectricityCostsTotal + eegCostsTotal;
    for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
        revenueEuroMonthly[i] = electricityRevenueMonthly[i] - dailyConsumptionMonthly[i];
    }
}

/*
calculate amortization time
parameter module cost
*/
function calculateAmortization(moduleCosts) {
    let amortizationYear0 = moduleCosts * neededAmountOfModules;
    let amortizationYear1 = amortizationYear0 - revenueEuroTotal + (0.01 * amortizationYear0);
    return amortizationYear0 / (amortizationYear0 - amortizationYear1);
}

//returns the index of the roof orientation for the area factor table
function getIndexRoofOrientation() {
    // * 15 not needed, it already returns the correct index
    // * 15 would round the value to the nearest 15-step value
    return Math.round(roofOrientation / 15)/* * 15 */;
}

//returns the index of the roof angle for the area factor table
function getIndexRoofAngle() {
    // * 10 not needed, it already returns the correct index
    // * 10 would round the value to the nearest 10-step value
    return Math.round(roofAngle / 10)/* * 10 */;
}

function calculateAmortizationYearlyCosts(){
    amortizationMinYearlyCosts[0] = minCostPerModule * neededAmountOfModules;
    for(let i = 1; i <= 20; i++){
        amortizationMinYearlyCosts[i] = amortizationMinYearlyCosts[i - 1] - revenueEuroTotal + 0.01 * amortizationMinYearlyCosts[0];
    }

    amortizationMaxYearlyCosts[0] = maxCostPerModule * neededAmountOfModules;
    for(let i = 1; i <= 20; i++){
        amortizationMaxYearlyCosts[i] = amortizationMaxYearlyCosts[i - 1] - revenueEuroTotal + 0.01 * amortizationMaxYearlyCosts[0];
    }
}

function updateCharts(){
    chartConsumptionPerMonth.update();
    chartPvYieldAndConsumption.update();
    chartAmortization.update();


    document.getElementById("lblNeededModules").textContent = neededAmountOfModules;
    document.getElementById("lblUsedRoofSurface").textContent = neededRoofAreaTotal;
    document.getElementById("lblMaxRoofSurface").textContent = roofSurface;
    document.getElementById("lblRoofOrientation").textContent = roofOrientation;
    document.getElementById("lblRoofAngle").textContent = roofAngle;

    document.getElementById("lblMinCostPerModule").textContent = minCostPerModule;
    document.getElementById("lblMinAmortization").textContent = Math.round(amortizationMin);
    document.getElementById("lblMaxCostPerModule").textContent = maxCostPerModule;
    document.getElementById("lblMaxAmortization").textContent = Math.round(amortizationMax);
    
}