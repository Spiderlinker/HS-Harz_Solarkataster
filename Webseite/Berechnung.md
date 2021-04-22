# Berechnung

Um die Berechnungen durchführen zu können, wurden zunächst die folgenden Werte in der Funktion `calculateMonthlyAndYearlyConsumptionValues` ermittelt:
- Monatlicher Gesamtverbrauch
- Monatlicher Tagesverbrauch
- Monatlicher Nachtverbrauch
- Jährlicher Gesamtverbrauch
- Jährlicher Tagesverbrauch

## Default Values
- latitute and longitude
- Verbrauchsdaten Monatsanteil in %
- Fläche eines Moduls
- monatliche Einstrahlung
- Peakleistung
- Wirkungsgrad
- Flächenfaktor Tabelle
- min. und max. Kosten eines Moduls

## Formeln

**PV Leistung je Modul** = Einstrahlung * Flächenfaktor * (Peakleistung/1000) * (1-(Wirkungsgrad/100))\
-> berechnet in der Funktion `calculatePVEffiency`

**Anzahl benötigter Module** = Jahresverbrauch / PV Leistung je Modul\
**Benötigte Dachfläche** = Anzahl benötigter Module * Fläche eines Moduls\
-> berechnet in der Funktion `calculateNeededModules`

**Ertragsfaktor** = Flächenfaktor * ((Peakleistung * Anzahl benötigter Module) / 1000) * (1 - (Wirkungsgrad/100))\
-> berechnet in der Funktion `calculateNeededValues`

**PV-Ertrag** = Einstrahlung * Ertragsfaktor\
-> berechnet in der Funktion `calculateElectricityRevenue`

**eingesparte Strombezugskosten** =\
if(PV-Ertrag - Tagesverbrauch >= 0) Tagesverbrauch * Stromkosten\
else PV-Ertrag * Stromkosten\
-> berechnet in der Funktion `calculateSavedElectricityCosts`

**EEG Umlage** =\
if(PV-Ertrag > Tagesverbrauch) (PV-Ertrag - Tagesverbrauch) * EEG-Preis\
else 0\
-> berechnet in der Funktion `calculateEEGCosts`

**Ertrag in Euro** = PV-Ertrag - Tagesverbrauch\
-> berechnet in der Funktion `calculateRevenueEuro`

Amortization Jahr 0 = Kosten je Modul * Anhal benötigter Module\
Amortization Jahr 1 = Amortization Jahr 0 - Jahresertrag in Euro + (0.01 * Amortization Jahr 0)\
**Amortizationszeit** = Amortization Jahr 0 / (Amortization Jahr 0 - Amortization Jahr 1)\
-> berechnet in der Funktion `calculateAmortization`

Einige dieser Formeln werden sowohl für das ganze Jahr als auch für jeden Monat angewandt, sodass die Eingabewerte dem entsprechend angepasst werden müssen.\
Bsp.:
- Berechnung von PV-Ertrag: Einstrahlung ist davon abhängig, ob es sich um die Berechnung für das ganze Jahr handelt, oder um die Berechnung für einen Monat. Die Einstrahlung ist von Monat zu Monat verschieden.
- Berechnung von Ertrag in Euro: Tagesverbrauch kann der monatliche oder der jährliche Tagesverbrauch sein.

## Werte für die Diagramme
Hier wird aufgelistet, welche Variablen bzw. Werte für das Darstellen welchen Diagramms benötigt wird.\
**Jahresverbrauch nach Monaten**
- nightlyConsumptionMonthly
- dailyConsumptionMonthly

**Ertrags- /Verbrauchsdiagramm**
- dailyConsumptionMonthly
- electricityRevenueMonthly

## Glossar
Tagesverbrauchsprofil = daily consumption profile\
Tagesverbrauch = daily consumption\
Verbrauchsdaten Monatsanteil in % = portionOfYearlyConsumption\
PV-Ertrag = electricity Revenue\
Ertrag in Euro = revenue Euro\
Eingesparte Strombezugskosten = saved electricity costs\
EEG Umlage = eeg costs\
Einstrahlung = irradiation


## Formeln als Bild
PV-Leistung:
![pv](http://www.sciweavers.org/tex2img.php?eq=PVLeistung%2FModul%20%3D%20Einstrahlung%20%5Ccdot%20Flaechenfaktor%20%5Ccdot%20%5Cleft%20%28%20%5Cfrac%7BPeakleistung%7D%7B1000%7D%20%5Cright%20%29%20%5Ccdot%20%5Cleft%20%28%201%20-%20%5Cleft%20%28%20%5Cfrac%7BWirkungsgrad%7D%7B100%7D%20%5Cright%20%29%20%5Cright%20%29&bc=White&fc=Black&im=jpg&fs=18&ff=arev&edit=0)

Anzahl benötigter Module:
![anzahl](http://www.sciweavers.org/tex2img.php?eq=A_%7BnzahlBenoetigterModule%7D%20%3D%20%20%5Cfrac%7BJ_%7Bahresverbrauch%7D%20%7D%7BPV_%7BLeistungJeModul%7D%7D&bc=White&fc=Black&im=jpg&fs=18&ff=arev&edit=0)

Benötigte Dachfläche:
![dachflaeche](http://www.sciweavers.org/tex2img.php?eq=B_%7BenoetigteDachflaeche%7D%20%3D%20A_%7BnzahlBenoetigterModule%7D%20%5Ccdot%20F_%7BlaecheEinesModuls%7D&bc=White&fc=Black&im=jpg&fs=18&ff=arev&edit=0)

Ertragsfaktor: 
![ertragsfaktor](http://www.sciweavers.org/tex2img.php?eq=E_%7Brtragsfaktor%7D%20%3D%20F_%7Blaechenfaktor%7D%20%5Ccdot%20%20%5Cbig%28%20%5Cfrac%7B%20P_%7Beakleistung%7D%20%5Ccdot%20A_%7BnzahlBenoetigterModule%7D%7D%7B1000%7D%20%5Cbig%29%20%5Ccdot%20%5Cbig%28%201%20-%20%5Cfrac%7BW_%7Birkungsgrad%7D%7D%7B100%7D%20%5Cbig%29&bc=White&fc=Black&im=jpg&fs=18&ff=arev&edit=0)

