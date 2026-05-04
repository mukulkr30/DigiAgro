// components/FlashCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function FlashCard({ title, desc, color, link, icon }) {
  return (
    <Link
      to={link}
      className={`p-6 rounded-xl shadow text-center transform hover:scale-105 transition ${color}`}
    >
      <h3 className="text-xl font-semibold mb-2">
        {icon} {title}
      </h3>
      <p className="text-gray-700 mb-3">{desc}</p>

      <span className="text-sm font-medium underline">
        Explore →
      </span>
    </Link>
  );
}