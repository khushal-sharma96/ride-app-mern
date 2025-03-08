import { useEffect, useState } from "react";
const RideHistory = () => {
    const [rideData, setRideData] = useState([]);
    const getRidesHistory = async () => {
        try {
            const response = await window.$axios.get('/user/ride/history');
            console.log(response);
            if (response.status)
                setRideData(response.data);
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
    useEffect(() => {
        getRidesHistory();
    }, []);
    return (
        <div className="bg-400 min-h-screen p-3">
            <img src="/images/ride-history2.jpg" className="max-w-[60%] mx-auto mt-8" alt="" />
            <h2 className="text-2xl font-bold text-yellow-400 text-center">Ride History</h2>
            <div>
                {

                    rideData.map((ride) => {
                        return (
                            <div className="bg-[#ffd4002e] w-full p-2 rounded-xl relative my-3">
                                <div className="flex gap-4 items-center justify-between ">
                                    <div className="w-[15%] overflow-hidden max-h-[62%] border-3 border-zinc-600 rounded-full">
                                        <img src={ride?.userdata?.image?`${import.meta.env.VITE_BASE_URL}/${ride?.userdata?.image}`:"/images/user.jpg"} className="rounded-full rounded-full min-h-[45px]" alt="" />
                                    </div>
                                    <div className="text-sm font-bold text-center">
                                        <h2>{ride?.userdata?.fullname?.firstname} {ride?.userdata?.fullname?.lastname}</h2>
                                        <span className="text-zinc-700 text-xs">{ride?.createdAt}</span>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div class="grid grid-cols-3 gap-4 items-center">
                                        <div className="col-span-2">
                                            <div className="absolute bg-black w-1 h-10 rounded-full top-[12%] left-5"></div>
                                            <h2 type="text" placeholder="Enter pickup location" className="text-sm font-medium w-full rounded mt-2 pl-8">{ride?.
                                                pickupLocation}</h2>
                                            <h2 type="text" placeholder="Enter pickup location" className="text-sm font-medium w-full rounded mt-2 pl-8">{ride?.
                                                dropLocation}</h2>
                                        </div>
                                        <span className={
                                            (ride?.status=='rejected'?'text-red-400':'text-green-600')+" text-xs font-bold text-end capitalize"
                                        }>{ride?.status}</span>
                                    </div>
                                    <div className="flex justify-around mt-3 py-2 border-zinc-200">
                                        <div className="flex gap-3">
                                            <span><i className="ri-currency-line text-lg"></i></span>
                                            <h2 className="text-md font-semibold">${ride?.
                                                fare
                                            }</h2>
                                        </div>
                                        <div className="flex gap-3">
                                            <span><i className="ri-route-line text-lg"></i></span>
                                            <h2 className="text-md font-semibold">{ride?.distance?.toFixed(1)}
                                                kms</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
                {
                    !rideData?.length?
                    <h2 className="font-semibold text-lg text-center mt-5">You don't have the any ride history. </h2>
                    :""
                }
            </div>
        </div>
    );
}
export default RideHistory;