/*
input values from website
*/
var roofAngle = document.getElementById("roofAngle").value;
var roofOrientation = document.getElementById("roofOrientation").value;
var roofSurface = document.getElementById("roofSurface").value;

// var electricityConsumption = readElectricityConsumption(document.getElementsByClassName("tabcontent"));
var electricityConsumption = readElectricityConsumption(document.getElementById("monthlyTabButton"));

//%
var dailyElectricityConsumption = document.getElementById("dailyConsumption");

var eegCosts = document.getElementById("eegCostShare").value;
var electricityCosts = document.getElementById("electricityCosts").value;

var minimumCostsTotal = document.getElementById("minimumCostsTotal").value;
var maximumCostsTotal = document.getElementById("maximumCostsTotal").value;

/*
    Constants
*/
const MONTHLY = "monthly";
const YEARLY = "yearly";

/*
default values (for now)
*/
var lat = 51.844;
var lon = 10.806;

var portionOfYearlyConsumption = [10.53, 8.93, 9.33, 8.31, 7.83, 7.02, 6.95, 7.14, 7.33, 8.33, 8.69, 9.61];
var monthlyIrradiation = [10.30, 37.25, 77.22, 122.39, 148.76, 157.27, 159.68, 132.39, 95.39, 56.17, 25.42, 17.19];

