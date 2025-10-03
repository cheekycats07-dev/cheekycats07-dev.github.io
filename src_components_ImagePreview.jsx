import React from "react";

export default function ImagePreview({ src, onRemove }) {
  return (
    <div className="relative inline-block">
      <img src={src} alt="preview" className="h-12 w-12 rounded object-cover border" />
      <button
        type="button"
        className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1.5 py-0.5 text-xs hover:bg-red-700"
        onClick={onRemove}
        title="Remove"
      >×</button>
    </div>
  );
}