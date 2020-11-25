/**
 * JS for templates/main.html
 * 
 * Author: Oscar Jaimes
 * Date: Novermer 22, 2020
 */


$(document).ready(function () {
    $("#generate-random").on("click", function () {
        let market = document.getElementById('market-select').value;
        let sector = document.getElementById('sector-select').value;
        if (market == "") {
            swal('Invalid market choice.\nPlease choose one of the markets listed')
        } else {
            //document.getElementById('loading').style.display = "block";

            $.ajax({
                url: `../../${market}?sector=${sector}`,
                error: function () {
                    swal("Error generating ticker symbol");
                },
                success: function (data) {
                    // document.getElementById('loading').style.display = "none";
                    console.log(data);
                    populateResultsSection(data, document.getElementById('market-select').options[document.getElementById('market-select').selectedIndex].text);
                },
                type: 'GET'
            });
        }
    })
});


function populateResultsSection(tickerSymbol, market) {

    new TradingView.widget(
        {
            "width": screen.width * 0.9,
            "height": 475,
            "symbol": market + ":" + tickerSymbol,
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "light",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "allow_symbol_change": true,
            "container_id": "tradingview_6b594"
        }
    );

    document.getElementById('chosen-market').innerHTML = market;
    document.getElementById('ticker-symbol').innerHTML = tickerSymbol;
    populateStatisticsSection(tickerSymbol)
}

function populateStatisticsSection(tickerSymbol) {

    $.ajax({
        url: `../../stock-info?ticker=${tickerSymbol}`,
        error: function () {
            document.getElementById('open').innerHTML = '-';
            document.getElementById('high').innerHTML = '-';
            document.getElementById('low').innerHTML = '-';
            document.getElementById('cap').innerHTML = '-';
            document.getElementById('vol').innerHTML = '-';
            document.getElementById('avg-vol').innerHTML = '-';
            document.getElementById('52w-high').innerHTML = '-';
            document.getElementById('52w-low').innerHTML = '-';
        },
        success: function (data) {
            document.getElementById('open').innerHTML = (data['open']) || '-';
            document.getElementById('high').innerHTML = (data['high']) || '-';
            document.getElementById('low').innerHTML = (data['low']) || '-';
            document.getElementById('cap').innerHTML = numberWithCommas(data['marketCap']) || '-';
            document.getElementById('vol').innerHTML = numberWithCommas(data['vol']) || '-';
            document.getElementById('avg-vol').innerHTML = numberWithCommas(data['avgVol']) || '-';
            document.getElementById('52w-high').innerHTML = (data['52wHigh']) || '-';
            document.getElementById('52w-low').innerHTML = (data['52wLow']) || '-';
        },
        type: 'GET'
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function populateSectorDropDown() {
    $.ajax({
        url: `../../sector-list`,
        error: function () {
            console.warn("Error generating ticker symbol");
        },
        success: function (data) {
            //Populate sector dropdown
            let sectorSelect = document.getElementById('sector-select');

            let sectors = data['sectors'];
            sectors.forEach(sector => {
                var option = document.createElement("option");
                option.text = sector;
                option.value = sector;
                sectorSelect.appendChild(option);
            });
        },
        type: 'GET'
    });
}




function populateSectorDropDown() {
    $.ajax({
        url: `../../sector-list`,
        error: function () {
            console.warn("Error generating ticker symbol");
        },
        success: function (data) {
            //Populate sector dropdown
            let sectorSelect = document.getElementById('sector-select');

            let sectors = data['sectors'];
            sectors.forEach(sector => {
                var option = document.createElement("option");
                option.text = sector;
                option.value = sector;
                sectorSelect.appendChild(option);
            });
        },
        type: 'GET'
    });
}

$(window).on('load', function () {
    populateSectorDropDown();
    $.ajax({
        url: `../../rand-nasdaq`,
        error: function () {
            swal("Error generating ticker symbol");
        },
        success: function (data) {
            // document.getElementById('loading').style.display = "none";
            console.log(data);
            populateResultsSection(data, 'NASDAQ');
        },
        type: 'GET'
    });
})