const fetch = require('node-fetch');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: "../../.env" });

// Pixabay API
const apiKey3 = process.env.API_KEY3;
const baseURL3 = "https://pixabay.com/api/?";

async function handlePixabayRequest(req, res) {
  const cityNamePix = req.body.city;
  try {
    const picResult = await getPics(cityNamePix);
    res.status(200).send({ success: true, data: picResult });
    console.log('Pixabay result:', picResult);
  } catch (error) {
    console.log('error', error);
    res.status(500).send({ error: 'Error processing the request.' });
  }
}
  
async function getPics(cityNamePix) {
  const pixabayUrl = `${baseURL3}key=${apiKey3}&q=${cityNamePix}&image_type=photo`;
  try {
    const response = await fetch(pixabayUrl, {
      method: "GET",
      credentials: "include",
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
}

//Exports
export { handlePixabayRequest, getPics };