import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getWeather = AsyncHandler(async (req, res)=>{
    const {city} = req.query;
    const apikey = process.env.WEATHER_API_KEY
    
    const current = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apikey}`)
    const forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},IN&appid=${apikey}`)
    
    if(!current.ok){
        throw new ApiError(500, "current data fetch failed")
    }
    if(!forecast.ok){
        throw new ApiError(500, "forecast data fetch failed")
    }
    const currentData = await current.json()
    const forecastData = await forecast.json()
    return res.status(200)
    .json(
        new ApiResponse(200,{currentData,forecastData},"weather fetched successfully")
    )
})

export {getWeather}