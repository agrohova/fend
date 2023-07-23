let projectData

//API 1: Geonames
//Geonames API doesn't require an API key, but a user name
const userName1 = process.env.USER_NAME1
const baseURL1 = "https://api.geonames.org/citiesJSON?";
let geonamesData = {};

//fetching data from API 1

const getLatLon = async (cityName) => { 
  const geonamesUrl = `${baseURL1}q=${cityName}&username=${userName1}`;
  
  try {
    const response = await fetch(geonamesUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();
    console.log('Geonames API Response:', data);
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

//exporting function
  
export { getLatLon };

//API 2 Weatherbit

//Weatherbit API documentation: https://www.weatherbit.io/api/weather-forecast-16-day
//Weatherbit only allows 7 days weather forecast as seen here: https://www.weatherbit.io/pricing

const apiKey2 = process.env.API_KEY2;
const baseURL2 = "https://api.weatherbit.io/v2.0/forecast/daily?";

//fetching data from API 2

const getWeather = async (lat, lon) => { //we're getting the lat, lon value from getLatLon function
  const weatherUrl = `${baseURL2}lat=${lat}&lon=${lon}&key=${apiKey2}`;
  
  try {
    const response = await fetch(weatherUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();
    console.log('Weatherbit API Response:', data);
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

//exporting function
  
export { getWeather };

//API 3 Pixabay

const apiKey3 = process.env.API_KEY3;
const baseURL3 = "https://pixabay.com/api/?";


//fetching data from API 3

const getPics = async (cityName) => {
  const pixabayUrl = `${baseURL3}key=${apiKey3}&q=${cityName}&image_type=photo`;
  
  try {
    const response = await fetch(pixabayUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();
    console.log('Pixabay API Response:', data);
    return data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

//exporting function
  
export { getPics };