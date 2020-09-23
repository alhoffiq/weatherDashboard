$(document).ready(function() {
    let apiKey = "9cca916a5351b86364c95b186a6fac9d"

    $("#searchBtn").on("click", function() { // When search button is clicked:
        let queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + apiKey;
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(res) {
            console.log(res)
        });
    })

});