import React from "react";

export default function InfoBox() {
  return (
    <div className="bg-blue-100 p-4 rounded text-sm">
      <p><strong>Data Format Requirements</strong></p>
      <p>N, P, K: Integer values (e.g., 25, 50, 75)</p>
      <p>Temperature, Humidity, pH, Rainfall: Float values</p>
    </div>
  );
}