var neededRoofAreaPerModule = 1.6;
//irradiation (Einstrahlung)
var irradiation;
//peak efficiency (Peakleistung)
var peakEfficiency = 200;
//degree of effectiveness (Wirkungsgrad)
var degreeOfEffectiveness = 20;
//area factor table (Flächenfaktor)
var areaFactorTable = [
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
//amortization
var minCostPerModule = 250;
var maxCostPerModule = 450;

/*
values that need to be calculated
*/
var monthlyConsumption;
var monthlyDailyConsumption;
var monthlyNightlyConsumption;
var dailyConsumptionTotal;
var electricityRevenueTotal;
var monthlyElectricityRevenue;
var pvEfficiencyPerModule;
var neededAmountOfModules;
var neededRoofAreaTotal;
var savedElectricityCostsTotal;
var monthlySavedElectricityCosts;
var eegCostsTotal;
var eegCostsMonthly;
var revenueEuroTotal;
var revenueEuroMonthly;
var amortizationMin;
var amortizationMax;

function readElectricityConsumption(n) {
    var consumption = [];

    if (n.className.includes("active") == "monthly") {
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

function calculate(){
    getAverageIrradiation(lat, lon, function(response){
        irradiation = response;

        // Do not calculate until irradiation was queried

//        if(electricityConsumption["type"] == MONTHLY){
//            calculateWithMonthlyValues(electricityConsumption["data"]);
//       }else {
//            calculateWithYearlyValues(electricityConsumption["data"]);
//        }
        //monthly consumption available
        if(electricityConsumption["type"] == MONTHLY){
            var yearlyConsumption = 0;
            monthlyConsumption = electricityConsumption["data"];
            for(let i = 0; i < 12; i++){
                monthlyDailyConsumption[i] = monthlyConsumption[i]*(dailyConsumption/100);
                dailyConsumptionTotal += monthlyDailyConsumption[i];
            }
            for(let i = 0; i < 12; i++){
                monthlyNightlyConsumption[i] = monthlyConsumption[i] - monthlyDailyConsumption[i];
            }
            //calculate yearly consumption
            for(let i = 0; i < 12; i++){
                yearlyConsumption += monthlyConsumption[i];
            }
            calculateWithYearlyValues(yearlyConsumption);
        }
        //yearly consumption available
        else if(electricityConsumption["type"] == YEARLY){
            for(let i = 0; i < 12; i++){
                monthlyConsumption[i] = electricityConsumption["data"] * (portionOfYearlyConsumption[i]/100);
            }
            for(let i = 0; i < 12; i++){
                monthlyDailyConsumption = monthlyConsumption[i]*(dailyConsumption/100);
            }
            for(let i = 0; i < 12; i++){
                monthlyNightlyConsumption = monthlyConsumption[i] - monthlyDailyConsumption[i];
            }
            dailyConsumptionTotal = electricityConsumption["data"] * (dailyElectricityConsumption / 100);
            calculateWithYearlyValues(electricityConsumption["data"]);
        }
        });
}

//calculate all needed values with a yearly consumption value
function calculateWithYearlyValues(yearlyConsumption) {
    calculatePVEfficiency();
    calculateNeededModules(yearlyConsumption);

    //electricity revenue without irradiation
    var electricityRevenueFactor = areaFactor * ((peakEfficiency * neededAmountOfModules) / 1000) * (1 - (degreeOfEffectiveness / 100));
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

function calculateRevenueEuro(){
    revenueEuroTotal = electricityRevenueTotal - dailyConsumptionTotal;
    for(let i = 0; i < 12; i++){
        revenueEuroMonthly[i] = monthlyElectricityRevenue[i] - monthlyDailyConsumption[i];
    }
}

function calculateAllEEGCosts(){
    eegCostsTotal = calculateEEGCosts(electricityRevenueTotal, dailyConsumptionTotal);
    for(let i = 0; i < 12; i++){
        eegCostsMonthly[i] = calculateEEGCosts(monthlyElectricityRevenue[i], monthlyDailyConsumption[i]);
    }
}
function calculateEEGCosts(pvRevenue, dailyConsumption) {
    if (pvRevenue > dailyConsumption) {
        return (pvRevenue - dailyConsumption) * eegCosts;
    }
    else {
        return 0;
    }
}

function calculateElectricityRevenue(electricityRevenueFactor){
    electricityRevenueTotal = irradiation * electricityRevenueFactor;
    for(let i = 0; i < 12; i++){
        monthlyElectricityRevenue[i] = monthlyIrradiation[i] * electricityRevenueFactor;
    }
}

function calculateAmortization(moduleCosts) {
    amortizationYear0 = moduleCosts * neededAmountOfModules;
    amortizationYear1 = amortizationYear0 - revenueEuroTotal + (0, 01 * amortizationYear0);
    return amortizationYear0 / (amortizationYear0 - amortizationYear1);
}

function calculatePVEfficiency() {
    //Calculate pv efficiency per module
    var areaFactor = areaFactorTable[getIndexRoofAngle()][getIndexRoofOrientation()] / 100;
    pvEfficiencyPerModule = irradiation * areaFactor * (peakEfficiency / 1000) * (1 - (degreeOfEffectiveness / 100));
}

function calculateNeededModules(yearlyConsumption) {
    //Calculate amounts of needed modules and area
    neededAmountOfModules = yearlyConsumption / pvEfficiencyPerModule;
    neededRoofAreaTotal = neededAmountOfModules * neededRoofAreaPerModule;
}

function calculateAllSavedElectricityCosts() {
    savedElectricityCostsTotal = calculateSavedElectricityCosts(electricityRevenueTotal, dailyConsumptionTotal);
    for(let i = 0; i < 12; i++){
        monthlySavedElectricityCosts[i] = calculateSavedElectricityCosts(monthlyElectricityRevenue[i], monthlyDailyConsumption[i]);
    }
}

function calculateSavedElectricityCosts(electricityRevenue, dailyConsumption){
    if (electricityRevenue - dailyConsumption >= 0) {
        return dailyConsumption * electricityCosts;
    }
    else {
        return electricityRevenue * electricityCosts;
    }
}

//returns the index of the roof orientation for the area factor table
function getIndexRoofOrientation() {    
    // * 15 not needed, it already returns the correct index
    // * 15 would round the value to the nearest 15-step value
    return round(roofOrientation / 15)/* * 15 */; 
}

//returns the index of the roof angle for the area factor table
function getIndexRoofAngle() {
    // * 10 not needed, it already returns the correct index
    // * 10 would round the value to the nearest 10-step value
    return round(roofAngle / 10)/* * 10 */; 
}