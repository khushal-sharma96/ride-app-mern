import { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
const VerifyEmail = ()=>{
    const {token} = useParams();
    const navigate = useNavigate();
    const verifyEmail = async ()=>{
        try{
            const response = await window.$axios.get(`/user/verify/${token}`);
            if(response.status){
                window.$toast({status:'success', title:"Email Verified", text:"You can now login."});
                navigate('/user/login');
            }
            else window.$toast({status:'error', title:response?.message??"Something went wrong!",});
        }
        catch(err){
            window.$toast({status:'error', title:"Something went wrong!",});
            console.log(err);
        }
    }
    useEffect(()=>{
        if(!token) {navigate('/login'); return;}
        verifyEmail();
    },[]);
    return (
        <div className='h-[100vh] w-full bg-yellow-400 flex justify-center items-center'>
            <img src="/images/car.png" alt="" className='w-1/3 mx-auto' />
        </div>
    );
}
export default VerifyEmail;