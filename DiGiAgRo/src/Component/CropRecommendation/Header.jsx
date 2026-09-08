import React from "react";

export default function Header() {
  return (
    <div className="text-center text-white mb-6">
      <h1 className="text-4xl font-bold mb-2">
        AI-Powered Crop Recommendation
      </h1>
      <p className="text-lg">
        Get personalized crop suggestions based on your soil, climate, and farming conditions
      </p>

      <div className="flex gap-3 justify-center mt-4">
        <span className="bg-white text-green-700 px-3 py-1 rounded">🌱 Increase Yield</span>
        <span className="bg-white text-green-700 px-3 py-1 rounded">🌦 Climate Appropriate</span>
        <span className="bg-white text-green-700 px-3 py-1 rounded">📈 Maximize Profit</span>
      </div>
    </div>
  );
}