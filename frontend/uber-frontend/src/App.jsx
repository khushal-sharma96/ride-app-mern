import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomeComponent from './pages/home'
import UserLogin from './pages/userLogin'
import CaptainLogin from './pages/captainLogin'
import UserRegister from './pages/userRegister'
import CaptainRegister from './pages/captainRegister'
import CaptainHome from './pages/captain/captainHome'
import SelectVehicle from './pages/selectVehicle'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element = {<HomeComponent/>} />
        <Route path="/user/login" element = {<UserLogin/>} />
        <Route path="/user/vehicle/search" element = {<SelectVehicle/>} />
        <Route path="/captain/login" element = {<CaptainLogin/>} />
        <Route path="/user/register" element = {<UserRegister/>} />
        <Route path="/captain/register" element = {<CaptainRegister/>} />
        <Route path="/captain" element = {<CaptainHome/>} />
      </Routes>
    </div>
  )
}

export default App
