import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useUser } from "../context/userContext";
const userLogin = () => {
    const { updateUser } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const submitForm = async (e) => {
        try {
            e.preventDefault();
            const response = await window.$axios.post('/user/login', {
                email,
                password
            });
            if (response.status) {
                updateUser({ ...response.data.user, token: response.data.token });
                if (response.data.user.userType==2)
                    navigate('/captain');
                else navigate('/');
            }
        }
        catch (err) {
            console.log(err);
        }

    }
    return (
        <>
            <div className="bg-yellow-400 h-screen mx-auto p-3 flex flex-col item-center justify-center ">
                <h2 className="text-2xl font-xl absolute text font-bold top-20 left-5">Welcome!<br/> Its your ride partner.</h2>
                <img src="/images/car.png" className="w-1/10 border-b-3 absolute top-5 left-5" alt="" />
                <img src="/images/ride.gif" className="w-[60%] absolute rounded-l-full right-0 top-[23%]" alt="" />

                <div className="p-2 px-4 bg-white rounded-2xl absolute bottom-[-10px] left-0 w-full h-[50vh]">
                    <h3 className="text-yellow-500 text-3xl font-bold mb-3 text-center">Login</h3>
                    <div className="w-full">
                        <label htmlFor="email" className="text-md font-semibold  block">Email</label>
                        <input type="text" value={email} onChange={(e => {
                            setEmail(e.target.value)
                        })} id="email" className="bg-zinc-200 p-2 rounded block w-full mb-3 font-semibold mt-1" placeholder="abc@xyz.com" />
                    </div>
                    <div className="w-full">
                        <label htmlFor="password" className="text-md font-semibold  block">Password</label>
                        <input type="text" id="password" value={password} onChange={(e => {
                            setPassword(e.target.value)
                        })} placeholder="1234567" className="bg-zinc-200 p-2 rounded block w-full mb-0 font-semibold mt-1" />
                        <div className="text-end mb-4">
                        <Link to='/user/password/forgot' className="text-xs font-semibold text-right hover:text-yellow-500">Forgot password?</Link>
                        </div>
                    </div>
                    <div>
                        <button onClick={submitForm} className="bg-yellow-500 p-3 py-2 font-semibold rounded text-lg text-white block w-full">Submit</button>
                    </div>
                    <p className="text-sm text-center my-2">Don't have account? <Link className="font-semibold text-yellow-500  hover:underline" to='/user/register'>Register</Link></p>
                </div>
            </div>
        </>
    )
}
export default userLogin;