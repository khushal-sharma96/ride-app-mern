import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MapComponent from "../../components/MapComponent";
import  {useUser} from '../../context/userContext'
const CaptainHome = () => {
    const navigate = useNavigate()
    const {logout,user}  = useUser();
    const logoutUser = ()=>{
        // logout logic..........
        logout();
        navigate('/user/login');
    }
    let userData = user?JSON.parse(user):{};
    const [rides,setRides] = useState([
    //     {
    //     username:'Michael Thompson',
    //     fare:213,
    //     vehicleNumber:'HR02 AB 1817',
    //     pickupLocation:"Tribune Chowk, Chandigarh",
    //     dropLocation:"CP Mall, Sector 67, Mohali",
    //     distance:20
    // },
    //     {
    //     username:'Anne Thompson',
    //     fare:213,
    //     vehicleNumber:'HR02 AB 1817',
    //     pickupLocation:"Tribune Chowk, Chandigarh",
    //     dropLocation:"CP Mall, Sector 67, Mohali",
    //     distance:20
    // },
    //     {
    //     username:'William Thompson',
    //     fare:213,
    //     vehicleNumber:'HR02 AB 1817',
    //     pickupLocation:"Tribune Chowk, Chandigarh",
    //     dropLocation:"CP Mall, Sector 67, Mohali",
    //     distance:20
    // },
    ]);
    return (
        <>
            <div className="h-screen relative">
                <MapComponent />
                <div className="absolute w-screen bg-white bottom-0">
                    <div className="p-2 absolute h-[22vh] bottom-0 bg-white w-full">
                        <div className="flex justify-between items-center px-2">
                        <h3 className="text-xl font-semibold my-2">Hi Captain !</h3>
                        <i onClick={logoutUser} className="ri-logout-box-line text-xl font-semibold bg-zinc-300 p-2 rounded-full py-1"></i>
                        </div>
                        <span>
                            <i className="text-2xl font-bold absolute right-2 top-5 ri-arrow-down-wide-line hidden"></i>
                        </span>
                        <div className="flex justify-between mt-3 px-3">
                            <img src="/images/user.jpg" className="w-17 rounded-full border-5 border-zinc-300" alt="" />
                            <div>
                                <p className="text-zinc-400 text-sm font-semibold">{userData?.fullname?.firstname} {userData?.fullname?.lastname}</p>
                                <h2 className="font-semibold text-center">{userData?.vehicleNumber}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 absolute bottom-0 bg-white w-full max-h-[50vh] overflow-scroll">
                        {
                            rides.map((ride)=>{
                                return (
                                <div key={ride} className="bg-zinc-300 rounded-lg p-2 my-3">
                                    <div className="flex items-center justify-between">
                                        <div className="w-20 rounded-full overflow-hidden border-5 border-zinc-400">
                                            <img src="/images/user.jpg" className="object-cover" alt="" />
                                        </div>
                                        <div className="text-end">
                                        <h2 className="text-xs font-semibold text-zinc-700">{ride.username}</h2>
                                        <span className="font-semibold text-xl">${ride.fare}</span>
                                        </div>
                                    </div>
                                    <div className="relative flex items-center">
                                        <div className="w-[80%]">
                                            <h2 className="text-sm font-semibold mt-2 pl-8"><i className="ri-map-pin-line"></i>{ride.pickupLocation}</h2>
                                            <div className="w-1 bg-black border-dotted h-8 top-2 ml-9 rounded-full"></div>
                                            <h2 className="text-sm font-semibold mb-2 pl-8"><i className="ri-map-pin-fill"></i>{ride.dropLocation}</h2>
                                        </div>
                                        <div className="w-[20%] text-center">
                                            <span className="font-semibold text-sm bg-white rounded-full p-1 px-2">{ride.distance} Kms</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between px-3">
                                        <button className="p-2 bg-red-500 text-sm font-semibold rounded-lg w-20">Reject</button>
                                        <button className="p-2 bg-yellow-400 text-sm font-semibold rounded-lg w-20">Accept</button>
                                    </div>
                                </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
};
export default CaptainHome;
 