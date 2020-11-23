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
            document.getElementById('loading').style.display = "block";

            $.ajax({
                url: `../../${market}`,
                error: function () {
                    swal("Error generating ticker symbol");
                },
                success: function (data) {
                    document.getElementById('loading').style.display = "none";
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
}