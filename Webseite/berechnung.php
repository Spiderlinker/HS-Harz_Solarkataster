<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de" lang="de">

<head>
    <title> Solarkataster Wernigerode </title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" />

    <link rel="stylesheet" type="text/css" href="index.css" title="style" />
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">

    <!-- include JavaScript files -->
    <script type="text/javascript" src="jquery.js"></script>
    <script type="text/javascript" src="radioButton.js"></script>
    <script type="text/javascript" src="pvgis.js"></script>

    <script type="text/javascript" src="berechnung.js"></script>
    <!-- tabControl.js ist weiter unten hinzugefügt (Ende <body>) -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.1.0/chart.min.js"></script>
</head>

<?php
include('utils.php');
?>

<body>
    <form id="regForm" action="#">
        <h1>Solarkataster Wernigerode</h1>

        <!-- One "tab" for each step in the form: -->

        <!-- ############# ##### ############# -->
        <!-- ############# TAB 1 ############# -->
        <!-- ############# ##### ############# -->

        <div class="tab">
            <h3>Willkommen zum Solarkataster Wernigerode</h3>
            <p>
                Hier erfahren Sie, ob sich eine Anschaffung einer Photovoltaikanlage für Ihr Dach und Ihr
                Verbrauchsprofil lohnt.
                Dafür werden Sie durch verschiedene Fragen geführt, um Ihnen anschließend eine Einschätzung
                zur Wirtschaftlichkeit einer Solaranlage geben zu können.
            </p>
			<hr>
			<h5>Denkmalschutz beachtet?</h5>
			Viele Häuser in Wernigerode sind denkmalgeschützt und sind für Photovoltaikanlagen nicht geeignet bzw. zugelassen (<a href="https://www.wernigerode.de/Wirtschaft-Stadtentwicklung/Stadtentwicklung-Bauen/%C3%96rtliche-Bauvorschriften/" target="_blank">Altstadtsatzung</a>).
			<br>
			<a href="https://lda.sachsen-anhalt.de/denkmalinformationssystem/" target="_blank">Finden Sie hier heraus</a>, ob auch Ihr Haus in einem denkmalgeschützten Bereich liegt.
			<hr>
            <p>
                Um zu beginnen, klicken Sie bitte auf die Schaltfläche 'Weiter'.
            </p>
        </div>

        <!-- ############# ##### ############# -->
        <!-- ############# TAB 2 ############# -->
        <!-- ############# ##### ############# -->

        <div class="tab">
            <h3>Informationen über das Dach</h3>

            <p>
                Im ersten Schritt benötigen wir Informationen über Ihr Dach. Bitte geben Sie an, ob es sich bei Ihrem
                Dach um ein Flachdach oder ein Schrägdach handelt und füllen Sie die weiteren benötigten Informationen
                aus.
            </p>

            <div>
                <h4>Wie ist Ihre Dachform?</h4>
                <input type="radio" id="btnPitchedRoof" name="roofType" value="pitchedRoof" group="roofType" checked="checked" onclick="radioButtonChecked(event, 'pitchedRoof');" />
                <label for="btnPitchedRoof"> Schrägdach</label>
                <br />
                <input type="radio" id="btnFlatRoof" name="roofType" value="flatRoof" group="roofType" onclick="radioButtonChecked(event, 'flatRoof'); setDefaultRoofValues();" />
                <label for="btnFlatRoof"> Flachdach</label>


                <div id="pitchedRoof" class="radioGroup roofType">
                    <p>
                        Bei einem Schrägdach benötigen wir den Dachwinkel und die Ausrichtung des Daches.
                        Die Ausrichtung ist die Himmelsrichtung, in die die Fläche des Daches zeigt.
                        Fahren Sie mit der Maus über das (i)-Symbol, um die Gradzahl für Ihre Dachausrichtung abzulesen.
                        Bei einer Ausrichtung nach Norden, Nord-Osten oder Nord-Westen sind Solarmodule nicht sinnvoll
                        (0-90° oder 270-360°).
                    </p>
                    <table>
                        <tr>
                            <td>Dachwinkel</td>
                            <td><input type="text" class="textbox" id="roofAngle" name="roofAngle" value="40" placeholder="40" /></td>
                            <td>Grad</td>
                        </tr>
                        <tr>
                            <td>Dachausrichtung</td>
                            <td><input type="text" class="textbox" id="roofOrientation" name="roofOrientation" value="90" placeholder="90° - 270°" />
                            </td>
                            <td>Grad</td>
                            <td>
                                <a class="tooltip" href="">
                                    <img src="img/info.png" width="24" style="float:right;" />
                                    <span><img src="img/dachausrichtung.png" width="300" />
                                        Die Gradzahl wird anhand der Ausrichtung des Daches bestimmt.
                                    </span>
                                </a>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="flatRoof" class="radioGroup roofType">
                    <p>
                        Bei Flachdächern werden die Solarmodule auf einer Konstruktion montiert, um einen optimalen
                        Winkel (30°) herzustellen.
                        Zudem können die Module auf Flachdächern frei ausgerichtet werden. Für diese Berechnung
                        wird eine Ausrichtung von 180° angenommen.
                    </p>
                </div>
            </div>

            <br>
            <h4>Wie viel Fläche steht auf Ihrem Dach für die Solaranlage zur Verfügung?</h4>

            <div class="inline">
                Maximale Dachfläche: <input type="text" class="textbox" id="roofSurface" name="roofSurface" value="150" placeholder="150" /> m²
            </div>

        </div>

        <!-- ############# ##### ############# -->
        <!-- ############# TAB 3 ############# -->
        <!-- ############# ##### ############# -->

        <div class="tab">
            <h3>Informationen über Ihren Stromverbrauch</h3>
            <p>
                Nun benötigen wir Angaben über Ihren Stromverbrauch. Diesen können Sie entweder mit einer jährlichen
                Angabe hinterlegen oder auf die einzelnen Monate aufgeschlüsselt, sofern Sie eine solche Aufteilung
                zur Verfügung haben.
            </p>
            <!-- Tab links -->
            <div class="stromtab">
                <button class="tablinks" type="button" onclick="switchTab(event, 'monthly')" id="btnMonthlyTab">monatlich</button>
                <button class="tablinks" type="button" onclick="switchTab(event, 'yearly')" id="btnYearlyTab">jährlich</button>
            </div>

            <!-- Tab content -->
            <div id="monthly" class="tabcontent">
                <h4>Monatlicher Stromverbrauch</h4>
                <table>
                    <tr>
                        <td>Januar</td>
                        <td><input type="text" class="textbox" id="januaryConsumption" name="january" placeholder="317" /></td>
                        <td>kWh</td>
                    </tr>
                    <tr>
                        <td>Februar</td>
                        <td><input type="text" class="textbox" id="februaryConsumption" name="february" placeholder="269" /></td>
                        <td>kWh</td>
                    </tr>
                    <tr>
                        <td>März</td>
                        <td><input type="text" class="textbox" id="marchConsumption" name="march" placeholder="281" />
                        </td>
                        <td>kWh</td>
                    </tr>
                    <tr>
                        <td>April</td>
                        <td><input type="text" class="textbox" id="aprilConsumption" name="april" placeholder="250" />
                        </td>
                        <td>kWh</td>
                    </tr>
                    <tr>
                        <td>Mai</td>
                        <td><input type="text" class="textbox" id="mayConsumption" name="may" placeholder="230" />
                        </td>
                        <td>kWh</td>
                    </tr>
                    <tr>
                        <td>Juni</td>
                        <td><input type="text" class="textbox" id="juneConsumption" name="june" placeholder="211" />
                        </td>
                        <td>kWh</td>
                    </tr>
                    <tr>
                        <td>Juli</td>
                        <td><input type="text" class="textbox" id="julyConsumption" name="july" placeholder="209" />
                        </td>
                        <td>kWh</td>
                    </tr>
                    <tr>
                        <td>August</td>
                        <td><input type="text" class="textbox" id="augustConsumption" name="august" placeholder="215" />
                        </td>
                        <td>kWh</td>
                    </tr>
                    <tr>
                        <td>September</td>
                        <td><input type="text" class="textbox" id="septemberConsumption" name="september" placeholder="220" /></td>
                        <td>kWh</td>
                    </tr>
                    <tr>
                        <td>Oktober</td>
                        <td><input type="text" class="textbox" id="octoberConsumption" name="october" placeholder="250" /></td>
                        <td>kWh</td>
                    </tr>
                    <tr>
                        <td>November</td>
                        <td><input type="text" class="textbox" id="novemberConsumption" name="november" placeholder="261" /></td>
                        <td>kWh</td>
                    </tr>
                    <tr>
                        <td>Dezember</td>
                        <td><input type="text" class="textbox" id="decemberConsumption" name="december" placeholder="289" /></td>
                        <td>kWh</td>
                    </tr>
                </table>
            </div>

            <div id="yearly" class="tabcontent">
                <table>
                    <tr>
                        <td>Jährlicher Stromverbrauch</td>
                        <td><input type="text" class="textbox" id="yearlyConsumption" name="yearly" placeholder="3000" value="3000" />
                        </td>
                        <td>kWh</td>
                    </tr>
                </table>
            </div>

            <br>

            <div>
                <h4>Für wen wird die Solaranlage geplant?</h4>
                <input type="radio" id="btnPrivateUsage" name="usage" value="Privathaushalt" checked="checked" group="consumptionType" onclick="radioButtonChecked(event, 'privateUsage');" />
                <label for="btnPrivateUsage"> Privathaushalt</label>
                <br>
                <input type="radio" id="btnCommercialUsage" name="usage" value="Gewerblich" group="consumptionType" onclick="radioButtonChecked(event, 'commercialUsage');" />
                <label for="btnCommercialUsage"> Gewerbe</label>

                <h4>Wann verbrauchen Sie den meisten Strom?</h4>
                <div id="privateUsage" class="radioGroup consumptionType" selectFirstInput="true">
                    <input type="radio" id="privateDaytime" name="privateUsageDetail" value="privateDaytime" checked="checked" onclick="setDailyConsumptionPercentage(event);" />
                    <label for="privateDaytime"> Eher tagsüber (Home-Office)</label>
                    <br>
                    <input type="radio" id="privateEvening" name="privateUsageDetail" value="privateEvening" onclick="setDailyConsumptionPercentage(event);" />
                    <label for="privateEvening"> Eher abends (Arbeit in Büro)</label>
                    <br>
                    <input type="radio" id="privateSpreadOverDay" name="privateUsageDetail" value="privateSpreadOverDay" onclick="setDailyConsumptionPercentage(event);" />
                    <label for="privateSpreadOverDay"> Rund um die Uhr</label>
                </div>
                <div id="commercialUsage" class="radioGroup consumptionType" selectFirstInput="true">
                    <input type="radio" id="commercialDaytime" name="commercialUsageDetail" value="commercialDaytime" checked="checked" onclick="setDailyConsumptionPercentage(event);" />
                    <label for="commercialDaytime"> Eher tagsüber von 8 - 18 Uhr</label>
                    <br>
                    <input type="radio" id="commercialEvening" name="commercialUsageDetail" value="commercialEvening" onclick="setDailyConsumptionPercentage(event);" />
                    <label for="commercialEvening"> Eher abends (Restaurant, Bar)</label>
                    <br>
                    <input type="radio" id="commercialSpreadOverDay" name="commercialUsageDetail" value="commercialSpreadOverDay" onclick="setDailyConsumptionPercentage(event);" />
                    <label for="commercialSpreadOverDay"> Rund um die Uhr (Schichtbetrieb)</label>
                </div>
            </div>

            <br>

            <p>
                Der Tagesstromverbrauch gibt den Anteil des pro Tag verbrauchten Stromes an, der zwischen dem
                Sonnenaufgang und dem Sonnenuntergang verbraucht wird. Dieser kann direkt von der Solaranlage gedeckt
                werden. Da nachts von der Solaranlage kein Strom erzeugt werden kann, muss der übrige Anteil vom
                Netzbetreiber bezogen werden. <br>
            </p>
            <div style="display: table;">
                <div style="display: table-cell;">Tagesstromverbrauch: </div>
                <div style="display: table-cell;"><input type="text" class="textbox consumptionInput" id="dailyConsumption" name="dailyConsumption" placeholder="50" size="1%" /></div>
                <div style="display: table-cell;"> %</div>
            </div>
            <p>
                <i>
                    Der Tagesstromverbrauch wird automatisch durch die von Ihnen zuvor getroffene Auswahl gesetzt. Falls
                    Sie diesen Wert allerdings nicht als passend erachten oder Sie ein außergewöhnliches
                    Verbrauchsprofil
                    haben, so können Sie den Tagesstromverbrauch über das entsprechende Feld noch anpassen.
                </i>
            </p>

        </div>

        <!-- ############# ##### ############# -->
        <!-- ############# TAB 4 ############# -->
        <!-- ############# ##### ############# -->

        <div class="tab">
            <h3>Kosteninformationen</h3>
            <p>
                Zum Abschluss werden noch Informationen zu den Kosten benötigt. Bitte geben Sie die aktuell geltene
                EEG-Umlage an. Zudem tragen Sie bitte in das Feld 'Stromkosten' den in Ihrem Stromvertrag vereinbarten
                Preis pro kWh ein.
            </p>

            <table>
                <tr>
                    <td>EEG Umlage</td>
                    <td><input type="text" class="textbox" id="eegCostShare" name="eegCostShare" placeholder="6.5" value="<?php echo getValue('eeg'); ?>" />
                    </td>
                    <td>ct / kWh</td>
                </tr>
                <tr>
                    <td>Stromkosten</td>
                    <td><input type="text" class="textbox" id="electricityCosts" name="electricityCosts" placeholder="27.5" value="<?php echo getValue('electricityCosts'); ?>" /></td>
                    <td>ct / kWh</td>
                </tr>
            </table>

            <br>

            <h4>Kosten der Solarmodule</h4>
            <p>
                Die Preise von Solarmodulen können variieren. Die Amortisationszeit (die Zeit, nach der die
                Anschaffungskosten wieder 'reingeholt' wurden) wird sowohl für den minimalen als auch für den
                maximalen angegebenen Preis pro Solarmodul berechnet.
            </p>

            <table>
                <tr>
                    <td>Minimum</td>
                    <td><input type="text" class="textbox" id="minCostPerModule" name="minimumCostsTotal" placeholder="250" value="<?php echo getValue('minModuleCosts'); ?>" /></td>
                    <td>EUR / m²</td>
                </tr>
                <tr>
                    <td>Maximum</td>
                    <td><input type="text" class="textbox" id="maxCostPerModule" name="maximumCostsTotal" placeholder="450" value="<?php echo getValue('maxModuleCosts'); ?>" /></td>
                    <td>EUR / m²</td>
                </tr>
            </table>

            <h4>Angaben zu den Solarmodulen</h4>
            <p></p>
            <table>
                <tr>
                    <td>Peakleistung</td>
                    <td><input type="text" class="textbox" id="peakPower" name="peakPower" placeholder="20" value="<?php echo getValue('peakPower'); ?>" /></td>
                    <td>Wp/m²</td>
                </tr>
                <tr>
                    <td>Wirkungsgrad</td>
                    <td><input type="text" class="textbox" id="moduleEfficiency" name="moduleEfficiency" placeholder="20" value="<?php echo getValue('moduleEfficiency'); ?>" /></td>
                    <td>%</td>
                </tr>
            </table>

            <br>

            <h5>Hinweise zu eventuellen Kosten</h5>
            <p>Montagekosten:
                <i>Bei der Montage können neben den eigentlichen Installationskosten auch noch Kosten für ein Gerüst
                    anfallen. Bitte informieren Sie sich über die Montagekosten bei einem örtlichen
                    Montageunternehmen.</i>
            </p>
            <p>Erneuerung der Gebäudeelektrik:
                <i>Für die Nutzung des PV-Stroms im eigenen Haushalt muss die Gebäudeelektrik den Strom aufnehmen
                    können. Bei einer vor 1985 installierten Elektrik raten Fachleute zu einer Erneuerung. Die Kosten
                    einer Erneuerung liegen zwischen 500 und 1.200 €. Diese Kosten sind nicht in den Gesamtpreis der
                    Anlage einbezogen.</i>
            </p>


        </div>

        <!-- ############# ##### ############# -->
        <!-- ############# TAB 5 ############# -->
        <!-- ############# ##### ############# -->

        <div class="tab">
            <h4>Zusammenfassung</h4>
            <p>
                Auf dieser Seite werden die wesentlichen Informationen für die geplante Solaranlage aufbereitet.
            </p>

            <p>
                Einige Kennwerte zu der für Sie berechneten Solaranlage:
            <ul>
                <li>Anzahl benötigter Module: <b><a id="lblNeededModules"></a></b> Stk. </li>
                <li>Verwendete Dachfläche: <b><a id="lblUsedRoofSurface"></a></b> m² (/ max. <b><a id="lblMaxRoofSurface"></a></b> m²)</a></li>
                <li>Dachausrichtung: <b><a id="lblRoofOrientation"></a></b> Grad </li>
                <li>Ausrichtung der Module: <b><a id="lblRoofAngle"></a></b> Grad</li>
            </ul>
            </p>

            <div class="w3-container">
                <div class="w3-row-padding">
                    <div class="w3-third">
                        <h3>Stromverbrauch pro Monat</h3>
                        <hr>
                        <p>Nebenstehend sehen Sie den errechneten Tages- und Nachtverbrauch pro Monat in kWh dargestellt.
                            Dieser gibt an, wie viel Strom Sie in einem Monat jeweils tagsüber oder in der Nacht
                            (bzw. an den Zeiten verbrauchen, zu denen nicht mehr ausreichend Sonne scheint,
                            sodass diese für den Strombedarf genutzt werden könnte) verbrauchen.</p>
                    </div>

                    <div class="w3-twothird">
                        <canvas id="chartConsumptionPerMonth"></canvas>
                    </div>
                </div>
            </div>

            <div class="w3-container">
                <div class="w3-row-padding">
                    <div class="w3-third">
                        <h3>Ertrags- und Verbrauchsdarstellung</h3>
                        <hr>
                        <p>
                            Dem nebenstehenden Diagramm können Sie Ihren monatlichen Stromverbrauch und die dazu berechneten potenziellen Stromerträge entnehmen. 
                        </p>
                    </div>

                    <div class="w3-twothird">
                        <canvas id="chartPvYieldAndConsumption"></canvas>
                    </div>
                </div>
            </div>

            <div class="w3-container">
                <div class="w3-row-padding">
                    <div class="w3-third">
                        <h3>Amortisationszeit</h3>
                        <hr>
                        <p>Bei minimalen Modulkosten von <b><a id="lblMinCostPerModule"></a></b> € wurde bei einem Gesamtpreis von <b><a id="lblMinCosts"></a></b> eine Amortisationszeit von ca. <b><a id="lblMinAmortization"></a></b> Jahren errechnet.
                            Bei maximalen Modulkosten von <b><a id="lblMaxCostPerModule"></a></b> € liegt die Amortisationszeit bei einem Gesamtpreis von <b><a id="lblMaxCosts"></a></b> jedoch bei ca. <b><a id="lblMaxAmortization"></a></b> Jahren.
                        </p>
                    </div>

                    <div class="w3-twothird">
                        <canvas id="chartAmortization"></canvas>
                    </div>
                </div>
            </div>
			
			<div>
				<br>
				<hr>
				<h5>Weitere Informationen benötigt?</h5>
				Viele weitere nützliche Informationen finden Sie bei der <a href="https://www.verbraucherzentrale.de/wissen/energie/erneuerbare-energien/photovoltaik-was-bei-der-planung-einer-solaranlage-wichtig-ist-5574" target="_blank">Verbraucherzentrale</a>.
			</div>

        </div>

        <!-- ############# ######## ############# -->
        <!-- ############# End TABS ############# -->
        <!-- ############# ######## ############# -->

        <div style="overflow:auto;">
            <hr>
            <div style="float:right;">
                <button type="button" id="prevBtn" onclick="nextPrev(-1)">Zurück</button>
                <button type="button" id="nextBtn" onclick="nextPrev(1)">Weiter</button>
            </div>
        </div>
        <!-- Circles which indicates the steps of the form: -->
        <div style="text-align:center;margin-top:40px;">
            <span class="step"></span>
            <span class="step"></span>
            <span class="step"></span>
            <span class="step"></span>
            <span class="step"></span>
        </div>
    </form>

    <!-- Muss am Ende stehen, da sonst das Stylesheet noch nicht geladen wurde 
         und das Script auf dieses zugreifen muss, siehe https://stackoverflow.com/a/42370248-->
    <script type="text/javascript" src="tabcontrol.js"></script>
    <script type="text/javascript" src="charts.js"></script>
    <script>
        document.getElementById("btnPitchedRoof").click(); // open monthly electricity consumption
        //document.getElementById("btnMonthlyTab").click(); // open monthly electricity consumption
        document.getElementById("btnYearlyTab").click(); // open monthly electricity consumption
        document.getElementById("btnPrivateUsage").click(); // select private usage radio button
    </script>
</body>

</html>