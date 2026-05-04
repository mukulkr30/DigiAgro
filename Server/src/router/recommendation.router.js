import { recommendation } from "../controllers/recommendation.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const recRouter = Router() 
recRouter.route("/predict").post(verifyJWT,recommendation)

export{recRouter}