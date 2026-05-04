import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from '../utils/ApiResponse.js'
import { AsyncHandler } from '../utils/AsyncHandler.js'
import mongoose from "mongoose"
import {User} from '../models/user.models.js'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"

const generateAccessAndRefreshToken = async(userId)=>{
    try{
        const user = await User.findById(userId)
        const accessToken =await user.generateAccessToken()
        const refreshToken =await user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken, refreshToken}
    }
    catch(error){
        console.log("REAL ERROR 👉", error)
        throw new ApiError(500, "something went wrong while generating refresh token")
    }
}

const registerUser = AsyncHandler(async (req, res)=>{
    

    const {username, email, phone, password} = req.body
    

    // check all required is available or not 
    if(
        [username,email,phone,password].some((field)=>
        field?.trim() === "")
    ){
        throw new ApiError(400, "All Field are required")
    }
    // check for user is already existed or not
    const existedUser = await User.findOne({
        $or: [{email},{phone}]
    })
    if(existedUser){
        throw new ApiError(409, "user is already exist")
    }
    
    const user = await User.create({username,
        email:email,
        phone:phone,
        password:password,
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "something went wrong while register")
    }
    return res.status(200).json(
        new ApiResponse(200, createdUser, "user successfully registered")
    )
})

const loginUser = AsyncHandler(async (req, res, next)=>{
    // req body->data
    // username, email
    // find user
    // password check
    // access and refreshtoken
    // send cookie 
    // send response
    
    console.log("request :: ",req.body)
    const {phone,password} = req.body;
    if(!phone){
        throw new ApiError(400, "email and username is required")
    }
    const user = await User.findOne({phone:phone})
    if(!user){
        throw new ApiError(404, "user does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(404, "invalid password")
    }
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
    console.log("accesstoken: :: ", accessToken)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly:true,
        secure:true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,
                accessToken,
                refreshToken
            },
            "user is successfully loggedin"
    )
    )
})

const logoutUser = AsyncHandler(async (req, res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )
    const options = {
        httpOnly:true,
        secure:true
    }

    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(
        new ApiResponse(200,{}, "user logged out successfully ")
    )

})

const refreshAccessToken = AsyncHandler(async (req,res)=>{
    const incomingRefreshToken =  req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken){
        throw new ApiError(401, "unauthorized request")

    }
    const decodedToken = jwt.verify(incomingRefreshToken,  process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id)
    if(!user){
        throw new ApiError(401, "invalid refresh token")
    }
    if(incomingRefreshToken !== user.refreshToken){
        throw new ApiError(401, "refreshToken is expired or used")
    }
    const options = {
        httpOnly:true,
        secure:true
    }
    const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                accessToken,
                refreshToken: newRefreshToken
            },
            "new access token generated"
    )
    )
})

const changeCurrentPassword = AsyncHandler(async (req,res)=>{
    const {oldpassword, newpassword} = req.body
    const user = await User.findById(req.user?._id)
    const ispasswordcorrect = await User.isPasswordCorrect(oldpassword)
    if(!ispasswordcorrect){
        throw new ApiError(400,"invalid password")
    }
    user.password = newpassword
    await user.save({validateBeforeSave:false})
    return res.status(200)
    .json(new ApiResponse(200 ,{},"password change successfully"))
})

const getCurrentUser = AsyncHandler(async (req,res)=>{
    return res.status(200)
    .json(200,req.user, "current user fetched successfully")
})

const updateAccountdetail = AsyncHandler(async (req, res)=>{
    const {fullname, email} = req.body
    if(!fullname || !email){
        throw new ApiError(400,"all field required")
    }
    const user =await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                fullname:fullname,
                email:email
            }
        },
        {
            new:true
        }
    ).select("-password")
    return res.status(200)
    .json(new ApiResponse(200,user,"account detail updated")) 
})


export {registerUser, loginUser, logoutUser,refreshAccessToken, changeCurrentPassword, getCurrentUser,updateAccountdetail}