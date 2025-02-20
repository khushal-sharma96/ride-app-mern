import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
const userRegister = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const navigate = useNavigate()
    const submitForm = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:3000/user/register', {
                email,
                password,
                fullname: {
                    firstname,
                    lastname
                }
            });
            if (response.status) {
                navigate('/');
            }
        }
        catch (err) {
            console.log(err);
        }

    }
    return (
        <>
            <div className="bg-yellow-400 h-screen mx-auto p-3 flex flex-col item-center justify-center ">
                <h2 className="text-xl font-xl absolute text font-semibold top-20 left-5">Welcome!<br /> Please register to be our member.</h2>
                <img src="/images/car.png" className="w-1/10 border-b-3 absolute top-5 left-5" alt="" />

                <div className="p-2 px-4 bg-white rounded-2xl absolute bottom-[-10px] left-0 w-full h-[75vh]">
                    <div className="rounded-full w-1/4 overfow-hidden absolute top-[-30px] left-[35%]">
                        <img src="/images/customer.gif" className="w-full mx-auto rounded-full" alt="" />
                    </div>
                    <h3 className="text-yellow-500 text-2xl font-semibold mb-3 text-center mt-[20%]">User Registration</h3>
                    <div className="flex gap-2">
                        <div className="w-full">
                            <label htmlFor="firstname" className="text-md font-semibold  block">First Name</label>
                            <input type="text" value={firstname} onChange={(e => {
                                setFirstname(e.target.value)
                            })} id="email" placeholder="Khushal" className="bg-zinc-200 p-2 rounded block w-full mb-3 font-semibold mt-1" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="lastname" className="text-md font-semibold  block">Last Name</label>
                            <input type="text" placeholder="Sharma" value={lastname} onChange={(e => {
                                setLastname(e.target.value)
                            })}  id="email"  className="bg-zinc-200 p-2 rounded block w-full mb-3 font-semibold mt-1" />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="text-md font-semibold  block">Email</label>
                        <input type="text" value={email} onChange={(e => {
                            setEmail(e.target.value)
                        })} id="email" placeholder="abc@xyz.com" className="bg-zinc-200 p-2 rounded block w-full mb-3 font-semibold mt-1" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="password" className="text-md font-semibold  block">Password</label>
                        <input type="text" id="password" value={password} onChange={(e => {
                            setPassword(e.target.value)
                        })} placeholder="12345678" className="bg-zinc-200 p-2 rounded block w-full mb-3 font-semibold mt-1" />
                    </div>
                    <div>
                        <button onClick={submitForm} className="bg-yellow-500 p-3 rounded text-white font-xxl block w-full">Submit</button>
                    </div>
                    <p className="text-xs text-center my-2">Already have an account? <Link className="font-semibold text-yellow-500  hover:underline" to='/user/login'>Login</Link></p>
                    <p className="text-xs text-center my-2">Join as a captain? <Link className="font-semibold text-yellow-500  hover:underline" to='/captain/register'>Captain Registration</Link></p>
                </div>
            </div>
        </>
    )
}
export default userRegister;