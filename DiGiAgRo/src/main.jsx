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
import Login from './Component/Login/Login.jsx'
import Register from './Component/Login/Register.jsx'
import Schemes from './Component/Schemes/Schemes.jsx'
import PostContent from './Component/KnowledgeHub/PostContent.jsx'
import Commodities from './Component/Commodities/Commodities.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='Login' element={<Login/>}/>
      <Route path='Register' element={<Register/>}/>
      <Route path="" element={<Home/>}/>
      <Route path="Weather" element={<Weather/>}/>
      <Route path="Cropai" element={<CropRecommendation/>}/>
      <Route path="Knowledgehub" element={<KnowledgeHub/>}/>
      <Route path="Postcontent" element={<PostContent/>}/>
      <Route path="Commodities" element={<Commodities/>}/>
      <Route path="schemes" element={<Schemes/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
