/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Establish GET route to fetch the data from the app endpoint
let projectData;

const fetchData = async () => {
  try {
    const response = await fetch('/data');
    projectData = await response.json();
    console.log(projectData);
  } catch (error) {
    console.log("Error:", error);
  }
};

// Establish POST route
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
    console.log("error", error)
    }
};

