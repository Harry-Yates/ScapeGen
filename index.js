// index.js
import { OpenAI } from "openai";

const outputImg = document.getElementById("output-img");
const submitBtn = document.getElementById("submit-btn");
const downloadBtn = document.getElementById("download-btn");
const instructionInput = document.getElementById("instruction");
const sizeSelect = document.getElementById("size-select");
const styleSelect = document.getElementById("style-select"); // Style selector

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

submitBtn.addEventListener("click", async () => {
  // Update button to fetching state
  submitBtn.disabled = true;
  submitBtn.textContent = "Fetching...";
  submitBtn.classList.add("button-fetching");

  const prompt = instructionInput.value;
  const size = sizeSelect.value;
  const style = styleSelect.value; // Get the selected style
  await generateImage(prompt, size, style);

  // Reset button state after fetching
  submitBtn.disabled = false;
  submitBtn.textContent = "Create";
  submitBtn.classList.remove("button-fetching");
});

async function generateImage(prompt, size, style) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: size,
      style: style, // Use the selected style
      response_format: "b64_json",
    });
    console.log(response);
    const imageUrl = `data:image/png;base64,${response.data[0].b64_json}`;
    outputImg.innerHTML = `<img src="${imageUrl}" style="max-width: 100%; height: auto;">`;
    setupDownloadButton(imageUrl);
  } catch (error) {
    console.error("An error occurred while generating the image:", error);
    // Optionally reset the UI here if needed
  }
}

function setupDownloadButton(imageUrl) {
  downloadBtn.style.display = "block"; // Show the download button
  downloadBtn.removeEventListener("click", downloadImage); // Remove any old event listener
  downloadBtn.addEventListener("click", () => downloadImage(imageUrl));
}

function downloadImage(imageUrl) {
  const imageBlob = base64ToBlob(imageUrl);
  const blobUrl = URL.createObjectURL(imageBlob);
  const tempLink = document.createElement("a");
  tempLink.href = blobUrl;
  tempLink.download = "generated-image.png"; // Name the download file
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}

function base64ToBlob(base64) {
  const byteString = atob(base64.split(",")[1]);
  const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
  const byteNumbers = new Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteNumbers[i] = byteString.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeString });
}
