// adding event listener
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("submit-btn");
    button.addEventListener("click", handleSubmit);
  });

// event - prevents the default for submission, retrieves the URL from form and makes a POST request
function handleSubmit(e) {
    e.preventDefault()

    let urlData = document.getElementById("url").value;
    console.log(urlData + 'was submitted for analysis');
    if (formText.trim() !== "") {
        const rawData = await fetch("/submitData");
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
    document.getElementById("agreement").innerHTML = `Agreement: ${data.agreement}`;
    document.getElementById("subjectivity").innerHTML = `Subjectivity: ${data.subjectivity}`;
    document.getElementById("confidence").innerHTML = `Confidence: ${data.confidence}`;
    document.getElementById("irony").innerHTML = `Irony: ${data.irony}`;
  }
  
export { handleSubmit };