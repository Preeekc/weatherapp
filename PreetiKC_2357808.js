const apiKey = "6955c1f27785a7d0c3f9d66880d9aa8e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchButton");
const weatherIcon = document.querySelector(".weather-icon");
const errorDiv = document.querySelector(".error");
const mycity = "Gadsden";

errorDiv.style.display = "none"; // Hide the error message initially

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + "&appid=" + apiKey);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
            document.querySelector(".weath").innerHTML = data.weather[0].main;
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
            document.querySelector(".weath").innerHTML = data.weather[0].main;
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
            document.querySelector(".weath").innerHTML = data.weather[0].main;
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
            document.querySelector(".weath").innerHTML = data.weather[0].main;
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
            document.querySelector(".weath").innerHTML = data.weather[0].main;
        }
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}

checkWeather(mycity);

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});