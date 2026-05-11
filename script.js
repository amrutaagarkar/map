const weatherApi = {
    key: "df7dcacdc4ca9073762c2b558f681943",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
};

let inputBox = document.getElementById("input-box");

/* Search */
inputBox.addEventListener("keypress", (event) => {

    if(event.key === "Enter"){

        getWeather(inputBox.value.trim());

    }

});

/* Fetch Weather */
function getWeather(city){

    if(city === ""){

        swal("Empty Input","Please enter city name","error");

        return;
    }

    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)

    .then(response => response.json())

    .then(data => {

        if(data.cod != 200){

            swal("Error",data.message,"error");

            return;
        }

        showWeather(data);

    })

    .catch(error => {

        console.log(error);

        swal("Error","Unable to fetch weather","error");

    });

}

/* Show Weather */
function showWeather(weather){

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
            <i class="${getWeatherIcon(weather.weather[0].main)}"></i>
        </div>

        <div class="min-max">
            ${Math.floor(weather.main.temp_min)}°C (min)
            /
            ${Math.ceil(weather.main.temp_max)}°C (max)
        </div>

        <div class="details">

            <div class="card">
                <i class="fas fa-temperature-high"></i>
                <h4>Feels Like</h4>
                <p>${weather.main.feels_like}°C</p>
            </div>

            <div class="card">
                <i class="fas fa-tint"></i>
                <h4>Humidity</h4>
                <p>${weather.main.humidity}%</p>
            </div>

            <div class="card">
                <i class="fas fa-gauge-high"></i>
                <h4>Pressure</h4>
                <p>${weather.main.pressure} mb</p>
            </div>

            <div class="card">
                <i class="fas fa-wind"></i>
                <h4>Wind</h4>
                <p>${weather.wind.speed} km/h</p>
            </div>

        </div>

    `;

    changeBackground(weather.weather[0].main);

}

/* Date */
function dateManage(dateArg){

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

    return `${day}, ${date} ${month} ${year}`;
}

/* Icons */
function getWeatherIcon(type){

    if(type === "Clear")
        return "fas fa-sun";

    else if(type === "Clouds")
        return "fas fa-cloud";

    else if(type === "Rain")
        return "fas fa-cloud-showers-heavy";

    else if(type === "Snow")
        return "fas fa-snowflake";

    else if(type === "Thunderstorm")
        return "fas fa-bolt";

    else
        return "fas fa-cloud-sun";
}

/* Dynamic Background */
function changeBackground(status){

    let body = document.body;

    if(status === "Clear"){

        body.style.background =
        "linear-gradient(180deg,#0f2027,#2c5364,#4facfe)";
    }

    else if(status === "Clouds"){

        body.style.background =
        "linear-gradient(180deg,#757f9a,#d7dde8)";
    }

    else if(status === "Rain"){

        body.style.background =
        "linear-gradient(180deg,#314755,#26a0da)";
    }

    else if(status === "Snow"){

        body.style.background =
        "linear-gradient(180deg,#83a4d4,#b6fbff)";
    }

    else{

        body.style.background =
        "linear-gradient(180deg,#162a72,#3f2b96,#8e54e9)";
    }

}

/* Dark Mode */
document
.getElementById("theme-toggle")
.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

});
