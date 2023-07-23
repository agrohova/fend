import { timeToDep } from "./tripCountdown";

// Add event listener for form submission
document.getElementById('tripForm').addEventListener('submit', handleSubmit);

//Server URL
const serverURL = 'http://localhost:4000';

// Function to handle form submission and make API requests
async function handleSubmit(event) {
  event.preventDefault();
  const city = document.getElementById('city').value;
  const depDate = document.getElementById('depDate').value;

  try {
    // Make API requests and wait for all of them to complete using Promise.all
    const [geonamesData, pixabayData] = await Promise.all([
      postRequest(`${serverURL}/geo`, { city }),
      postRequest(`${serverURL}/pixabay`, { city })
    ]);

    // Extract data from the responses
    const { lat, lon } = geonamesData.data[0];
    const weatherData = await postRequest(`${serverURL}/weather`, { lat, lon });

    const weather = weatherData.data[0].weather.description;
    const pic = pixabayData.data.hits[0].webformatURL;

    // Combine all data and update the UI
    const tripData = {
      city,
      weather,
      pic
    };

    updateUI(tripData);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to make a POST request
async function postRequest(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

// Function to update the UI with trip information
function updateUI(data) {
  document.getElementById('cityInfo').innerHTML = `In ${timeToDep(targetDate)} days you're going to ${data.city}!`;
  document.getElementById('weatherInfo').innerHTML = `Weather in ${data.city} in the last 7 days: ${data.weather}`;
  document.getElementById('picInfo').innerHTML = `<img src="${data.pic}" alt="City Image">`;
}

export { updateUI, handleSubmit }