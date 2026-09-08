import React from 'react'
import "./Header.css"
import { NavLink } from 'react-router-dom'

function FeatureButton({feature}) {
    const path ={
        Home: "/",
        Commodities:"/Commodities",
        Calculator: "/Calculator",
        CropRecommendation: "/Cropai",
        KnowledgeHub: "/Knowledgehub",
        Weather: "/Weather",
        Schemes: "/schemes"
    }

    return (
        <NavLink
            to={path[feature]}
            className={({isActive}) => {
                return `shrink-0 px-6 h-12 rounded-full whitespace-nowrap ${
                    isActive ? "bg-green-900 text-orange-300 shadow-inner" : "bg-green-800 text-white hover:bg-green-700"
                } text-center font-medium flex items-center justify-center transition duration-200`
            }}
        >
            {feature}
        </NavLink>
    )
}

export default FeatureButton
