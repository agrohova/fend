//import JS
import { handleSubmit, updateUI, postRequest } from './js/handleSubmit.js'; 
import { todaysDate, timeToDep } from './js/tripCountdown.js';
import { handlePixabayRequest, getPics } from './js/picHandler.js';
import { handleWeatherbitRequest, getWeather} from './js/weatherHandler.js';
import { handleGeonamesRequest, getLatLon } from './js/geoHandler.js';

//import scss
import './styles/style.scss'

//export JS
export {
    todaysDate, 
    timeToDep, 
    handleSubmit, 
    updateUI, 
    postRequest,
    handlePixabayRequest, 
    getPics, 
    handleWeatherbitRequest, 
    getWeather, 
    handleGeonamesRequest, 
    getLatLon
}; 
