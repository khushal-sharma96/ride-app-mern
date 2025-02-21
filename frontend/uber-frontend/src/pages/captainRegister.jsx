import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios';
const userRegister = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
    const navigate = useNavigate()
    const submitForm = async (e) => {
        try {
            e.preventDefault();
            const response = await window.$axios.post('/captain/register', {
                email,
                password,
                fullname: {
                    firstname,
                    lastname
                },
                vehicleNumber,
                vehicleType
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
            <div className="h-[100vh] bg-yellow-400 mx-auto p-3 flex flex-col item-center justify-center">

                <p className="text-xl absolute text font-bold top-8 left-5">Welcome!<br /> Please register to be our captain.</p>
                <img src="/images/car.png" className="w-1/10 border-b-3 absolute top-5 right-5" alt="" />

                <div className="p-2 px-4 bg-white rounded-2xl absolute bottom-[-10px] left-0 w-full h-[75vh]">
                    <div className=" bg-whiterounded-full w-1/4 overfow-hidden absolute top-[-30px] left-[35%]">
                        <img src="/images/driver2.gif" className="w-full mx-auto rounded-full" alt="" />
                    </div>
                    <h3 className="text-yellow-500 text-xl font-bold mb-3 text-center mt-[11%] mb-5">Captain Registration</h3>
                    <div className="flex gap-2">
                        <div className="w-full">
                            <label htmlFor="firstname" className="text-md font-semibold  block">First Name</label>
                            <input type="text" value={firstname} onChange={(e => {
                                setFirstname(e.target.value)
                            })} id="email" placeholder="John" className="bg-zinc-200 p-2 rounded block w-full mb-3 font-semibold mt-1" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="lastname" className="text-md font-semibold  block">Last Name</label>
                            <input type="text" value={lastname} onChange={(e => {
                                setLastname(e.target.value)
                            })} id="email" placeholder="Sharma" className="bg-zinc-200 p-2 rounded block w-full mb-3 font-semibold mt-1" />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="email" className="text-md font-semibold  block">Email</label>
                        <input type="text" value={email} onChange={(e => {
                            setEmail(e.target.value)
                        })} id="email" placeholder="abc@yopmail.com" className="bg-zinc-200 p-2 rounded block w-full mb-3 font-semibold mt-1" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="password" className="text-md font-semibold  block">Password</label>
                        <input type="text" id="password" placeholder="12345678" value={password} onChange={(e => {
                            setPassword(e.target.value)
                        })} className="bg-zinc-200 p-2 rounded block w-full mb-3 font-semibold mt-1" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="password" className="text-md font-semibold  block">Vehicle Type</label>
                        <select type="text" id="password" placeholder="John" value={vehicleType} onChange={(e => {
                            alert(e.target.value)
                            setVehicleType(e.target.value)
                        })} className="bg-zinc-200 p-2 rounded block w-full mb-3 font-semibold mt-1">
                            <option value="2">Two Wheeler</option>
                            <option value="3">Three Wheeler</option>
                            <option value="4">Four Wheeler</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label htmlFor="password" className="text-md font-semibold  block">Vehicle Number</label>
                        <input type="text" id="password" placeholder="HR02AB1412" value={vehicleNumber} onChange={(e => {
                            setVehicleNumber(e.target.value)
                        })} className="bg-zinc-200 p-2 rounded block w-full mb-3 font-semibold mt-1" />
                    </div>
                    <div>
                        <button onClick={submitForm} className="bg-yellow-500 p-3 rounded text-white font-bold block w-full">Submit</button>
                    </div>
                    <p className="text-sm text-center my-2">Already have an account? <Link className="font-semibold text-yellow-500  hover:underline" to='/user/login'>Login</Link></p>
                    <p className="text-sm text-center my-1">Join as a normal user? <Link className="font-semibold text-yellow-500  hover:underline" to='/user/register'>User Registration</Link></p>
                </div>
            </div>
        </>
    )
}
export default userRegister;