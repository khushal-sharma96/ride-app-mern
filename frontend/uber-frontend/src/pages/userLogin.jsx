import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
const userLogin = ()=>{
    const {updateUser} = useUser();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate()
    const submitForm = async(e)=>{
        try{
            e.preventDefault();
            const response = await window.$axios.post('/user/login',{
                email,
                password
            });
            if(response.status){
                updateUser({...response.data.user,token:response.data.token});
                navigate('/');
            }
        }
        catch(err){
            console.log(err);
        }
        
    }
    return (
        <>
        <div className="bg-white h-screen mx-auto border-2 p-3 flex flex-col item-center justify-center ">
        <h2 className="text-2xl font-xl justify-self-start align-start text-yello-400">Login Page</h2>
            <div className="p-2 border-3">
                <div className="w-full">
                    <label htmlFor="email" className="text-lg text-white-300 block text-xl">Email</label>
                    <input type="text" value={email} onChange={(e=>{
                        setEmail(e.target.value)
                    })} id="email" className="bg-zinc-200 p-2 rounded block w-full border-3 my-3" />
                </div>
                <div className="w-full">
                    <label htmlFor="password" className="text-lg text-white-300 block text-xl">Password</label>
                    <input type="text" id="password"  value={password} onChange={(e=>{
                        setPassword(e.target.value)
                    })} className="bg-zinc-200 p-2 rounded block w-full border-3 my-3"/>
                </div>
                <div>
                    <button onClick={submitForm} className="bg-yellow-500 p-3 rounded text-white font-xxl block w-full">Submit</button>
                </div>
            </div>
        </div>
        </>
    )
}
export default userLogin;