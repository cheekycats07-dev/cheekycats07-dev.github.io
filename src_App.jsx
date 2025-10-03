import React, { useState, useRef } from "react";
import ChatInput from "./components/ChatInput";
import ChatMessage from "./components/ChatMessage";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Store API key in local storage for session (or .env for dev)
  const [apiKey, setApiKey] = useState(localStorage.getItem("GEMINI_API_KEY") || "");

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
    localStorage.setItem("GEMINI_API_KEY", e.target.value);
  };

  async function sendMessage({ text, image }) {
    setLoading(true);

    // Build Gemini API request
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=" + apiKey;

    let requestBody = {
      contents: [
        {
          parts: [
            ...(text ? [{ text }] : []),
            ...(image ? [{
              inlineData: {
                mimeType: image.type,
                data: image.base64, // base64 string
              }
            }] : [])
          ]
        }
      ]
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      const data = await res.json();

      // Gemini returns candidate responses
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";

      setMessages(m => [
        ...m,
        { type: "user", text, image: image?.preview },
        { type: "ai", text: aiText }
      ]);
    } catch (err) {
      setMessages(m => [
        ...m,
        { type: "ai", text: "Error: " + err.message }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 px-2">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-semibold">Gemini API Key</label>
          <input
            type="password"
            value={apiKey}
            onChange={handleApiKeyChange}
            className="w-full px-3 py-2 border rounded outline-none focus:ring"
            placeholder="Paste your Gemini API Key here"
          />
        </div>
        <div className="h-96 overflow-y-auto flex flex-col gap-4 mb-4 border rounded p-3 bg-gray-50">
          {messages.length === 0 && (
            <div className="text-gray-400 text-center mt-10">Start the conversation…</div>
          )}
          {messages.map((msg, i) =>
            <ChatMessage key={i} {...msg} />
          )}
        </div>
        <ChatInput onSend={sendMessage} disabled={!apiKey || loading} loading={loading} />
      </div>
      <footer className="mt-8 text-gray-400 text-sm">
        Built with <span className="font-semibold">Gemini API</span> | <a href="https://github.com/cheekycats07-dev/gemini-ai-ui" className="underline">Source on GitHub</a>
      </footer>
    </div>
  );
}