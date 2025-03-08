import React, { useEffect, useRef, useState } from 'react';
import MapComponent from "../../components/MapComponent";
import { useNavigate, useLocation } from "react-router-dom";
import { confirmBox } from '../../services/sweetalert.service';
import { getSocketInstance } from '../../service/socket.service';
const RideAccepted = () => {
    const socket = getSocketInstance();
    const locationInstance = useLocation();
    const navigate = useNavigate();
    const [rideDetails, setRideDetails] = useState();
    let rideId;
    const [otp, setOtp] = useState();
    const cancelRide = async () => {
        try {
            confirm("Are you sure to cancel the ride?");
            // const response = await window.$axios.get(`/user/ride/cancel/${rideData?.current?._id}`);
            // if (response.status)
            //     navigate('/');
        }
        catch (err) {
            console.log(err);
        }
    }
    const verifyOtp = async () => {
        try {
            if (!otp) { 
                window.$toast({
                    type:'error',
                    title:"enter the otp to start the ride"
                });
                return; 
            }
            const response = await window.$axios.post("/captain/otp/verify", {
                otp,
                ride_id: rideDetails?._id
            });
            if (response.status) {
                setRideDetails((prevData) => {
                    return {
                        ...prevData,
                        status: response.data?.status
                    }
                });
                socket.emit('RIDE_STARTED', rideDetails)
            }
            else window.$toast({
                type:'error',
                title:response.message
            });
        }
        catch (err) {
            console.log(err);
            window.$toast({
                type:'error',
                title:"Something went wrong!"
            });
        }
    }
    const getRideData = async () => {
        try {
            const response = await window.$axios.get('/captain/ride/details/' + locationInstance.state?.rideId);
            if (response.status && ['started','accepted'].indexOf(response.data?.status)>=0)
                setRideDetails(response.data);
            else {window.$toast({
                type:'error',
                title:response.message
            });
            navigate('/captain', { replace: true });
            return;
        }
            rideId = response?.data?._id
        }
        catch (err) {
            console.log(err);
            window.$toast({
                type:'error',
                title:"Something went wrong!"
            });
            navigate('/captain', { replace: true });
        }
    }
    const completeRide = async () => {
        try {
            confirmBox("Ride Completed","Have you get the fare?","Yes I have","No I haven't").then(async({isConfirmed})=>{
                if(isConfirmed){
                    const response = await window.$axios.get('captain/ride/complete/' + rideId);
                    if (response.status) {
                        setRideDetails((prevData) => {
                            return { ...prevData, status: 'completed' }
                        });
                        socket.emit("RIDE_COMPLETED",rideId);
                        navigate("/captain",{replace:true});
                    }
                }
            });
        }
        catch (err) {
            console.log(err);
            window.$toast({
                type:'error',
                title:"Something went wrong!"
            });
        }
    }
    useEffect(() => {
        if (!locationInstance.state?.rideId)
            navigate('/captain', { replace: true });
        getRideData();
        socket.on("PAY_CASH", () => {
            completeRide();
        });
    }, []);
    return (
        <div className="h-screen relative">
            <MapComponent />
            <div className="absolute w-screen bg-white bottom-0">
                <div className="p-2 absolute bg-white w-full h-[60vh] bottom-[-10px] rounded-xl">
                    <h2 className="text-2xl font-semibold my-2 mb-[5%] capitalize">Ride {rideDetails?.status}</h2>
                    <div className='bg-zinc-200 rounded-lg p-3 flex items-center justify-between'>
                        <div className='flex gap-3 items-center'>
                            <div className='w-10 rounded-full overflow-hidden'>
                                <img src={rideDetails?.userId?.image ? `${import.meta.env.VITE_BASE_URL}/${rideDetails?.userId?.image}` : "/images/user.jpg"} className='w-10 rounded-full' alt="" />
                            </div>
                            <div>
                                <h3 className='text-md font-bold text-zinc-500'>{rideDetails?.userId?.fullname?.firstname} {rideDetails?.userId?.fullname?.lastname}</h3>
                                <h2 className='text-sm font-semibold text flex justify-between'>{rideDetails?.userId?.email}</h2>
                            </div>
                        </div>
                        <span className="text-2xl text-zinc-800"><i className="ri-chat-3-fill"></i></span>
                    </div>
                    <div className="flex gap-3 p-2 py-1 mt-1 border-b-2 py-2 border-zinc-200">
                        <span><i className="ri-map-pin-user-line text-lg"></i></span>
                        <h2 className="text-md font-semibold">{rideDetails?.pickupLocation}</h2>
                    </div>
                    <div className="flex gap-3 p-2 mt-1 py-1 border-b-2 py-2 border-zinc-200">
                        <span><i className="ri-map-pin-user-fill text-lg"></i></span>
                        <h2 className="text-md font-semibold">{rideDetails?.dropLocation}</h2>
                    </div>
                    <div className="flex justify-around p-2 mt-1 py-2 border-zinc-200">
                        <div className="flex gap-3">
                            <span><i className="ri-currency-line text-lg"></i></span>
                            <h2 className="text-md font-semibold">${rideDetails?.fare}</h2>
                        </div>
                        <div className="flex gap-3">
                            <span><i className="ri-route-line text-lg"></i></span>
                            <h2 className="text-md font-semibold">{rideDetails?.distance}
                                kms</h2>
                        </div>
                    </div>
                    {
                        rideDetails?.status == 'accepted' && (
                            <div className='px-1 flex items-center justify-between mb-2'>
                                <input onChange={(e) => setOtp(e.target.value)} type="text" placeholder='Enter the OTP' className='p-2 border-2 border-zinc-400 rounded-lg  font-semibold' />
                                <button onClick={() => verifyOtp()} className="bg-yellow-400 text-white py-1 text-lg w-1/3 font-semibold rounded-lg">Verify</button>
                            </div>
                        )
                    }
                    <button onClick={() => cancelRide()} className="border-red-400 border-3 p-1 text-red-400 text-lg mt-2 font-semibold w-full rounded-lg">Cancel Ride</button>
                </div>
            </div>
        </div>
    );
};

export default RideAccepted;