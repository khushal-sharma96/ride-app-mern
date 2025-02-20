import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomeComponent from './pages/home'
import UserLogin from './pages/userLogin'
import CaptainLogin from './pages/captainLogin'
import UserRegister from './pages/userRegister'
import CaptainRegister from './pages/captainRegister'
import CaptainHome from './pages/captain/captainHome'
import SelectVehicle from './pages/selectVehicle'
import AuthWrapper from './components/AuthWrapper'
import SettingPage from './pages/settings'
import ForgotPassword from './pages/forgotPassword'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element = {<AuthWrapper>
            <HomeComponent/>
          </AuthWrapper>
          } />
        <Route path="/user/vehicle/search" element = {
            <SelectVehicle/>
          } />
        <Route path="/captain" element = {
          <AuthWrapper>
            <CaptainHome/>
          </AuthWrapper>
          } />
        <Route path="/setting" element = {
          <AuthWrapper>
            <SettingPage/>
          </AuthWrapper>
          } />
        
          <Route path="/user/login" element = {<UserLogin/>} />
          <Route path="/captain/login" element = {<CaptainLogin/>} />
          <Route path="/user/register" element = {<UserRegister/>} />
          <Route path="/captain/register" element = {<CaptainRegister/>} />
          <Route path="/user/password/forgot" element = {<ForgotPassword/>} />
      </Routes>
    </div>
  )
}

export default App
