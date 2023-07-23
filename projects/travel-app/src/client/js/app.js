import { timeToDep } from "./tripCountdown";

// Add event listener for form submission
document.getElementById('tripForm').addEventListener('submit', handleSubmit);

// Function to handle form submission and make API requests
async function handleSubmit(event) {
  event.preventDefault();
  const city = document.getElementById('city').value;
  const depDate = document.getElementById('depDate').value;

  try {
    // Make a POST request to Geonames API
    const geonamesData = await postGeonames(city);
    const { lat, lon } = geonamesData.data[0];

    // Make a POST request to Weatherbit API
    const weatherData = await postWeatherbit(lat, lon);

    // Make a POST request to Pixabay API
    const pixabayData = await postPixabay(city);

    // Combine all data and update the UI
    const tripData = {
      city,
      weather: weatherData.data[0].weather.description,
      pic: pixabayData.data.hits[0].webformatURL
    };

    updateUI(tripData);
  } catch (error) {
    console.error('Error:', error);
  }
}

// POST request to Geonames API

async function postGeonames(city) {
  const response = await fetch('/geo', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ city })
  });
  return await response.json();
}

// POST request to Weatherbit API
async function postWeatherbit(lat, lon) {
  const response = await fetch('/weather', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lat, lon })
  });
  return await response.json();
}

// POST request to Pixabay API
async function postPixabay(city) {
  const response = await fetch('/pixabay', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ city })
  });
  return await response.json();
}

// Function to update the UI with trip information
function updateUI(data) {
  document.getElementById('cityInfo').innerHTML = `City: ${data.city}`;
  document.getElementById('weatherInfo').innerHTML = `Weather: ${data.weather}`;
  document.getElementById('picInfo').innerHTML = `<img src="${data.pic}" alt="City Image">`;
}

export { updateUI, handleSubmit, postPixabay, postWeatherbit, postGeonames }

/**  event - prevents the default for submission, retrieves the URL from form and makes a POST request
async function formHandler(event) {
  event.preventDefault();

  let formText = document.getElementById("url").value;
  const rawData = await fetch("/submitData", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "body": "body"
      },
      body: JSON.stringify({ url: formText }),
  });

  console.log("Raw Data from API:", rawData);

  if (rawData.ok) {
    const response = await rawData.json();
    const analysisResult = response.data;
    console.log("Analysis Result:", analysisResult);
    updateUI(analysisResult); // Call the separate updateUI function here
  } else {
    alert("Error processing the request. Please try again later.");
  }
} 
export { formHandler };

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

export { updateUI } */
