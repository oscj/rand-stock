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
        document.getElementById("generate-random").disabled = true;
        if (market == "") {
            swal('Invalid market choice.\nPlease choose one of the markets listed')
        } else {
            $.ajax({
                url: `../../${market}?sector=${sector}`,
                error: async () => {
                    swal('Looks like there was an error behind the scenes. Not to worry, TLSA or PLTR will save the day');
                    // If request fails, its a 50/50 between TSLA and PLTR. 
                    // Update as meme stocks meta changes.
                    console.warn("Error generating ticker symbol. TSLA or PLTR will save the day.");
                    let randInt = Math.floor(Math.random() * 100)
                    if (randInt % 2 == 0) {
                        await populateResultsSection('TSLA', 'NASDAQ');
                    } else {
                        await populateResultsSection('PLTR', 'NYSE');
                    }
                    setTimeout(function () { document.getElementById('generate-random').disabled = false; }, 5000);
                },
                success: async (data) => {
                    await populateResultsSection(data, document.getElementById('market-select').options[document.getElementById('market-select').selectedIndex].text).then(() => {
                        setTimeout(function () { document.getElementById("generate-random").disabled = false; }, 5000);
                    });
                },
                statusCode: {
                    429: function (xhr) {
                        swal(xhr.responseText);
                    },
                },
                type: 'GET'
            });
        }
    })
});

let populateResultsSection = async (tickerSymbol, market) => {
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
    await populateStatisticsSection(tickerSymbol)

    // Populate News
    await fetchStockNews(tickerSymbol);
}

let populateStatisticsSection = async (tickerSymbol) => {
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
            document.getElementById('open').innerHTML = (data['open']);
            document.getElementById('high').innerHTML = (data['high']);
            document.getElementById('low').innerHTML = (data['low']);
            document.getElementById('cap').innerHTML = numberWithCommas(data['marketCap']) || data['marketCap'];
            document.getElementById('vol').innerHTML = numberWithCommas(data['vol']) || data['vol'];
            document.getElementById('avg-vol').innerHTML = numberWithCommas(data['avgVol']) || data['avgVol'];
            document.getElementById('52w-high').innerHTML = (data['52wHigh']) || data['52wHigh'];
            document.getElementById('52w-low').innerHTML = (data['52wLow']) || data['52wLow'];
        },
        type: 'GET'
    });
}

// Misc function to format numbers. Taken from the bible (https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript)
let numberWithCommas = (x) => {
    if (x == '-') {
        return null;
    }
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


let fetchStockNews = async (ticker) => {
    $.ajax({
        url: `../../stock-news?ticker=${ticker}`,
        error: () => {
            console.warn(`Error generating news for ${ticker}`);
        },
        success: (data) => {

            let newsDiv = document.getElementById('news-section');

            let all_article_html = "";
            data['articles'].forEach(article => {
                let header = "";

                let article_card = ` 
                <div class="card">
              
                    <div class="card-body">
                        <h5 class="card-title">${article['title']}</h5>
                        <a href="${article['link']}"  target="_blank" class="btn btn-primary">View article on ${article['source']['title']}</a>
                    </div>
                </div>`;

                all_article_html += article_card;
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