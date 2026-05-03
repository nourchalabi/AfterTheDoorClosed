const button = document.querySelector("button");
const output = document.getElementById("sceneText");

button.addEventListener("click", generateComparison);

async function generateComparison() {
  const text = document.getElementById("textInput").value;

  if (!text) {
    output.innerHTML = "Please write a moment.";
    return;
  }

  // loading state
  output.innerHTML = "Generating text and images...";

  try {
    const response = await fetch("http://localhost:3000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    if (data.before && data.after) {
      output.innerHTML = `
        <div class="comparison">

          <div class="comparison-card before-card">
            <img src="${data.beforeImage}" alt="Before scene" class="scene-image" />
            <h3>Before</h3>
            <p>${data.before.replace(/\n/g, "<br>")}</p>
          </div>

          <div class="comparison-card after-card">
            <img src="${data.afterImage}" alt="After scene" class="scene-image" />
            <h3>After</h3>
            <p>${data.after.replace(/\n/g, "<br>")}</p>
          </div>

        </div>

        <hr>

        <p><b>Symbol:</b> ${data.symbol}</p>
        <p><b>Artist note:</b> ${data.artistNote}</p>
      `;
    } else {
      output.innerHTML = "Something went wrong.";
    }

  } catch (error) {
    console.error(error);
    output.innerHTML = "Error connecting to server.";
  }
}