import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import axiosInstance from './plugin/axios.plugin.jsx';
import {UserProvider} from './context/userContext.jsx'
import {SocketService} from './service/socket.service.js'
SocketService();
window.$showImage = (image)=>{
  console.log(`${import.meta.env.VITE_BASE_URL}/${image}`);
  return image?`${import.meta.env.VITE_BASE_URL}/${image}`:"/images/user.jpg"
}
window.$axios = axiosInstance;
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
)
