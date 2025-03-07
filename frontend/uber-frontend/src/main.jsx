import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'sweetalert2/src/sweetalert2.scss'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axiosInstance from './plugin/axios.plugin.jsx';
import {UserProvider} from './context/userContext.jsx'
import {SocketService} from './service/socket.service.js'
import {toast} from './services/sweetalert.service.js'
SocketService();
window.$showImage = (image)=>{
  return image?`${import.meta.env.VITE_BASE_URL}/${image}`:"/images/user.jpg"
}
window.$axios = axiosInstance;
window.$toast = toast;
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
)
