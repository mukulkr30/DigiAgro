import React from 'react'
import "./Header.css"
import { NavLink } from 'react-router-dom'
function FeatureButton({feature}) {
    const path ={
        Home: "/",
        Calculator: "/Calculator",
        CropRecommendation: "/Cropai",
        KnowledgeHub: "/Knowledgehub",
        Weather: "/Weather",
        Schemes:"/schemes"
    }
    return (
        <NavLink
        to = {path[feature]}
         className={({isActive})=>{
            return `min-w-44  h-12 p-2.5 rounded-full ${isActive ? "bg-green-900 text-orange-300":"bg-green-800 text-white hover:bg-green-700" }  text-center text-2 flex items-center justify-center`
         }}>{feature}</NavLink>
    )
}

export default FeatureButton
