// components/ReaderCard.jsx
import React from "react";

export default function ReaderCard({ thumbnail, title, description, link }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600 text-sm mb-3">{description}</p>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 inline-block"
      >
        📖 Read More
      </a>
    </div>
  );
}