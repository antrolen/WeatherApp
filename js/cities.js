export async function getCities() {
    let response = await fetch("cities.json");
    let data = await response.json();
    return data;
};

export async function getCity(sCity) {
    let cities = await getCities();
    let result = undefined;
    for (const city of cities) {
        if (city.name == sCity) {
            result = city;
            break;
        }
    }
    return result;
};
