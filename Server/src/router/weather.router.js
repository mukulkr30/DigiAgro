import { Router } from "express";
import { getWeather } from "../controllers/Weather.controller.js";

const weatherRouter = Router()

weatherRouter.route("/getweather").get(getWeather)

export {weatherRouter}