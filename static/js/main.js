/**
 * JS for templates/main.html
 * 
 * Oscar Jaimes
 * Novermer 24  2020
 */

$(document).ready(() => {
    // Get random stock button
    $("#generate-random").on("click", () => {
        let market = document.getElementById('market-select').value;
        let sector = document.getElementById('sector-select').value;
        if (market == "") {
            swal('Invalid market choice.\nPlease choose one of the markets listed')
        } else {
            $.ajax({
                url: `../../${market}?sector=${sector}`,
                error: () => {
                    console.warn("Error generating ticker symbol. TSLA will save the day.");
                    populateResultsSection('TSLA', 'NASDAQ');
                },
                success: (data) => {
                    populateResultsSection(data, document.getElementById('market-select').options[document.getElementById('market-select').selectedIndex].text);
                },
                type: 'GET'
            });
        }
    })
});

let populateResultsSection = (tickerSymbol, market) => {
    // Get Trading View stock graph for corresponding ticker
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

    // Fill in market and ticker fields
    document.getElementById('chosen-market').innerHTML = market;
    document.getElementById('ticker-symbol').innerHTML = tickerSymbol;

    // Populate Stats
    populateStatisticsSection(tickerSymbol)


    // Populate News
    fetchStockNews(tickerSymbol);
}

let populateStatisticsSection = (tickerSymbol) => {
    $.ajax({
        url: `../../stock-info?ticker=${tickerSymbol}`,
        error: () => {
            document.getElementById('open').innerHTML = '-';
            document.getElementById('high').innerHTML = '-';
            document.getElementById('low').innerHTML = '-';
            document.getElementById('cap').innerHTML = '-';
            document.getElementById('vol').innerHTML = '-';
            document.getElementById('avg-vol').innerHTML = '-';
            document.getElementById('52w-high').innerHTML = '-';
            document.getElementById('52w-low').innerHTML = '-';
        },
        success: (data) => {
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

// Mis function to format numbers. Taken from the bible (https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript)
let numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Gets all sectors and populates dropdown menu.
let populateSectorDropDown = () => {
    $.ajax({
        url: `../../sector-list`,
        error: () => {
            console.warn("Error generating ticker list");
        },
        success: (data) => {
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


let fetchStockNews = (ticker) => {
    $.ajax({
        url: `../../stock-news?ticker=${ticker}`,
        error: () => {
            console.warn(`Error generating news for ${ticker}`);
        },
        success: (data) => {

            console.log(data);
            let newsDiv = document.getElementById('news-section');

            let all_article_html = "";
            let counter = 0;
            data['articles'].forEach(article => {
                let header = "";
                if (counter == 0) {
                    header = `News related to <span style='color: #0645AD'>${ticker}</span>`
                }
                let article_card = ` 
                <div class="card">
                <div style='text-align: center; padding: 2px;'class="card-header">
                    <h5>${header}</h5>
                </div>
                    <div class="card-body">
                        <h5 class="card-title">${article['title']}</h5>
                        <a href="${article['link']}"  target="_blank" class="btn btn-primary">View article on ${article['source']['title']}</a>
                    </div>
                </div>`;

                all_article_html += article_card;
                counter++;
            });

            newsDiv.innerHTML = all_article_html;


        },
        type: 'GET'
    });
}

$(window).on('load', () => {
    populateSectorDropDown();
    $.ajax({
        url: `../../rand-nasdaq`,
        error: () => {
            swal("Error generating ticker symbol");
        },
        success: (data) => {
            console.log(data);
            populateResultsSection(data, 'NASDAQ');
        },
        type: 'GET'
    });
})