import * as weatherApi from '../js/weather.js'
import * as citiesApi from '../js/cities.js'

let searchForm = document.forms.citySearch;





searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    let cityName = searchForm.city.value;
    let city;
    console.log(cityName);
    let dataWeather;
    let dataForecast;
    // Test
    if (cityName == "" || cityName == "test") {
        dataWeather = await weatherApi.getTestWeatherData();
        setWeatherData(dataWeather);
        dataForecast = await weatherApi.getTestForecastData();
        setForecastData(dataForecast);
    } else {
        city = await citiesApi.getCity(cityName);
        if (city) {
            dataWeather = await weatherApi.getWeatherData(city.lat, city.lng);
            console.log(dataWeather);
            setWeatherData(dataWeather);
            dataForecast = await weatherApi.getForecastData(city.lat, city.lng);
            setForecastData(dataForecast);
            console.log(dataForecast);
        }
        console.log(city);
    }
});



document.addEventListener("DOMContentLoaded", async () => {
    let cities = await citiesApi.getCities();
    rst(cities);

});

function rst(cities) {
    let list = document.querySelector("#cities");
    list.innerHTML = "";
    for (const city of cities) {
        let option = document.createElement("option");
        option.value = city.name;
        list.append(option);
    }

}

searchForm.city.addEventListener("input", async () => {
    let cities = await citiesApi.getCities();

    cities.filter(city => {
        return city.name.startsWith(event.target.value);
    });
    rst(cities);
});


function setWeatherData(data) {
    let todayWeather = document.querySelector("#todayWeather");

    let dB1 = todayWeather.firstElementChild;
    let dCity = dB1.firstElementChild.firstElementChild.firstElementChild;
    let dTime = dB1.firstElementChild.nextElementSibling.firstElementChild;
    let dCountry = dCity.nextElementSibling;


    let dB2 = dB1.nextElementSibling;
    let dTemp = dB2.firstElementChild.firstElementChild;
    let dIco = dB2.firstElementChild.nextElementSibling.firstElementChild;
    let dWDesc = dIco.nextElementSibling;

    let dB3 = dB2.firstElementChild.nextElementSibling.nextElementSibling;
    let dWind = dB3.firstElementChild.firstElementChild.nextElementSibling;
    let dPrec = dWind.parentElement.nextElementSibling.firstElementChild.nextElementSibling;
    let dBar = dPrec.parentElement.nextElementSibling.firstElementChild.nextElementSibling;


    dTemp.innerHTML = (data.main.temp - 273.15).toPrecision(2) + " &#8451";
    dWDesc.innerHTML = data.weather[0].description;
    dIco.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

    dCity.innerHTML = `${data.name}<span class="badge badge-light">${data.sys.country}</span>`;
    //    dCountry.innerHTML = data.sys.country;
    dTime.innerHTML = (new Date(data.dt * 1000)).toTimeString().substr(0, 8);

    dWind.innerHTML = data.wind.speed.toFixed(1) + " m/s";

    let prec;
    if (data.rain != undefined) {
        prec = data.rain["1h"].toFixed(1) + " mm";
    } else if (data.snow != undefined) {
        prec = data.snow["1h"].toFixed(1) + " mm";
    } else {
        prec = "";
    }
    dPrec.innerHTML = prec;

    dBar.innerHTML = (data.main.pressure / 1000).toFixed(1) + " Bar";
}


function setForecastData(data) {
    let forecast = document.querySelector("#forecast5");

    let days = forecast.children;
    for (let i = 0; i < 5; i++) {
        let dayData = data.list[i * 8];
        let date = new Date(dayData.dt * 1000);

        let dDay = days[i].firstElementChild.firstElementChild;
        let dDate = dDay.nextElementSibling;
        let dIco = dDate.nextElementSibling;
        let dTemp = dIco.nextElementSibling;

        dDay.innerHTML = new Intl.DateTimeFormat("en-US", {
            weekday: "short"
        }).format(date);

        dDate.innerHTML = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        }).format(date);

        dIco
            .setAttribute("src", `http://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`);

        dTemp.innerHTML = (dayData.main.temp).toPrecision(2) + " &#8451";

    }

}


async function testW() {
    let data;
    data = await weatherApi.getTestWeatherData();
    setWeatherData(data);
}

async function testF() {
    let data = await weatherApi.getTestForecastData();
    setForecastData(data);

}

//testW();
//testF();