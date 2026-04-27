import React from 'react'
import "./Header.css"
import FeatureButton from './FeatureButton'

const featurebutton = ["Home", "Weather", "CropRecommendation", "Calculator", "KnowledgeHub"]
function Header() {
    return (
        <div className=' bg-green-800 w-full h-20 flex items-center justify-evenly border-green-950 border-2'>
            {featurebutton.map((feature)=>{
                return <FeatureButton feature={feature}/>
            })}
        </div>
    )
}

export default Header
