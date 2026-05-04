import { app } from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/db.js";
dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`app ir running on PORT:: : ${process.env.PORT}`)
    })
})