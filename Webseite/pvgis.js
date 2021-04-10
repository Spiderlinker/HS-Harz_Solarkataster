// Name der PHP-Datei, die die Abfrage vom PVGIS durchführt
var PVGIS_PHP_REQUEST_FILE = "pvgis.php";
var NUMBER_OF_MONTH = 12;

function getMonthlyAverageRadiationForLocation(latitude, longitude, callback) {
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
    }).done(function(response) {
        var processedResponse = extractMonthlyAverageRadiationFromJSON(response.data);
        callback(processedResponse);
    });
}

function extractMonthlyAverageRadiationFromJSON(json) {
    // Relevante Daten sind im JSON unter json -> outputs -> monthly
    var rawMonthlyRadiation = response.outputs.monthly;

    // Array erstellen für monatliche durschnittliche Einstrahlung
    // Jede Array-Zelle repräsentiert dabei ein Monat
    // beginnend bei 0 = Januar und 11 = Dezember
    var averageMonthlyRadiation = Array(NUMBER_OF_MONTH).fill(0);

    // Einstrahlung nach Monaten sortieren und erst einmal monatlich aufsummieren
    for (var i = 0; i < rawMonthlyRadiation.length; i++) {
        var currentRadiation = rawMonthlyRadiation[i];
        averageMonthlyRadiation[currentRadiation.month - 1] += currentRadiation['H(h)_m'];
    }

    // monatliche durschnittliche Einstrahlung errechnen
    // Durch die Anzahl der ausgelesenen monatlichen Werte teilen
    for (i = 0; i < averageMonthlyRadiation.length; i++) {
        // Anzahl der Jahre = Anzahl aller verarbeiteten Monate (rawMonthlyRadiation.length) 
        // geteilt durch die Anzahl der Monate (12)
        averageMonthlyRadiation[i] /= rawMonthlyRadiation.length / NUMBER_OF_MONTH;
    }

    return averageMonthlyRadiation;
}

function sumArray(arr){
    return arr.reduce((val1, val2) => val1 + val2, 0);
}