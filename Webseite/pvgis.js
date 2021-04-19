"use strict"

// Name der PHP-Datei, die die Abfrage vom PVGIS durchführt
const PVGIS_PHP_REQUEST_FILE = "pvgis.php";
const NUMBER_OF_MONTH = 12;

function getAverageIrradiation(latitude, longitude, callback){
    getAverageIrradiation(latitude, longitude, response => callback(sumArray(response)));
}

function getAverageIrradiationPerMonth(latitude, longitude, callback) {
    // Funktion der PHP-Datei aufrufen, um Abfrage beim PVGIS vorzunehmen
    $.ajax({
        type: "POST",
        // PHP-Datei enthält PVGIS-Abfrage,
        // PHP-Funktion aufrufen 
        url: PVGIS_PHP_REQUEST_FILE,
        dataType: 'json',
        // Parameter für PHP-Datei übergeben
        data: { lat: latitude, lon: longitude }
        // Antwort von Methode parsen lassen
    }).done(response => {
        const processedResponse = extractMonthlyAverageIrradiationFromJSON(response.data);
        callback(processedResponse);
    });
}

function extractMonthlyAverageIrradiationFromJSON(json) {
    // Relevante Daten sind im JSON unter json -> outputs -> monthly
    const rawMonthlyIrradiation = json.outputs.monthly;

    // Array erstellen für monatliche durschnittliche Einstrahlung
    // Jede Array-Zelle repräsentiert dabei ein Monat
    // beginnend bei 0 = Januar und 11 = Dezember
    const averageMonthlyIrradiation = Array(NUMBER_OF_MONTH).fill(0);

    // Einstrahlung nach Monaten sortieren und erst einmal monatlich aufsummieren
    for (let i = 0; i < rawMonthlyIrradiation.length; i++) {
        let currentIrradiation = rawMonthlyIrradiation[i];
        averageMonthlyIrradiation[currentIrradiation.month - 1] += currentIrradiation['H(h)_m'];
    }

    // monatliche durschnittliche Einstrahlung errechnen
    // Durch die Anzahl der ausgelesenen monatlichen Werte teilen
    for (i = 0; i < averageMonthlyIrradiation.length; i++) {
        // Anzahl der Jahre = Anzahl aller verarbeiteten Monate (rawMonthlyIrradiation.length) 
        // geteilt durch die Anzahl der Monate (12)
        averageMonthlyIrradiation[i] /= rawMonthlyIrradiation.length / NUMBER_OF_MONTH;
    }

    return averageMonthlyIrradiation;
}

function sumArray(arr){
    return arr.reduce((val1, val2) => val1 + val2, 0);
}