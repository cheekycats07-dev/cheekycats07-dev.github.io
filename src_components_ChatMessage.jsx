import React from "react";

export default function ChatMessage({ type, text, image }) {
  const isUser = type === "user";
  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div className={`rounded-xl px-4 py-2 mb-1 max-w-[80%] ${isUser ? "bg-blue-100 text-right" : "bg-gray-200"}`}>
        {image && (
          <img src={image} alt="User upload" className="mb-2 max-h-40 rounded" />
        )}
        {text}
      </div>
      <div className={`text-xs ${isUser ? "text-blue-400" : "text-gray-500"}`}>
        {isUser ? "You" : "Gemini AI"}
      </div>
    </div>
  );
}