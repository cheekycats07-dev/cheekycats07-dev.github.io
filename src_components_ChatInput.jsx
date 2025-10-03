import React, { useState, useRef } from "react";
import ImagePreview from "./ImagePreview";

export default function ChatInput({ onSend, disabled, loading }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const fileInput = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage({ preview: ev.target.result, base64: ev.target.result.split(",")[1], type: file.type });
    };
    reader.readAsDataURL(file);
  };

  const handleSend = () => {
    if (!text && !image) return;

    onSend({ text, image });
    setText("");
    setImage(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        className="w-full border p-2 rounded resize-none focus:ring"
        rows={2}
        placeholder="Type your question or prompt…"
        value={text}
        disabled={disabled}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
      />
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={handleImageChange}
          disabled={disabled}
          className="block"
        />
        {image && <ImagePreview src={image.preview} onRemove={() => setImage(null)} />}
        <button
          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold disabled:opacity-50"
          onClick={handleSend}
          disabled={disabled || (!text && !image)}
        >
          {loading ? "Sending…" : "Send"}
        </button>
      </div>
    </div>
  );
}