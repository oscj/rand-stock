/**
 * JS for templates/main.html
 * 
 * Author: Oscar Jaimes
 * Date: Novermer 22, 2020
 */


$(document).ready(function () {
    $("#generate-random").on("click", function () {
        let market = document.getElementById('market-select').value;
        if (market == "") {
            swal('Invalid market choice.\nPlease choose one of the markets listed')
        } else {
            //document.getElementById('loading').style.display = "block";

            $.ajax({
                url: `../../${market}`,
                error: function () {
                    swal("Error generating ticker symbol");
                },
                success: function (data) {
                    // document.getElementById('loading').style.display = "none";
                    console.log(data);
                    populateResultsSection(data);
                },
                type: 'GET'
            });
        }
    })
});


function populateResultsSection(tickerSymbol) {
    document.getElementById('ticker-symbol').innerHTML = tickerSymbol;
    $.ajax({
        url: `../../stock5d?ticker=${tickerSymbol}`,
        error: function () {
            swal("Error generating ticker symbol");
        },
        success: function (data) {
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);
            let table = parseHistoricalData(data);
            function drawChart() {

                var data = google.visualization.arrayToDataTable(table);

                var options = {
                    title: `${tickerSymbol} Stock Price vs Date - 5 Day Trend`,
                    curveType: 'none',
                    backgroundColor: { fill: 'transparent' },
                    legend: { position: 'none' }
                };

                var chart = new google.visualization.LineChart(document.getElementById('graph'));

                chart.draw(data, options);
            }
        },
        type: 'GET'
    });
}

function parseHistoricalData(data) {
    let table = [['Date', 'Price']];
    let dates = (Object.keys(data))
    for (let i = 0; i < dates.length; i++) {
        let currentDate = dates[i];
        table.push([currentDate, data[currentDate]['close']])
    }

    return table;
}

$(window).on('load', function () {
    $.ajax({
        url: `../../rand-nasdaq`,
        error: function () {
            swal("Error generating ticker symbol");
        },
        success: function (data) {
            // document.getElementById('loading').style.display = "none";
            console.log(data);
            populateResultsSection(data);
        },
        type: 'GET'
    });
})