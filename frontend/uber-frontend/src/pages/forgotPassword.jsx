import { useNavigate  } from "react-router-dom";
const ForgetPassword = () => {
    const navigate = useNavigate ();
    return (
        <div className="bg-yellow-400 h-screen relative p-3">
            <img src="/images/car.png" className="w-1/10 border-b-3 block" alt="" />
            <i onClick={()=>navigate(-1)} className="ri-arrow-left-line font-bold text-xl rounded-full absolute top-2 right-3 bg-white px-1"></i>
            <h2 className="text-2xl font-bold mt-6 mb-2">Forgot Password?</h2>
            <h2 className="text-2xl font-bold ml-15">Don't worry....</h2>
            <img className="w-[70%] block mx-auto my-10" src="/images/pass-forget.webp" alt="" />
            <div className="py-5 px-4 bg-white rounded-2xl absolute bottom-[-10px] left-0 w-full h-[45vh]">
                <div className="w-full">
                    <label htmlFor="email" className="text-md font-semibold  block">Email</label>
                    <input type="text" id="email" placeholder="abc@xyz.com" className="bg-zinc-200 p-2 rounded block w-full mb-3 font-semibold mt-1" />
                </div>
                <div>
                    <button className="bg-yellow-500 p-3 rounded text-white font-semibold block w-full">Send OTP</button>
                </div>
            </div>
        </div>
    );
}
export default ForgetPassword;