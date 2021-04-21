# Berechnung

Um die Berechnungen durchführen zu können, wurden zunächst die folgenden Werte in der Funktion "calculateMonthlyAndYearlyConsumptionValues" ermittelt:
- Monatlicher Gesamtverbrauch
- Monatlicher Tagesverbrauch
- Monatlicher Nachtverbrauch
- Jährlicher Gesamtverbrauch
- Jährlicher Tagesverbrauch

## Formeln

**PV Leistung je Modul** = Einstrahlung * Flächenfaktor * (Peakleistung/1000) * (1-(Wirkungsgrad/100))\
-> berechnet in der Funktion "calculatePVEffiency"

**Anzahl benötigter Module** = Jahresverbrauch / PV Leistung je Modul\
**Benötigte Dachfläche** = Anzahl benötigter Module * Fläche eines Moduls\
-> berechnet in der Funktion "calculateNeededModules"

**Ertragsfaktor** = Flächenfaktor * ((Peakleistung * Anzahl benötigter Module) / 1000) * (1 - (Wirkungsgrad/100))\
-> berechnet in der Funktion "calculateNeededValues"

**PV-Ertrag** = Einstrahlung * Ertragsfaktor\
-> berechnet in der Funktion "calculateElectricityRevenue"

**eingesparte Strombezugskosten** =\
if(PV-Ertrag - Tagesverbrauch >= 0) Tagesverbrauch * Stromkosten
else PV-Ertrag * Stromkosten
-> berechnet in der Funktion "calculateSavedElectricityCosts"

**EEG Umlage** =\
if(PV-Ertrag > Tagesverbrauch) (PV-Ertrag - Tagesverbrauch) * EEG-Preis\
else 0\
-> berechnet in der Funktion "calculateEEGCosts"

**Ertrag in Euro** = PV-Ertrag - Tagesverbrauch\
-> berechnet in der Funktion "calculateRevenueEuro"

Amortization Jahr 0 = Kosten je Modul * Anhal benötigter Module\
Amortization Jahr 1 = Amortization Jahr 0 - Jahresertrag in Euro + (0.01 * Amortization Jahr 0)\
**Amortizationszeit** = Amortization Jahr 0 / (Amortization Jahr 0 - Amortization Jahr 1)\
-> berechnet in der Funktion "calculateAmortization"

Einige dieser Formeln werden sowohl für das ganze Jahr als auch für jeden Monat angewandt, sodass die Eingabewerte dem entsprechend angepasst werden müssen.\
Bsp.:
- Berechnung von PV-Ertrag: Einstrahlung ist davon abhängig, ob es sich um die Berechnung für das ganze Jahr handelt, oder um die Berechnung für einen Monat. Die Einstrahlung ist von Monat zu Monat verschieden.
- Berechnung von Ertrag in Euro: Tagesverbrauch kann der monatliche oder der jährliche Tagesverbrauch sein.

## Glossar
Tagesverbrauchsprofil = daily consumption profile\
Tagesverbrauch = daily consumption\
Verbrauchsdaten Monatsanteil in % = portionOfYearlyConsumption\
PV-Ertrag = electricity Revenue\
Ertrag in Euro = revenue Euro\
Eingesparte Strombezugskosten = saved electricity costs\
EEG Umlage = eeg costs\
Einstrahlung = irradiation