// components/VideoCard.jsx
import React from "react";

export default function VideoCard({ title, description, thumbnail, link }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 inline-block"
        >
          ▶ Watch Video
        </a>
      </div>
    </div>
  );
}