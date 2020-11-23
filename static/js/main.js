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
            alert('Invalid market choice.\nPlease choose one of the markets listed.')
        } else {
            $.ajax({
                url: `../../${market}`,
                error: function () {
                    alert("Error generating ticker symbol");
                },
                success: function (data) {
                    console.log(data);
                },
                type: 'GET'
            });
        }
    })
});


function populateResultsSection(tickerSymbol) {

}