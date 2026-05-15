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

/* Get Weather */
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

    })

    .catch(()=>{

        swal(
            "Error",
            "Something went wrong",
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

        <div class="temp">
            ${Math.round(weather.main.temp)}°C
        </div>

        <div class="weather">
            ${weather.weather[0].main}
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
}

/* Dynamic Background */
function changeBackground(status){

    if(status === "Clear"){

        document.body.style.background =
        "linear-gradient(180deg,#4facfe,#00f2fe)";
    }

    else if(status === "Clouds"){

        document.body.style.background =
        "linear-gradient(180deg,#757f9a,#d7dde8)";
    }

    else if(status === "Rain"){

        document.body.style.background =
        "linear-gradient(180deg,#314755,#26a0da)";
    }

    else if(status === "Snow"){

        document.body.style.background =
        "linear-gradient(180deg,#83a4d4,#b6fbff)";
    }

    else{

        document.body.style.background =
        "linear-gradient(180deg,#0f2027,#203a43,#2c5364)";
    }

}
