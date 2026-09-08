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
    reset,
  } = useForm();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setResult(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        import.meta.env.VITE_RECOMMENDATION_API_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            Nitrogen: Number(data.nitrogen),
            Phosphorus: Number(data.phosphorus),
            Potassium: Number(data.potassium),
            Temperature: Number(data.temperature),
            Humidity: Number(data.humidity),
            Ph: Number(data.ph),
            Rainfall: Number(data.rainfall),
          }),
        }
      );

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.detail || "The server error");
      }

      setResult(res.recommendations);
    } catch (error) {
      console.error(error);

      setResult({
        error: error.message || "Error connecting to server",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setResult(null);
    reset();
  };

  return (
    <div className="max-w-5xl mx-auto bg-green-200 p-6 rounded-2xl shadow-lg">

      <h2 className="text-2xl font-semibold text-center mb-6">
        Get Crop Recommendation
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        <InputField
          label="Nitrogen (N)"
          name="nitrogen"
          register={register}
          errors={errors}
          type="number"
        />

        <InputField
          label="Phosphorus (P)"
          name="phosphorus"
          register={register}
          errors={errors}
          type="number"
        />

        <InputField
          label="Potassium (K)"
          name="potassium"
          register={register}
          errors={errors}
          type="number"
        />

        <InputField
          label="Temperature (°C)"
          name="temperature"
          register={register}
          errors={errors}
          type="number"
          step="0.1"
        />

        <InputField
          label="Humidity (%)"
          name="humidity"
          register={register}
          errors={errors}
          type="number"
          step="0.1"
        />

        <InputField
          label="Soil pH"
          name="ph"
          register={register}
          errors={errors}
          type="number"
          step="0.1"
        />

        <div className="md:col-span-2">
          <InputField
            label="Rainfall (mm)"
            name="rainfall"
            register={register}
            errors={errors}
            type="number"
            step="0.1"
          />
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

      {/* Result */}
      {result && !loading && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg relative">

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-red-500 font-bold text-lg hover:text-red-700"
          >
            ✖
          </button>

          {/* Error */}
          {result.error ? (
            <p className="text-center text-red-600 font-medium">
              {result.error}
            </p>
          ) : (
            <>
              {/* ========================= */}
              {/* TOP 3 RECOMMENDATIONS */}
              {/* ========================= */}

              <h3 className="text-lg font-semibold text-green-800 text-center">
                🌱 Recommended Crops
              </h3>

              <div className="mt-4 space-y-3">

                {result.map((recommendation) => (
                  <div
                    key={recommendation.rank}
                    className="bg-white p-4 rounded-lg border border-green-200"
                  >

                    <div className="flex justify-between items-center">

                      <div>
                        <span className="text-gray-500 font-medium">
                          #{recommendation.rank}
                        </span>

                        <span className="ml-3 text-xl font-bold text-green-700">
                          {recommendation.crop.toUpperCase()}
                        </span>
                      </div>

                      <span className="text-lg font-bold text-green-600">
                        {recommendation.probability.toFixed(2)}%
                      </span>

                    </div>

                    {/* Probability bar */}
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${Math.min(
                            recommendation.probability,
                            100
                          )}%`,
                        }}
                      />
                    </div>

                  </div>
                ))}

              </div>

              {/* ========================= */}
              {/* SHAP EXPLANATION */}
              {/* ========================= */}

              {result[0]?.shap?.length > 0 && (
                <div className="mt-6">

                  <h3 className="text-lg font-semibold text-green-800">
                    🔍 Why was{" "}
                    {result[0].crop.toUpperCase()} recommended?
                  </h3>

                  <p className="text-sm text-gray-600 mt-2">
                    The values below show how each feature influenced
                    the model's prediction for{" "}
                    <strong>
                      {result[0].crop.toUpperCase()}
                    </strong>.
                  </p>

                  <div className="mt-4 space-y-3">

                    {result[0].shap
                      .slice()
                      .sort(
                        (a, b) =>
                          Math.abs(b.shap_value) -
                          Math.abs(a.shap_value)
                      )
                      .map((item, index) => {

                        const isPositive =
                          item.shap_value > 0.001;

                        const isNegative =
                          item.shap_value < -0.001;

                        return (
                          <div
                            key={`${item.feature}-${index}`}
                            className="bg-white rounded-lg p-4 border border-gray-200"
                          >

                            <div className="flex justify-between items-center">

                              {/* Feature information */}
                              <div>

                                <p className="font-semibold text-gray-800">
                                  {item.feature}
                                </p>

                                <p className="text-gray-500 text-sm">
                                  Value: {item.value}
                                </p>

                              </div>

                              {/* SHAP information */}
                              <div className="text-right">

                                <p
                                  className={`font-semibold ${
                                    isPositive
                                      ? "text-green-600"
                                      : isNegative
                                      ? "text-red-600"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {item.shap_value > 0
                                    ? "+"
                                    : ""}
                                  {item.shap_value.toFixed(4)}
                                </p>

                                <p
                                  className={`text-xs font-medium ${
                                    isPositive
                                      ? "text-green-600"
                                      : isNegative
                                      ? "text-red-600"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {isPositive
                                    ? "↑ Supports prediction"
                                    : isNegative
                                    ? "↓ Opposes prediction"
                                    : "→ Little influence"}
                                </p>

                              </div>

                            </div>

                            {/* Explanation */}
                            <p className="text-sm text-gray-600 mt-3">
                              {item.explanation ||
                                (isPositive
                                  ? `${item.feature} positively influenced the model's prediction toward ${result[0].crop}.`
                                  : isNegative
                                  ? `${item.feature} negatively influenced the model's prediction for ${result[0].crop}.`
                                  : `${item.feature} had little influence on the model's prediction.`)}
                            </p>

                          </div>
                        );
                      })}

                  </div>

                  {/* ========================= */}
                  {/* INTERPRETATION GUIDE */}
                  {/* ========================= */}

                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">

                    <p className="text-sm font-semibold text-gray-700">
                      How to interpret SHAP:
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      🟢 Positive values indicate that the feature
                      pushed the model toward this crop.
                    </p>

                    <p className="text-sm text-gray-600">
                      🔴 Negative values indicate that the feature
                      pushed the model away from this crop.
                    </p>

                    <p className="text-sm text-gray-600">
                      The larger the absolute SHAP value, the stronger
                      its influence on this prediction.
                    </p>

                  </div>

                </div>
              )}

            </>
          )}

        </div>
      )}
    </div>
  );
}