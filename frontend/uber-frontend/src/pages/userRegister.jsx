import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const userRegister = ()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const navigate = useNavigate()
    const submitForm = async(e)=>{
        try{
            e.preventDefault();
            const response = await axios.post('http://localhost:3000/user/register',{
                email,
                password,
                fullname:{firstname,
                lastname}
            });
            if(response.status){
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
        <h2 className="text-2xl font-xl justify-self-start align-start text-yello-400">Register Page</h2>
            <div className="p-2 border-3">
                <div className="w-full">
                    <label htmlFor="firstname" className="text-lg text-white-300 block text-xl">First Name</label>
                    <input type="text" value={firstname} onChange={(e=>{
                        setFirstname(e.target.value)
                    })} id="email" className="bg-zinc-200 p-2 rounded block w-full border-3 my-3" />
                </div>
                <div className="w-full">
                    <label htmlFor="lastname" className="text-lg text-white-300 block text-xl">Last Name</label>
                    <input type="text" value={lastname} onChange={(e=>{
                        setLastname(e.target.value)
                    })} id="email" className="bg-zinc-200 p-2 rounded block w-full border-3 my-3" />
                </div>
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
export default userRegister;