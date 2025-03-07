import axios from "axios"
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
  });

axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem('user')?(JSON.parse(localStorage.getItem('user'))?.token):"";
    config.headers.Authorization =  token;
    return config;
})
axiosInstance.interceptors.response.use((response)=>{
    if(response.status=='401')
        window.location.href = '/user/login';
    return response?.data;
});

export default axiosInstance;
