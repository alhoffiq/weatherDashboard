$(document).ready(function () {
    let apiKey = "9cca916a5351b86364c95b186a6fac9d"
    let historyFlag;
    if (localStorage.getItem("historyFlag") == null) { // If no local storage, initialize it with starter display
        historyFlag = 0;
        localStorage.setItem("historyFlag", 0);
        localStorage.setItem("History1", "Austin");
        localStorage.setItem("History2", "Los Angeles");
        localStorage.setItem("History3", "New York");
        localStorage.setItem("History4", "Phoenix");
    }
    else {
        historyFlag = localStorage.getItem("historyFlag");
    }
    initializeDisplay(historyFlag); // Sets display to last searched city
    getHistory(); // Sets history buttons from local storage

    $("#searchBtn").on("click", function () { // When search button is clicked:
        let cityInput = $("#searchInput").val(); // Grabs the text in the search bar
        getData(cityInput); // And uses it as the city input
        setHistory(cityInput);
    });

    $(".btn-block").on("click", function () { // When history button is clicked:
        let cityInput = $(this).text(); // Grabs the name of the button clicked
        getData(cityInput) // And uses it as the city input
    })




    function getData(city) {
        let queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + apiKey;
        $.ajax({ // ajax call to get most of the data
            url: queryURL,
            method: "GET"
        }).then(function (res) {
            let lat = res.city.coord.lat;
            let lon = res.city.coord.lon;
            let queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

            console.log(res)
            $("#cityName").html(res.city.name + " (" +  moment().format('MMMM Do YYYY') + ")");
            $("#weather").attr("src", "http://openweathermap.org/img/wn/" + res.list[0].weather[0].icon + "@2x.png");
            $("#temp").text("Temperature: " + ((res.list[0].main.temp - 273.15) * (9 / 5) + 32).toFixed(2) + "F");
            $("#humidity").text("Humidity: " + res.list[0].main.humidity + "%");
            $("#windSpeed").text("Wind speed: " + res.list[0].wind.speed + "MPH")
            $.ajax({ // 2nd ajax call to get UV Index
                url: queryURL2,
                method: "GET"
            }).then(function (res2) {
                $("#uvIndex").text("UV Index: " + res2.value);
                colorIndex(res2.value); // Colors the index value
            });
            getForcast(res); // Sets forcast display
        });
    }

    function setHistory(city) { // Sets all the buttons text to search queries and saves them to local storage
        if (historyFlag == 0) {
            historyFlag++
            $("#lastInput1").text(city);
            localStorage.setItem("History1", city)
            localStorage.setItem("historyFlag", historyFlag)
        }
        else if (historyFlag == 1) {
            historyFlag++
            $("#lastInput2").text(city);
            localStorage.setItem("History2", city)
            localStorage.setItem("historyFlag", historyFlag)
        }
        else if (historyFlag == 2) {
            historyFlag++
            $("#lastInput3").text(city);
            localStorage.setItem("History3", city)
            localStorage.setItem("historyFlag", historyFlag)
        }
        else if (historyFlag > 2) {
            historyFlag = 0
            $("#lastInput4").text(city);
            localStorage.setItem("History4", city)
            localStorage.setItem("historyFlag", historyFlag)
        }
    }

    function getHistory() {
        $("#lastInput1").text(localStorage.getItem("History1"));
        $("#lastInput2").text(localStorage.getItem("History2"));
        $("#lastInput3").text(localStorage.getItem("History3"));
        $("#lastInput4").text(localStorage.getItem("History4"));
    }

    function initializeDisplay(flag) { // Sets display based on last searched city 
        if (flag == 0) {
            let inputCity = localStorage.getItem("History4");
            getData(inputCity);
        }
        else if (flag == 1) {
            let inputCity = localStorage.getItem("History1");
            getData(inputCity);
        }
        else if (flag == 2) {
            let inputCity = localStorage.getItem("History2");
            getData(inputCity);
        }
        else if (flag == 3) {
            let inputCity = localStorage.getItem("History3");
            getData(inputCity);
        }
    }
    function getForcast(res) { // Here comes the DRYest code you've ever seen :D
        $("#forcastDate1").text(moment().add(1, 'days').format('MMMM Do YYYY'));
        $("#forcastDate2").text(moment().add(2, 'days').format('MMMM Do YYYY'));
        $("#forcastDate3").text(moment().add(3, 'days').format('MMMM Do YYYY'));
        $("#forcastDate4").text(moment().add(4, 'days').format('MMMM Do YYYY'));
        $("#forcastDate5").text(moment().add(5, 'days').format('MMMM Do YYYY'));
        $("#forcastWeather1").attr("src", "http://openweathermap.org/img/wn/" + res.list[1].weather[0].icon + "@2x.png");
        $("#forcastWeather2").attr("src", "http://openweathermap.org/img/wn/" + res.list[2].weather[0].icon + "@2x.png");
        $("#forcastWeather3").attr("src", "http://openweathermap.org/img/wn/" + res.list[3].weather[0].icon + "@2x.png");
        $("#forcastWeather4").attr("src", "http://openweathermap.org/img/wn/" + res.list[4].weather[0].icon + "@2x.png");
        $("#forcastWeather5").attr("src", "http://openweathermap.org/img/wn/" + res.list[5].weather[0].icon + "@2x.png");
        $("#forcastTemp1").text("Temp: " + ((res.list[1].main.temp - 273.15) * (9 / 5) + 32).toFixed(2) + "F");
        $("#forcastTemp2").text("Temp: " + ((res.list[2].main.temp - 273.15) * (9 / 5) + 32).toFixed(2) + "F");
        $("#forcastTemp3").text("Temp: " + ((res.list[3].main.temp - 273.15) * (9 / 5) + 32).toFixed(2) + "F");
        $("#forcastTemp4").text("Temp: " + ((res.list[4].main.temp - 273.15) * (9 / 5) + 32).toFixed(2) + "F");
        $("#forcastTemp5").text("Temp: " + ((res.list[5].main.temp - 273.15) * (9 / 5) + 32).toFixed(2) + "F");
        $("#forcastHumidity1").text("Humidity: " + res.list[1].main.humidity + "%");
        $("#forcastHumidity2").text("Humidity: " + res.list[2].main.humidity + "%");
        $("#forcastHumidity3").text("Humidity: " + res.list[3].main.humidity + "%");
        $("#forcastHumidity4").text("Humidity: " + res.list[4].main.humidity + "%");
        $("#forcastHumidity5").text("Humidity: " + res.list[5].main.humidity + "%");
    }

    function colorIndex(index) { // Colors the index value to show severity
        if (index > 0 && index <= 2) { // Green
            $("#uvIndex").css("color", "green")
        }
        else if (index > 2 && index <= 5) { // Yellow
            $("#uvIndex").css("color", "yellow")
        }
        else if (index > 5 && index <= 7) { // Gold
            $("#uvIndex").css("color", "Gold")
        }
        else if (index > 7 && index <= 10) { // Red
            $("#uvIndex").css("color", "Red")
        }
        else if (index > 10) { // Pink
            $("#uvIndex").css("color", "darkmagenta")
        }
    }
});
