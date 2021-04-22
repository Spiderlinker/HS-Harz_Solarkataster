# HS-Harz_Solarkataster

Fragen zur Berechnung:
Worin unterscheiden sich die minimalen- und maximalen Gesamtkosten? Bzw. wo liegt der Unterschied, wenn man die günstigeren oder teureren Solarpanele wählt? Wird dadurch die Effektivität besser?

### Holen von Einstrahlungsdaten
Benutzer kann auf Karte sein Haus auswählen. Die lat und lng des Punktes können an EU SCIENCE HUB übermittelt werden und man erhält die durchschnittliche monatliche Sonneneinstrahlung. 

- https://ec.europa.eu/jrc/en/PVGIS/docs/noninteractive
- Beispiel: https://re.jrc.ec.europa.eu/api/MRcalc?lat=51.837635&lon=10.783489&horirrad=1&outputformat=json

Falls der Service nicht verfügbar ist (25 calls / s), wird der Default-Wert aus der Excel-Tabelle der WINGs verwendet
 ![test](http://www.sciweavers.org/tex2img.php?eq=B_%7BenoetigteDachflaeche%7D%20%3D%20A_%7BnzahlBenoetigterModule%7D%20%5Ccdot%20F_%7BlaecheEinesModuls%7D&bc=White&fc=Black&im=jpg&fs=12&ff=arev&edit=0)
