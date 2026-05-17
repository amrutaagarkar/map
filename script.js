const apiKey = "9b14b2cbfdfa41f6b63172731261605";


let map;
let marker;

// WEATHER
function getWeather(city){

if(!city) city = document.getElementById("city").value;

fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=yes`)
.then(res => res.json())
.then(data => {

document.getElementById("weather").innerHTML = `
<h2>${data.location.name}</h2>
<p>${data.current.temp_c}°C</p>
<p>${data.current.condition.text}</p>
`;

loadMap(data.location.lat, data.location.lon);
loadChart(data.forecast.forecastday);

sendNotification(data);

});
}

// LOCATION
function getLocation(){

navigator.geolocation.getCurrentPosition(pos => {

let lat = pos.coords.latitude;
let lon = pos.coords.longitude;

fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7`)
.then(res => res.json())
.then(data => getWeather(data.location.name));

});
}

// MAP (RADAR STYLE)
function loadMap(lat, lon){

if(!map){
map = L.map('map').setView([lat, lon], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
}

if(marker){
map.removeLayer(marker);
}

marker = L.marker([lat, lon]).addTo(map);
map.setView([lat, lon], 10);
}

// CHART
function loadChart(days){

let labels = days.map(d => d.date);
let temps = days.map(d => d.day.avgtemp_c);

new Chart(document.getElementById("chart"), {
type: 'line',
data: {
labels: labels,
datasets: [{
label: 'Temperature',
data: temps,
borderColor: 'yellow'
}]
}
});
}

// FAVORITES
function addFavorite(){
let city = document.getElementById("city").value;

let fav = JSON.parse(localStorage.getItem("fav")) || [];
fav.push(city);

localStorage.setItem("fav", JSON.stringify(fav));

alert("Added to favorites!");
}

// NOTIFICATIONS
function sendNotification(data){

if(Notification.permission !== "granted"){
Notification.requestPermission();
}

if(Notification.permission === "granted"){
new Notification("Weather Update", {
body: `${data.location.name} is ${data.current.temp_c}°C`
});
}
}

// AUTO LOAD DEFAULT
document.addEventListener("DOMContentLoaded", function () {

const apiKey = "9b14b2cbfdfa41f6b63172731261605";

const cityInput = document.getElementById("city");

console.log(cityInput);

});
