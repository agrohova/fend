import { timeToDep } from "./tripCountdown";

function updateUI() {
    
    cityInfo.innerHTML=`
    <div>Your trip to ${cityName} is ${timeToDep(targetDate)} days away!</div> 
    `

    weatherInfo.innerHTML=`
    <div> Here's a weather forecast for ${cityName} for the next 7 days:</div>
        <div> enter weather forecast here</div>
    <div> 
        <img src=${pixabayimage} alt="Photo of the city">
    </div>
    `
}

export { updateUI }