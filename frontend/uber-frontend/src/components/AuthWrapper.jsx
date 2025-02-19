import { useEffect } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
const AuthWrapper = ({children})=>{
    const {user} = useUser();
    console.log((user));
    console.log(JSON.parse(user));
    console.log(JSON.parse(user)?.is_login);
    const navigate = useNavigate()
    useEffect(()=>{
        if(!(user && JSON.parse(user)?.is_login))
            navigate('/user/login');
    },[user]);
    if (!(user && JSON.parse(user)?.isLogin)) {
        navigate('/user/login');
      }
    return (<>{children}</>)
}
export default AuthWrapper;