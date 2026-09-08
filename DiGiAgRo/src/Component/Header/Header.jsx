import React from 'react'
import "./Header.css"
import FeatureButton from './FeatureButton'

const featurebutton = ["Home", "Weather", "CropRecommendation", "KnowledgeHub", "Commodities", "Schemes"]

function Header() {
    return (
        <div className='bg-green-800 w-full h-20 flex items-center justify-start lg:justify-evenly overflow-x-auto gap-3 px-4 border-green-950 border-b-2 scrollbar-none'>
            {featurebutton.map((feature) => {
                return <FeatureButton key={feature} feature={feature} />
            })}
        </div>
    )
}

export default Header
