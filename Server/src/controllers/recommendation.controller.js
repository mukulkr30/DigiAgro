import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const recommendation = AsyncHandler(async (req,res)=>{
    const {
        nitrogen,
        phosphorus,
        potassium,
        temperature,
        humidity,
        ph,
        rainfall
    } = req.body;

    const field = {
        nitrogen,
        phosphorus,
        potassium,
        temperature,
        humidity,
        ph,
        rainfall
    } 

    for(const [key,value] of Object.entries(field)){
        if(value === undefined || value === null || isNaN(value)){
            throw new ApiError(400,`${key} is required`)
        }
        

    }
    let response;

    try{
        response = await fetch(`${process.env.RECOMMENDATION_API_URL}/predict`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(field)
        })
    }
    catch (error) {
        if (error.name === "AbortError") {
            throw new ApiError(504, "ML service timeout");
        }
        throw new ApiError(500, "Unable to connect to ML service");
    }

    if(!response.ok){
        throw new ApiError(500,"ML api error")
    }
    const result =await response.json()
    return res.status(200)
    .json(
        new ApiResponse(200,result,"Crop predicted")
    )
})

export {recommendation}