
const MONTH_LABELS = ["Januar", "Februar", "März", "April",
    "Mai", "Juni", "Juli", "August",
    "September", "Oktober", "November", "Dezember"
];

// initialize charts
const chartConsumptionPerMonth = createConsumptionPerMonthChart();
const chartPvYieldAndConsumption = createPvYieldAndConsumptionChart();
const chartAmortization = createAmortizationChart();

// ############ Methods for creating charts ############# 

function createConsumptionPerMonthChart() {

    const data = {
        labels: MONTH_LABELS,
        datasets: [{
            label: 'Nachtverbrauch',
            data: nightlyConsumptionMonthly,
            backgroundColor: "rgb(91, 155, 213)",
        },
        {
            label: 'Tagesverbrauch',
            data: dailyConsumptionMonthly,
            backgroundColor: "rgb(237, 125, 49)",
        },
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Tages- und Nachtverbrauch pro Monat in kWh'
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    };

    // create charts with previously defined settings
    return new Chart(
        document.getElementById('chartConsumptionPerMonth'),
        config
    );
}

function createPvYieldAndConsumptionChart() {
    const data = {
        labels: MONTH_LABELS,
        datasets: [{
            label: 'Stromverbrauch',
            data: dailyConsumptionMonthly,
            backgroundColor: "rgb(237, 125, 49)",
        },
        {
            label: 'PV-Ertrag',
            data: electricityRevenueMonthly,
            backgroundColor: "rgb(255, 192, 0)",
        },
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Ertrags-/ Verbrauchsdiagramm'
                },
            },
            responsive: true,
            maintainAspectRatio: false,
        }
    };

    // create charts with previously defined settings
    return new Chart(
        document.getElementById('chartPvYieldAndConsumption'),
        config
    );

}

function createAmortizationChart() {

    const data = {
        labels: Array.from(Array(21).keys()),
        datasets: [{
            label: 'Minimale Modulkosten: ' + minCostPerModule + '€',
            data: amortizationMinYearlyCosts,
            fill: { 
                above: 'rgba(255, 0, 0, 0.2)', 
                below: 'rgba(0, 255, 0, 0.2)', 
                target: { value: 0 } 
            },
            borderColor: 'rgba(156, 195, 229, 0.8)',
            backgroundColor: 'rgba(156, 195, 229, 0.8)',
        },
        {
            label: 'Maximale Modulkosten: ' + maxCostPerModule + '€',
            data: amortizationMaxYearlyCosts,
            fill: false,
            borderColor: 'rgba(244, 177, 131, 0.8)',
            backgroundColor: 'rgba(244, 177, 131, 0.8)',
        }
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Grid Line Settings'
                }
            },
            scales: {
                x: {
                    grid: {
                        display: true,
                        drawBorder: true,
                        drawOnChartArea: true,
                        drawTicks: true,
                    }
                },
                y: {
                    grid: {
                        drawBorder: false,
                        lineWidth: (context) => {
                            if (context.tick.value == 0) {
                                return 3;
                            }
                            return 1;
                        },
                        color: (context) => {
                            return context.tick.value == 0 ? "#000000" : "#f3f3f3";
                        }
                    },
                }
            }
        },
    };

    // create charts with previously defined settings
    return new Chart(
        document.getElementById('chartAmortization'),
        config
    );
}