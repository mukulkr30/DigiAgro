import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./i18n"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './Component/Home/Home.jsx'
import Weather from './Component/Weather/Weather.jsx'
import CropRecommendation from './Component/CropRecommendation/CropRecommendation.jsx'
import KnowledgeHub from './Component/KnowledgeHub/KnowledgeHub.jsx'
import Calculator from './Component/Calculator/Calculator.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="" element={<Home/>}/>
      <Route path="Weather" element={<Weather/>}/>
      <Route path="Croprecommendation" element={<CropRecommendation/>}/>
      <Route path="Knowledgehub" element={<KnowledgeHub/>}/>
      <Route path="Calculator" element={<Calculator/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
