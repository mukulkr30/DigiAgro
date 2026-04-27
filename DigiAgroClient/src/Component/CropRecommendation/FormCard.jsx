import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import InfoBox from "./InfoBox";
import SubmitButton from "./SubmitButton";

export default function FormCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // ✅ important for clearing form
  } = useForm();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nitrogen: Number(data.nitrogen),
          phosphorus: Number(data.phosphorus),
          potassium: Number(data.potassium),
          temperature: Number(data.temperature),
          humidity: Number(data.humidity),
          ph: Number(data.ph),
          rainfall: Number(data.rainfall),
        }),
      });

      const res = await response.json();
      setResult(res.crop);
    } catch (error) {
      console.error(error);
      setResult("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Close + reset handler
  const handleClose = () => {
    setResult(null);  // remove result section
    reset();          // clear all input fields
  };

  return (
    <div className="bg-gray-100 rounded-2xl shadow-lg p-6 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Tell Us About Your Farm
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <InputField label="Nitrogen (N)" name="nitrogen" register={register} errors={errors} type="number" />
        <InputField label="Phosphorus (P)" name="phosphorus" register={register} errors={errors} type="number" />
        <InputField label="Potassium (K)" name="potassium" register={register} errors={errors} type="number" />
        <InputField label="Temperature (°C)" name="temperature" register={register} errors={errors} type="number" step="0.1" />
        <InputField label="Humidity (%)" name="humidity" register={register} errors={errors} type="number" step="0.1" />
        <InputField label="Soil pH" name="ph" register={register} errors={errors} type="number" step="0.1" />

        <div className="md:col-span-2">
          <InputField label="Rainfall (mm)" name="rainfall" register={register} errors={errors} type="number" step="0.1" />
        </div>

        <div className="md:col-span-2">
          <InfoBox />
        </div>

        <div className="md:col-span-2">
          <SubmitButton />
        </div>
      </form>

      {/* Loading */}
      {loading && (
        <p className="text-center mt-4 text-blue-600 font-medium">
          🔄 Predicting...
        </p>
      )}

      {/* Result Card */}
      {result && !loading && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg text-center relative">
          
          {/* ❌ Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-red-500 font-bold text-lg hover:text-red-700"
          >
            ✖
          </button>

          <h3 className="text-lg font-semibold text-green-800">
            🌱 Recommended Crop
          </h3>

          <p className="text-2xl font-bold text-green-700 mt-2">
            {result.toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
}