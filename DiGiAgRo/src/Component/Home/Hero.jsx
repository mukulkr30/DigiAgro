// components/Hero.jsx
import React from "react";

export default function Hero() {
  return (
    <section
      className="h-[80vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef')",
      }}
    >
      <div className="bg-black/50 p-8 rounded-xl text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Smart Agriculture Platform 🌱
        </h1>
        <p className="text-lg mb-6">
          AI-powered farming tools for better yield
        </p>
        <button className="bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600">
          Explore Now
        </button>
      </div>
    </section>
  );
}