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
import UserRideStarted from './pages/userStartRide'
import CaptainRideStarted from './pages/captain/startRide'
import RideAccepted from './pages/rideAccepted'
import UserProfile from './pages/settings/userProfile'
import UpdatePassword from './pages/settings/updatePassword'
import DeactivateAccount from './pages/settings/deactivateAccount'
import RideHistory from './pages/rideHistory'
import VerifyEmail from './pages/verifyEmail'
// import LiveComponent from './pages/liveTrack'
import LiveTest from './pages/testMap'
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
          <Route path="/user/profile" element = {<UserProfile/>} />
          <Route path="/captain/login" element = {<CaptainLogin/>} />
          <Route path="/user/register" element = {<UserRegister/>} />
          <Route path="/captain/register" element = {<CaptainRegister/>} />
          <Route path="/user/password/forgot" element = {<ForgotPassword/>} />
          <Route path="/user/ride/started" element = {<UserRideStarted/>} />
          <Route path="/captain/ride/started" element = {<CaptainRideStarted/>} />
          <Route path="/user/ride/accepted" element = {<RideAccepted/>} />
          <Route path="/setting/pasword/update" element = {<UpdatePassword/>} />
          <Route path="/setting/account" element = {<DeactivateAccount/>} />
          <Route path="/ride/history" element = {<RideHistory/>} />
          <Route path="/user/verify/:token" element = {<VerifyEmail/>} />
          <Route path="/live" element = {<LiveTest/>} />
      </Routes>
    </div>
  )
}

export default App
