import { OpenAI } from "openai";

// Get elements from the DOM
const outputImgContainer = document.querySelector(
  ".image-generator__output-img"
);
const submitBtn = document.getElementById("submit-btn");
const downloadBtn = document.getElementById("download-btn");
const instructionInput = document.getElementById("instruction");
const sizeSelect = document.getElementById("size-select");
const styleSelect = document.getElementById("style-select");
const imageGenerator = document.querySelector(".image-generator");

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

document
  .getElementById("image-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    toggleOverlay(false);

    imageGenerator.style.background = "black";
    outputImgContainer.innerHTML = '<div class="loading">Loading...</div>';

    submitBtn.disabled = true;
    submitBtn.textContent = "Fetching...";
    submitBtn.classList.add("form__button--fetching");
    submitBtn.classList.add("disabled-text");

    const prompt = instructionInput.value;
    const size = sizeSelect.value;
    const style = styleSelect.value;
    await generateImage(prompt, size, style);

    submitBtn.disabled = false;
    submitBtn.textContent = "Create";
    submitBtn.classList.remove("form__button--fetching");
    submitBtn.classList.remove("disabled-text");
    toggleOverlay(true);
  });

async function generateImage(prompt, size, style) {
  try {
    imageGenerator.classList.remove("default-background");

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: size,
      style: style,
      response_format: "b64_json",
    });
    console.log(response);
    const imageUrl = `data:image/png;base64,${response.data[0].b64_json}`;
    outputImgContainer.innerHTML = `<img src="${imageUrl}" class="generated-image" alt="AI generated content">`;
    setupDownloadButton(imageUrl);
  } catch (error) {
    console.error("An error occurred while generating the image:", error);
  }
}

function setupDownloadButton(imageUrl) {
  downloadBtn.style.display = "block";
  downloadBtn.removeEventListener("click", downloadImage);
  downloadBtn.addEventListener("click", () => downloadImage(imageUrl));
}

function downloadImage(imageUrl) {
  const imageBlob = base64ToBlob(imageUrl);
  const blobUrl = URL.createObjectURL(imageBlob);
  const tempLink = document.createElement("a");
  tempLink.href = blobUrl;
  tempLink.download = "generated-image.png";
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

function toggleOverlay(isVisible) {
  if (isVisible) {
    imageGenerator.classList.add("black-overlay");
  } else {
    imageGenerator.classList.remove("black-overlay");
  }
}
