"use strict"

// name of php-file which performs PVGIS query
const PVGIS_PHP_REQUEST_FILE = "pvgis.php";
const NUMBER_OF_MONTH = 12;

function getTotalAverageIrradiation(latitude, longitude, callback){
    getAverageIrradiationPerMonth(latitude, longitude, response => callback(sumArray(response)));
}

function getAverageIrradiationPerMonth(latitude, longitude, callback) {
    // Call the function of the PHP file to query the PVGIS.
    $.ajax({
        type: "POST",
        // PHP-File contains PVGIS-Query,
        // Call PHP-function  
        url: PVGIS_PHP_REQUEST_FILE,
        dataType: 'json',
        // Pass parameters to php file
        data: { lat: latitude, lon: longitude }
        // parse returned answer of called method
    }).done(response => {
        const processedResponse = extractMonthlyAverageIrradiationFromJSON(response.data);
        callback(processedResponse);
    });
}

function extractMonthlyAverageIrradiationFromJSON(json) {
    // needed values are expected in json @ json -> outputs -> monthly
    const rawMonthlyIrradiation = json.outputs.monthly;

    // create array for average monthly irradiation 
    // each array-celll represents a month
    // starting at 0 = January to 11 = December
    const averageMonthlyIrradiation = Array(NUMBER_OF_MONTH).fill(0);

    // Sort irradiation by month and sum up
    for (let i = 0; i < rawMonthlyIrradiation.length; i++) {
        let currentIrradiation = rawMonthlyIrradiation[i];
        averageMonthlyIrradiation[currentIrradiation.month - 1] += currentIrradiation['H(h)_m'];
    }

    // calculate average monthly irradiation
    for (let i = 0; i < averageMonthlyIrradiation.length; i++) {
        // Number of years = number of all processed months (rawMonthlyIrradiation.length) 
        // divided by the number of month (12)
        averageMonthlyIrradiation[i] /= rawMonthlyIrradiation.length / NUMBER_OF_MONTH;
    }

    return averageMonthlyIrradiation;
}

function sumArray(arr){
    return arr.reduce((val1, val2) => val1 + val2, 0);
}