# ScapeGen

**ScapeGen** is a dynamic image generation tool, leveraging the powerful capabilities of DALL-E 3 to produce images in different aspects: landscape, portrait, and square. It's the perfect companion for quickly generating visuals for presentations, mockups, or any project that requires a creative touch.

![ScapeGen Demo](https://github.com/Harry-Yates/ScapeGen/blob/main/images/cat_github.png)

## Features

- **Dynamic Image Generation**: Generate images on the fly based on user input.
- **Multiple Aspect Ratios**: Supports landscape, portrait, and square images to fit various presentation formats.
- **User-friendly Interface**: Simple and intuitive UI, allowing for seamless operation.
- **Download Capability**: Easily download the generated images for offline use.

This project is built with a modern tech stack, chosen for performance and scalability:

- **Vanilla JavaScript (ES6+)**: For the core functionality of the application.
- **OpenAI's DALL-E 3**: For image generation.
- **CSS**: For styling the application.
<!-- - **Node.js**: For running the application. -->

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the latest version of npm installed:

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/ScapeGen.git
   ```
2. Install NPM packages
   ```js
   npm install
   ```
3. Enter your API key in `.env`
   ```sh
   VITE_OPENAI_API_KEY = 'ENTER YOUR API';
   ```

## Usage

To use **ScapeGen**, follow these steps:

1. Run the application:
   ```sh
   npm start
   ```
2. Navigate to `http://localhost:3000/` (or the configured port).

3. Enter your image generation prompt, select the desired size and style, and hit the "Create" button.

4. Wait for the image to be generated and displayed on the screen.

5. Use the "Download" button to save the image locally.
