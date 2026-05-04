import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './Component/Header/Header'
import Footer from './Component/Footer/Footer'
import SuperHeader from './Component/Header/SuperHeader'
import { useEffect,useState, } from 'react'
import axios from 'axios'
function App() {
  useEffect(()=>{

  },[])
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <>
      <SuperHeader token={token} setToken={setToken} />
      <Header/>
      <Outlet context={{ token, setToken }}/>
      <Footer/>
    </>
  )
}

export default App
