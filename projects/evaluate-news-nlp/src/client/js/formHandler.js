// adding event listener
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("submit-btn");
    button.addEventListener("click", handleSubmit);
  });

// event - prevents the default for submission, retrieves the URL from form and makes a POST request
async function handleSubmit(event) {
    event.preventDefault();
  
    let formText = document.getElementById("url").value;
  
    if (formText.trim() !== "") {
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
    } else {
      alert("Please input a valid URL");
    }
  }
  
  // Declare the updateUI function separately
  export function updateUI(analysisResult) {
    console.log('Updating UI with data:', analysisResult);
    document.getElementById("score_tag").innerHTML = `Score Tag: ${analysisResult.score_tag}`;
    document.getElementById("agreement").innerHTML = `Agreement: ${analysisResult.agreement}`;
    document.getElementById("subjectivity").innerHTML = `Subjectivity: ${analysisResult.subjectivity}`;
    document.getElementById("confidence").innerHTML = `Confidence: ${analysisResult.confidence}`;
    document.getElementById("irony").innerHTML = `Irony: ${analysisResult.irony}`;
  }
  
  export { handleSubmit };