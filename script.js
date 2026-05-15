const weatherApi = {

    key: "df7dcacdc4ca9073762c2b558f681943",

    baseUrl:
    "https://api.openweathermap.org/data/2.5/weather"
};

let inputBox =
document.getElementById("input-box");

/* Search */
inputBox.addEventListener("keypress",(event)=>{

    if(event.key === "Enter"){

        getWeather(inputBox.value.trim());

    }

});

/* Current Weather */
function getWeather(city){

    if(city === ""){

        swal(
            "Empty Input",
            "Please enter city",
            "error"
        );

        return;
    }

    fetch(
        `${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`
    )

    .then(response=>response.json())

    .then(data=>{

        if(data.cod != 200){

            swal(
                "Error",
                data.message,
                "error"
            );

            return;
        }

        showWeather(data);

        getForecast(city);

    })

    .catch(()=>{

        swal(
            "Error",
            "Unable to fetch weather",
            "error"
        );

    });

}

/* Show Weather */
function showWeather(weather){

    let weatherBody =
    document.getElementById("weather-body");

    weatherBody.style.display = "block";

    weatherBody.innerHTML = `

        <div class="city">
            ${weather.name}, ${weather.sys.country}
        </div>

        <div class="date">
            ${new Date().toDateString()}
        </div>

        <div class="temp">
            ${Math.round(weather.main.temp)}°C
        </div>

        <div class="weather">
            ${weather.weather[0].main}
            <i class="${getWeatherIcon(
                weather.weather[0].main
            )}"></i>
        </div>

        <div class="min-max">
            ${Math.floor(weather.main.temp_min)}°C
            /
            ${Math.ceil(weather.main.temp_max)}°C
        </div>

        <div class="details">

            <div class="card">
                <h4>Humidity</h4>
                <p>${weather.main.humidity}%</p>
            </div>

            <div class="card">
                <h4>Wind</h4>
                <p>${weather.wind.speed} km/h</p>
            </div>

            <div class="card">
                <h4>Pressure</h4>
                <p>${weather.main.pressure} mb</p>
            </div>

            <div class="card">
                <h4>Feels Like</h4>
                <p>${weather.main.feels_like}°C</p>
            </div>

        </div>
    `;

    changeBackground(
        weather.weather[0].main
    );

    if(weather.weather[0].main === "Rain"){

        createRain();

    }

}

/* Forecast */
function getForecast(city){

    fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApi.key}&units=metric`
    )

    .then(response=>response.json())

    .then(data=>{

        showForecast(data);

        showChart(data);

    });

}

/* Show Forecast */
function showForecast(data){

    let forecast =
    document.getElementById("forecast");

    forecast.innerHTML = "";

    let filtered =
    data.list.filter(item=>
        item.dt_txt.includes("12:00:00")
    );

    filtered.forEach(item=>{

        let date =
        new Date(item.dt_txt);

        let day =
        date.toLocaleDateString(
            "en-US",
            {weekday:"short"}
        );

        forecast.innerHTML += `

            <div class="forecast-card">

                <h4>${day}</h4>

                <p>
                    ${Math.round(item.main.temp)}°C
                </p>

                <small>
                    ${item.weather[0].main}
                </small>

            </div>

        `;

    });

}

/* Chart */
function showChart(data){

    let ctx =
    document.getElementById("weatherChart");

    let labels = [];

    let temps = [];

    data.list.slice(0,8).forEach(item=>{

        labels.push(
            item.dt_txt
            .split(" ")[1]
            .slice(0,5)
        );

        temps.push(item.main.temp);

    });

    if(window.weatherChartInstance){

        window.weatherChartInstance.destroy();

    }

    window.weatherChartInstance =
    new Chart(ctx,{

        type:"line",

        data:{

            labels:labels,

            datasets:[{

                label:"Temperature °C",

                data:temps,

                borderColor:"#ffffff",

                backgroundColor:
                "rgba(255,255,255,0.15)",

                fill:true,

                tension:0.4

            }]
        },

        options:{

            responsive:true,

            plugins:{

                legend:{
                    labels:{
                        color:"white"
                    }
                }
            },

            scales:{

                x:{
                    ticks:{
                        color:"white"
                    }
                },

                y:{
                    ticks:{
                        color:"white"
                    }
                }
            }
        }

    });

}

/* Rain */
function createRain(){

    let rain =
    document.getElementById("rain");

    rain.innerHTML = "";

    for(let i=0;i<100;i++){

        let drop =
        document.createElement("div");

        drop.classList.add("drop");

        drop.style.left =
        Math.random()*100 + "vw";

        drop.style.animationDuration =
        Math.random()*1 + 0.5 + "s";

        rain.appendChild(drop);

    }

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

    else
        return "fas fa-cloud-sun";
}

/* Background */
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
