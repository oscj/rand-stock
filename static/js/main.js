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
            "height": 300,
            "symbol": tickerSymbol,
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