
import React, { useState } from "react";
import { locations } from "../../utils/location";

export default function WeatherPage() {
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [forecast, setForecast] = useState(null);

    const fetchWeather = async () => {
        if (!city) return;

        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                import.meta.env.VITE_WEATHER_API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        city: city,
                        state: state,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.detail || "Failed to fetch weather"
                );
            }

            /*
             * FastAPI response:
             *
             * {
             *   city,
             *   state,
             *   current: {
             *      temperature,
             *      humidity,
             *      pressure,
             *      wind_speed,
             *      description,
             *      weather
             *   },
             *   forecast: [
             *      {
             *          datetime,
             *          temperature,
             *          humidity,
             *          rain_probability,
             *          description
             *      }
             *   ]
             * }
             *
             * Convert it into the structure
             * expected by the existing UI.
             */

            const formattedWeather = {
                currentData: {
                    main: {
                        temp: data.current.temperature,
                        humidity: data.current.humidity,
                    },

                    wind: {
                        speed: data.current.wind_speed,
                    },

                    clouds: {
                        all: 0,
                    },

                    rain: {},

                    weather: [
                        {
                            main: data.current.weather,
                        },
                    ],
                },

                forecastData: {
                    list: data.forecast.map((item) => ({
                        dt_txt: item.datetime,

                        main: {
                            temp: item.temperature,
                            humidity: item.humidity,
                        },

                        wind: {
                            speed: 0,
                        },

                        clouds: {
                            all: 0,
                        },

                        rain: {},

                        weather: [
                            {
                                description: item.description,
                            },
                        ],
                    })),
                },
            };

            setWeather(formattedWeather);

            /*
             * Your old UI displays one forecast item
             * every 8 entries because OpenWeather gives
             * 3-hour intervals.
             *
             * Keep the same behavior.
             */
            const selectedForecast =
                formattedWeather.forecastData.list.filter(
                    (_, i) => i % 8 === 0
                );

            setForecast(selectedForecast);

        } catch (err) {
            console.error("Weather error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="max-w-5xl mx-auto bg-green-200 p-6 rounded-2xl shadow-lg">

                <h1 className="text-3xl font-bold text-center mb-6">
                    🌤 Weather Forecast
                </h1>

                {/* Dropdowns */}
                <div className="flex gap-4 mb-6">

                    <select
                        className="p-2 border rounded w-full"
                        value={state}
                        onChange={(e) => {
                            setState(e.target.value);
                            setCity("");
                            setWeather(null);
                            setForecast(null);
                        }}
                    >
                        <option value="">
                            Select State
                        </option>

                        {Object.keys(locations).map((s) => (
                            <option key={s}>
                                {s}
                            </option>
                        ))}
                    </select>

                    <select
                        className="p-2 border rounded w-full"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                            setWeather(null);
                            setForecast(null);
                        }}
                        disabled={!state}
                    >
                        <option value="">
                            Select City
                        </option>

                        {state &&
                            locations[state].map((c) => (
                                <option key={c}>
                                    {c}
                                </option>
                            ))}
                    </select>

                    <button
                        onClick={fetchWeather}
                        className="bg-green-900 text-white px-4 rounded hover:bg-green-500"
                    >
                        Get Weather
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <p className="text-center">
                        Loading...
                    </p>
                )}

                {/* Current Weather */}
                {weather && (
                    <div className="bg-blue-100 p-4 rounded-lg mb-6">

                        <h2 className="text-xl font-semibold mb-2">
                            Current Weather
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                            <p>
                                🌡 Temp:{" "}
                                {weather.currentData.main.temp}°C
                            </p>

                            <p>
                                💧 Humidity:{" "}
                                {weather.currentData.main.humidity}%
                            </p>

                            <p>
                                🌬 Wind:{" "}
                                {weather.currentData.wind.speed} m/s
                            </p>

                            <p>
                                ☁ Clouds:{" "}
                                {weather.currentData.clouds.all}%
                            </p>

                            <p>
                                🌧 Rain:{" "}
                                {weather.currentData.rain?.["1h"] || 0} mm
                            </p>

                            <p>
                                Condition:{" "}
                                {weather.currentData.weather[0].main}
                            </p>

                        </div>
                    </div>
                )}

                {/* 5 Day Forecast */}
                {forecast && (
                    <div className="mt-8">

                        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
                            📅 5-Day Weather Forecast
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">

                            {forecast.slice(0, 5).map((day, index) => {

                                const date = new Date(day.dt_txt);

                                const dayName =
                                    date.toLocaleDateString(
                                        "en-US",
                                        {
                                            weekday: "short",
                                        }
                                    );

                                return (
                                    <div
                                        key={index}
                                        className="bg-linear-to-br from-blue-100 to-blue-200
                                        rounded-2xl p-4 shadow-md
                                        hover:shadow-xl hover:scale-105
                                        transition duration-300 ease-in-out"
                                    >

                                        {/* Day + Date */}
                                        <div className="text-center mb-3">

                                            <p className="font-semibold text-lg text-gray-800">
                                                {dayName}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {date.toLocaleDateString()}
                                            </p>

                                        </div>

                                        {/* Temperature */}
                                        <p className="text-2xl font-bold text-center text-blue-700 mb-3">
                                            {day.main.temp}°C
                                        </p>

                                        {/* Details */}
                                        <div className="space-y-1 text-sm text-gray-700">

                                            <p>
                                                💧 Humidity:{" "}
                                                {day.main.humidity}%
                                            </p>

                                            <p>
                                                🌬 Wind:{" "}
                                                {day.wind.speed} m/s
                                            </p>

                                            <p>
                                                ☁ Clouds:{" "}
                                                {day.clouds.all}%
                                            </p>

                                            <p>
                                                🌧 Rain:{" "}
                                                {day.rain?.["3h"] || 0} mm
                                            </p>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
