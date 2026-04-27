import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './Component/Header/Header'
import Footer from './Component/Footer/Footer'
import SuperHeader from './Component/Header/SuperHeader'
function App() {

  return (
    <>
      <SuperHeader/>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
