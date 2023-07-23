const dotenv = require('dotenv');
dotenv.config({ path: "./.env" });

// Geonames API
const userName1 = process.env.USER_NAME1;
const baseURL1 = "https://api.geonames.org/citiesJSON?";

// Weatherbit API
const apiKey2 = process.env.API_KEY2;
const baseURL2 = "https://api.weatherbit.io/v2.0/forecast/daily?";

// Pixabay API
const apiKey3 = process.env.API_KEY3;
const baseURL3 = "https://pixabay.com/api/?";

module.exports = {
  userName1,
  baseURL1,
  apiKey2,
  baseURL2,
  apiKey3,
  baseURL3,
};