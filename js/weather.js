//const apiKey = "455824e7ed337e8de497f4bb762eb42b";
const apiKey = "62b80c7071058c9ed49756bd0d024243";
const apiURL = "https://api.openweathermap.org/data/2.5/";

export async function getWeatherData(lat, lon){
    let response = await fetch(`${apiURL}weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    let data = await response.json();
    return data;
}

export async function getForecastData(lat, lon){
    let response = await fetch(`${apiURL}forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
   ;
    
    let data = await response.json();
    return data;
}


export async function getTestWeatherData(){
    let response = await fetch("./test/weatherMoscow.json");
    let data = await response.json();
    return data;
}

export async function getTestForecastData(){
    let response = await fetch("./test/forecastMoscow.json");
    let data = await response.json();
    return data;
}
