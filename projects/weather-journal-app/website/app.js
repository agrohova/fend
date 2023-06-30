/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API + base URL
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=7894384e82f18d75b150e1164ca2fd72&units=metric';


//Integrating OpenWeatherMap API

//Async function to make a GET request to OpenWeatherMap API

const getWeather = async (baseURL, zip, apiKey)=>{
  const res = await fetch(baseURL+zip+apiKey);
  try {
      const data = await res.json();
      console.log(data);
      return data;
  } catch(error) {
      console.log("error", error);
  }
}

//Event listener for the element with the id: generate, with a callback function to execute when it is clicked

document.getElementById('generate').addEventListener('click', performAction);
function performAction(e) {
    let zip = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;

//Inside that callback function call your async GET request with the parameters: base url, user entered zip code, personal API key
    getData(baseURL, zip, apiKey)

    .then(function(data){
        console.log(data)
        postData('/add', {temperature: data.main.temp, response: feelings, date: newDate})
    .then(function() {
        updateUI()
    })
})
}

//Promise that makes a POST request to add the API data, as well as data entered by the user, to your app. 
//--> async function to make this POST request - should receive a path and a data object - data object should include temperature, date and user response

const postData = async (url = '', data = {}) =>{
  console.log(data);
      const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
  });

  try {
      const newData = await response.json();
      console.log(newData);
      return newData;
  } catch(error) {
    console.log("error", error);
  }
};

// Updates UI dynamically: async function that is called after the completed POST request
//This function should retrieve data from our app, select the necessary elements on the DOM (index.html), and then update their necessary values to reflect the dynamic values for Temperature, Date and User input
const updateUI = async() => {
  const req = await fetch('/data');
  try{
      const allData = await req.json();
      console.log(allData)
       // Write updated data to DOM elements
      document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
      document.getElementById('content').innerHTML = allData.feel;
      document.getElementById("date").innerHTML = allData.date;
      
  }catch(error){
    console.log("error", error);
  }
}

// Establish GET route to fetch the data from the app endpoint
let projectData;

const fetchData = async () => {
  try {
    const response = await fetch('/data');
    projectData = await response.json();
    console.log(projectData);
  } catch (error) {
    console.log("error", error);
  }
};