const weatherApi = {
    key: "YOUR_API_KEY",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
};

let inputBox = document.getElementById("input-box");

/* SEARCH */
inputBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getWeatherReport(inputBox.value.trim());
    }
});

/* FETCH WEATHER */
function getWeatherReport(city) {

    if (!city) {
        swal("Empty Input", "Please enter city name", "error");
        return;
    }

    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then(response => response.json())
        .then(showWeatherReport)
        .catch(() => {
            swal("Error", "Something went wrong", "error");
        });
}

/* SHOW WEATHER */
function showWeatherReport(weather) {

    if (weather.cod == 404) {
        swal("City Not Found", "Please enter valid city", "warning");
        return;
    }

    let weatherBody = document.getElementById("weather-body");

    weatherBody.style.display = "block";

    let todayDate = new Date();

    weatherBody.innerHTML = `

        <div class="city">
            ${weather.name}, ${weather.sys.country}
        </div>

        <div class="date">
            ${dateManage(todayDate)}
        </div>

        <div class="temp">
            ${Math.round(weather.main.temp)}°C
        </div>

        <div class="weather">
            ${weather.weather[0].main}
            <i class="${getIconClass(weather.weather[0].main)}"></i>
        </div>

        <div class="min-max">
            ${Math.floor(weather.main.temp_min)}°C (min) /
            ${Math.ceil(weather.main.temp_max)}°C (max)
        </div>

        <div class="basic">
            Feels like ${weather.main.feels_like}°C |
            Humidity ${weather.main.humidity}% <br>
            Pressure ${weather.main.pressure} mb |
            Wind ${weather.wind.speed} km/h
        </div>

    `;

    changeBg(weather.weather[0].main);
    toggleClouds(weather.weather[0].main);

    inputBox.value = "";
}

/* DATE */
function dateManage(dateArg) {

    let days = [
        "Sunday","Monday","Tuesday",
        "Wednesday","Thursday","Friday","Saturday"
    ];

    let months = [
        "January","February","March","April",
        "May","June","July","August",
        "September","October","November","December"
    ];

    let day = days[dateArg.getDay()];
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let year = dateArg.getFullYear();

    return `${date} ${month} (${day}), ${year}`;
}

/* ICONS */
function getIconClass(weatherType) {

    if (weatherType === "Clear")
        return "fas fa-sun";

    else if (weatherType === "Clouds")
        return "fas fa-cloud";

    else if (weatherType === "Rain")
        return "fas fa-cloud-showers-heavy";

    else if (weatherType === "Snow")
        return "fas fa-snowflake";

    else if (weatherType === "Thunderstorm")
        return "fas fa-bolt";

    else if (weatherType === "Mist")
        return "fas fa-smog";

    else
        return "fas fa-cloud-sun";
}

/* DYNAMIC BACKGROUND */
function changeBg(status) {

    let body = document.body;

    if (status === "Clear") {

        body.style.background =
            "linear-gradient(135deg,#fceabb,#f8b500)";

    }

    else if (status === "Clouds") {

        body.style.background =
            "linear-gradient(135deg,#bdc3c7,#2c3e50)";

    }

    else if (status === "Rain") {

        body.style.background =
            "linear-gradient(135deg,#4b79a1,#283e51)";

    }

    else if (status === "Snow") {

        body.style.background =
            "linear-gradient(135deg,#e6dada,#274046)";

    }

    else if (status === "Thunderstorm") {

        body.style.background =
            "linear-gradient(135deg,#141e30,#243b55)";

    }

    else {

        body.style.background =
            "linear-gradient(135deg,#667eea,#764ba2)";
    }
}

/* CLOUD CONTROL */
function toggleClouds(status) {

    let clouds = document.querySelector(".clouds");

    if (status === "Clouds" || status === "Mist") {
        clouds.style.display = "block";
    }

    else {
        clouds.style.display = "none";
    }
}

/* DARK MODE */
document
    .getElementById("theme-toggle")
    .addEventListener("click", () => {

        document.body.classList.toggle("dark");

});
