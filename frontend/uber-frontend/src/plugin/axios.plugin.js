import axios from "axios"
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000,
  });
axiosInstance.interceptors.response.use((response)=>{
    if(response.status=='401')
        window.location.href = '/user/login';
    return response?.data;
});

export default axiosInstance;
