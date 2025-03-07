import React, { useEffect, useState } from 'react';
import MapComponent from "../components/MapComponent";
import { getSocketInstance } from '../service/socket.service';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmBox } from '../services/sweetalert.service';
const RideAccepted = () => {
    const location = useLocation();
    console.log(location.state);
    const navigate = useNavigate()
    const socket = getSocketInstance();
    const [rideDetails, setRideDetails] = useState();
    const cancelRide = async () => {
        try {
            confirmBox("Are you sure to cancel the ride?");
            // const response = await window.$axios.get(`/user/ride/cancel/${rideData?.current?._id}`);
            // if (response.status)
            //     navigate('/');
        }
        catch (err) {
            console.log(err);
        }
    }
    const getRideData = async () => {
        try {
            const response = await window.$axios.get('/user/ride/details/' + location.state?.rideId);
            if (response.status && ['started', 'accepted'].indexOf(response.data?.status) >= 0) {
                setRideDetails(response.data);
            }
            else navigate('/', { replace: true })
        }
        catch (err) {
            console.log(err);
            navigate('/', { replace: true })
        }
    }
    const completeRide = () => {
        try {
            setRideDetails((prevData) => {
                return { ...prevData, pay: true }
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    const payCash = () => {
        try {
            socket.emit("PAY_CASH", {
                rideId: rideDetails?._id
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getRideData();
        socket.on("RIDE_STARTED", () => {
            setRideDetails((prevData) => {
                return { ...prevData, status: 'started' }
            });
        })
        socket.on("RIDE_COMPLETED", () => {
            navigate("/", { replace: true });
        });
    }, []);
    return (
        <div className="h-screen relative">
            <MapComponent />
            <div className="absolute w-screen bg-white bottom-0">
                <div className="p-2 absolute bg-white w-full h-[60vh] bottom-[-10px] rounded-xl">
                    <div className='flex justify-between items-center'>
                        <h2 className="text-2xl font-semibold my-2 mb-[5%] capitalize">Ride {rideDetails?.status}</h2>
                        <span className='px-2 border-zinc-700 border-2 rounded-lg font-bold'>{rideDetails?.otp}</span>
                    </div>
                    <div className='bg-zinc-200 rounded-lg p-3 relative'>
                        <h2 className='text-lg font-semibold mb-3'>Captain</h2>
                        <div className='w-10 rounded-full overflow-hidden absolute top-2 right-2'>
                                <img src={rideDetails?.captainId?.image ? `${import.meta.env.VITE_BASE_URL}/${rideDetails?.captainId?.image}` : "/images/user.jpg"} className='w-10 rounded-full' alt="" />
                            </div>
                        <div>
                            <h3 className='text-md font-bold text-zinc-500'>{rideDetails?.captainId?.fullname?.firstname} {rideDetails?.captainId?.fullname?.lastname}</h3>
                            <h2 className='text-sm font-semibold text flex justify-between'><span>{rideDetails?.vehicleType}</span> <span>{rideDetails?.captainId?.vehicleNumber}</span></h2>
                        </div>
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
                            <h2 className="text-md font-semibold">{rideDetails?.distance?.toFixed(1)}
                                kms</h2>
                        </div>
                    </div>
                    {
                        rideDetails?.pay && (
                            <div>
                                <button onClick={() => cancelRide()} className="border-yellow-400 border-3 p-2 text-yellow-400 text-lg mt-2 font-semibold w-full rounded-lg">Pay Online</button>
                                <button onClick={() => payCash()} className="bg-green-400 p-2 text-white text-lg my-2 font-semibold w-full rounded-lg">Pay Cash</button>
                            </div>
                        )
                    }
                    {
                        (rideDetails?.status == 'started' && !rideDetails?.pay) && (
                            <button onClick={() => completeRide()} className="bg-yellow-400 p-2 text-white text-lg my-2 font-semibold w-full rounded-lg">Complete Ride</button>
                        )
                    }
                    {
                        (rideDetails?.status != 'completed' && !rideDetails?.pay) && (
                            <button onClick={() => cancelRide()} className="border-red-400 border-3 p-2 text-red-400 text-lg mt-2 font-semibold w-full rounded-lg">Cancel Ride</button>
                        )
                    }


                </div>
            </div>
        </div>
    );
};

export default RideAccepted;