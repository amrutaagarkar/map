// script.js

const weatherApi = {
 key: 'df7dcacdc4ca9073762c2b558f681943',

    baseUrl: 'https://api.openweathermap.org/data/2.5/weather',

    forecastUrl: 'https://api.openweathermap.org/data/2.5/forecast'
};


// Elements

const inputBox = document.getElementById('input-box');

const searchBtn = document.getElementById('search-btn');

const weatherBody = document.getElementById('weather-body');

const forecastContainer = document.getElementById('forecast');

const loader = document.getElementById('loader');


// Enter Key Search

inputBox.addEventListener('keypress', (e)=>{

    if(e.key === 'Enter'){

        getWeather(inputBox.value);
    }
});


// Button Search

searchBtn.addEventListener('click', ()=>{

    getWeather(inputBox.value);
});


// Main Function

function getWeather(city){

    if(city === ""){

        swal("Empty Input","Please enter city name","error");

        return;
    }

    loader.style.display = "block";

    // Current Weather

    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)

    .then(response => response.json())

    .then(data => {

        showWeather(data);

        loader.style.display = "none";
    });


    // Forecast

    fetch(`${weatherApi.forecastUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)

    .then(response => response.json())

    .then(data => {

        showForecast(data);
    });
}


// Show Current Weather

function showWeather(weather){

    if(weather.cod == "404"){

        swal("City Not Found","Enter correct city","warning");

        return;
    }

    weatherBody.style.display = "block";

    let sunrise =
        new Date(weather.sys.sunrise * 1000)
        .toLocaleTimeString();

    let sunset =
        new Date(weather.sys.sunset * 1000)
        .toLocaleTimeString();

    weatherBody.innerHTML = `

    <div class="weather-icon">

        <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png">

    </div>

    <h2>${weather.name}, ${weather.sys.country}</h2>

    <div class="temp">

        ${Math.round(weather.main.temp)}°C

    </div>

    <div class="weather">

        ${weather.weather[0].main}

    </div>

    <div class="details">

        <div class="card">

            <h3>Humidity</h3>

            <p>${weather.main.humidity}%</p>

        </div>

        <div class="card">

            <h3>Wind</h3>

            <p>${weather.wind.speed} KM/H</p>

        </div>

        <div class="card">

            <h3>Pressure</h3>

            <p>${weather.main.pressure} mb</p>

        </div>

        <div class="card">

            <h3>Feels Like</h3>

            <p>${weather.main.feels_like}°C</p>

        </div>

        <div class="card">

            <h3>Sunrise</h3>

            <p>${sunrise}</p>

        </div>

        <div class="card">

            <h3>Sunset</h3>

            <p>${sunset}</p>

        </div>

    </div>
    `;

    changeBg(weather.weather[0].main);

    inputBox.value = "";
}


// Forecast

function showForecast(data){

    forecastContainer.innerHTML = "";

    if(!data.list){

        return;
    }

    let forecastData = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    forecastData.forEach(item => {

        let day =
            new Date(item.dt_txt)
            .toLocaleDateString('en-US',{
                weekday:'short'
            });

        forecastContainer.innerHTML += `

        <div class="forecast-card">

            <h3>${day}</h3>

            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png">

            <p>${Math.round(item.main.temp)}°C</p>

            <p>${item.weather[0].main}</p>

        </div>
        `;
    });
}


// Dynamic Background

function changeBg(status){

    if(status === 'Clouds'){

        document.body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2070&auto=format&fit=crop')";
    }

    else if(status === 'Rain'){

        document.body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2070&auto=format&fit=crop')";
    }

    else if(status === 'Clear'){

        document.body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop')";
    }

    else if(status === 'Snow'){

        document.body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1516431883659-655d41c09bf9?q=80&w=2070&auto=format&fit=crop')";
    }

    else if(status === 'Thunderstorm'){

        document.body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=2070&auto=format&fit=crop')";
    }

    else if(
        status === 'Mist' ||
        status === 'Fog' ||
        status === 'Haze'
    ){

        document.body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=2070&auto=format&fit=crop')";
    }

    else{

        document.body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=2070&auto=format&fit=crop')";
    }

    document.body.style.backgroundSize = "cover";

    document.body.style.backgroundPosition = "center";
}
