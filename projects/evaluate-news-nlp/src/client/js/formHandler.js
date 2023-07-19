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
            },
            body: JSON.stringify({url: formText}), 
        });

        if (rawData.ok) {
            const response = await rawData.json();
            const analysisResult = response;
            console.log("Analysis Result:", analysisResult);
            updateUI(response);

        } else {
            alert("Error processing the request. Please try again later.");
        }
    } else {
        alert("Please input a valid URL");
    }
}

export { handleSubmit };

export function updateUI(response) {
    document.getElementById("score_tag").innerHTML = `Score Tag: ${response.score_tag}`;
    document.getElementById("agreement").innerHTML = `Agreement: ${response.agreement}`;
    document.getElementById("subjectivity").innerHTML = `Subjectivity: ${response.subjectivity}`;
    document.getElementById("confidence").innerHTML = `Confidence: ${response.confidence}`;
    document.getElementById("irony").innerHTML = `Irony: ${response.irony}`;
  }