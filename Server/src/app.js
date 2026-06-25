import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { router } from './router/user.router.js'
import { recRouter } from './router/recommendation.router.js'
import { weatherRouter } from './router/weather.router.js'
const app = express()

app.use(cors(
    {
        origin:[process.env.CORS_ORIGIN,
            "http://localhost:5173"
        ],
        credentials:true
    }
))

app.use(cookieParser())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: err.errors || []
    });
});
app.use("/api/v1/users", router)
app.use("/api/v1/recommendation", recRouter)
app.use("/api/v1/weather",weatherRouter)


export {app}