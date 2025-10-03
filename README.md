# Gemini AI UI

A modern web UI for interacting with Google's Gemini AI (text and image support).  
Built with React + Tailwind and ready to deploy on GitHub Pages!

---

## Features

- **Chat with Gemini:** Send text and images, get smart AI responses.
- **Image Upload:** Drag or select an image to send alongside your prompt.
- **API Key Security:** Key stored in browser (never sent to backend).
- **Responsive Design:** Works on desktop and mobile.
- **Easy Deploy:** Host on GitHub Pages.

---

## Setup Instructions

### 1. Get a Gemini API Key

- Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and generate a Gemini API key.

### 2. Clone This Repo

```sh
git clone https://github.com/cheekycats07-dev/gemini-ai-ui.git
cd gemini-ai-ui
```

### 3. Configure Your API Key

- Copy `.env.example` to `.env`:

```sh
cp .env.example .env
```

- Edit `.env` and paste your API key:

```
VITE_GEMINI_API_KEY=your-gemini-api-key-here
```

**Alternatively:** You can paste your key in the UI when prompted.

### 4. Install & Run Locally

```sh
npm install
npm run dev
```

- Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deploy to GitHub Pages

1. **Build:**

    ```sh
    npm run build
    ```

2. **Set up GitHub Pages:**
   - Push the repo to GitHub.
   - In your repo, go to Settings > Pages.
   - Set the source to `gh-pages` branch (see below).

3. **Deploy with [`gh-pages`](https://www.npmjs.com/package/gh-pages):**

    ```sh
    npm install --save-dev gh-pages
    ```

    Add to your `package.json`:

    ```json
    "homepage": "https://USERNAME.github.io/REPO-NAME",
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```

    Then deploy:

    ```sh
    npm run deploy
    ```

---

## Usage

- Enter your Gemini API key (one time, stored in browser for session).
- Type a question, upload an image (optional), and hit Send.
- Wait for Gemini’s reply!

---

## Privacy & Security

- Your API key is only stored in your browser (never uploaded).
- All requests go directly to Gemini API.

---

## Credits

- UI: React + Tailwind CSS
- AI: Google Gemini
- By [cheekycats07-dev](https://github.com/cheekycats07-dev)

---

## License

MIT