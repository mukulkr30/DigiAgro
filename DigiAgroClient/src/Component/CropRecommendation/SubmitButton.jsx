import React from "react";

export default function SubmitButton() {
  return (
    <div className="text-center">
      <button
        type="submit"
        className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800"
      >
        🔍 Get Crop Recommendations
      </button>
    </div>
  );
}