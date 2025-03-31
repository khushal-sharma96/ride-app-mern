import { useEffect } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
const AuthWrapper = ({children})=>{
    const {user} = useUser();
    const navigate = useNavigate()
    useEffect(()=>{
        if(!(user && JSON.parse(user)?.is_login))
            navigate('/user/login');
    },[user]);
    return (<>{children}</>)
}
export default AuthWrapper;