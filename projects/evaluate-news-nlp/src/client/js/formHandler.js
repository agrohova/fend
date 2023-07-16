// adding event listener
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("submit-btn");
    button.addEventListener("click", handleSubmit);
  });

// event - prevents the default for submission, retrieves the URL from form and makes a POST request
async function handleSubmit(event) {
    event.preventDefault();

    let formText = document.getElementById("url").value;
    console.log('form submitted');
    if (formText.trim() !== "") {
        const rawData = await fetch("http://localhost:8081/submitData", {
            method: "POST",
            credentials: "same-origin",
            headers: { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(formText), 
        });

        console.log("RawData", rawData);
        if (rawData.ok) {
            const data = await rawData.json();
            updateUI(data);
        } else {
            alert("Error processing the request. Please try again later.");
        }
    } else {
        alert("Please input a valid URL");
    }
}
  
export function updateUI(data) {
    document.getElementById("score_tag").innerHTML = `Score Tag: ${data.score_tag}`;
    document.getElementById("model").innerHTML = `Model: ${data.model}`;
    document.getElementById("agreement").innerHTML = `Agreement: ${data.agreement}`;
    document.getElementById("subjectivity").innerHTML = `Subjectivity: ${data.subjectivity}`;
    document.getElementById("confidence").innerHTML = `Confidence: ${data.confidence}`;
    document.getElementById("irony").innerHTML = `Irony: ${data.irony}`;
  }
  
export { handleSubmit };