import React, { useEffect, useState } from 'react';
import MapComponent from "../components/MapComponent";
import { getSocketInstance } from '../service/socket.service';
const RideAccepted = () => {
    const captainDetails = {
        name: "Captain John Doe",
        vehicle: "Toyota Camry",
        licensePlate: "XYZ 1234",
    };
    const [isStarted,setStarted] = useState(false);
    const socket = getSocketInstance();
    const rideDetails = {
        otp: "123456",
        fare: "$25.00",
        km: "15 km",
        pickupLocation: "123 Main St, City",
        dropLocation: "456 Elm St, City",
    };
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
    useEffect(()=>{
        socket.on("RIDE_STARTED",(data)=>{
            console.log("Ride started!",data);
            setStarted(true);
        })
    });
    return (
        <div className="h-screen relative">
            <MapComponent />
            <div className="absolute w-screen bg-white bottom-0">
                <div className="p-2 absolute bg-white w-full h-[60vh] bottom-[-10px] rounded-xl">
                    <div className='flex justify-between items-center'>
                        <h2 className="text-2xl font-semibold my-2 mb-[5%]">Ride {isStarted?'Started':'Accepted'}</h2>
                        <span className='px-2 border-zinc-700 border-2 rounded-lg font-bold'>876543</span>
                    </div>
                    <div className='bg-zinc-200 rounded-lg p-3 relative'>
                        <h2 className='text-lg font-semibold mb-3'>Captain</h2>
                        <div className='w-10 rounded-full absolute top-2 right-2 overflow-hidden'>
                            <img src="/images/user.jpg" className='w-10 rounded-full' alt="" />
                        </div>
                        <div>
                            <h3 className='text-md font-bold text-zinc-500'>John Thompson</h3>
                            <h2 className='text-sm font-semibold text flex justify-between'><span>2 wheeler</span> <span>HR02GB5343</span></h2>
                        </div>
                    </div>
                    <div className="flex gap-3 p-2 py-1 mt-1 border-b-2 py-2 border-zinc-200">
                        <span><i className="ri-map-pin-user-line text-lg"></i></span>
                        <h2 className="text-md font-semibold">bdfbdfbb</h2>
                    </div>
                    <div className="flex gap-3 p-2 mt-1 py-1 border-b-2 py-2 border-zinc-200">
                        <span><i className="ri-map-pin-user-fill text-lg"></i></span>
                        <h2 className="text-md font-semibold">bfdbdfbfd</h2>
                    </div>
                    <div className="flex justify-around p-2 mt-1 py-2 border-zinc-200">
                        <div  className="flex gap-3">
                            <span><i className="ri-currency-line text-lg"></i></span>
                            <h2 className="text-md font-semibold">$534</h2>
                        </div>
                        <div className="flex gap-3">
                            <span><i className="ri-route-line text-lg"></i></span>
                            <h2 className="text-md font-semibold">21
                                kms</h2>
                        </div>
                    </div>
                    <button onClick={()=>cancelRide()} className="border-red-400 border-3 p-2 text-red-400 text-lg mt-2 font-semibold w-full rounded-lg">Cancel Ride</button>
                </div>
            </div>
        </div>
    );
};

export default RideAccepted;