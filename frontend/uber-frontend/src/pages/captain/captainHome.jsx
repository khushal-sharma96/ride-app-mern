import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapComponent from "../../components/MapComponent";
import { useUser } from '../../context/userContext'
import { getSocketInstance } from "../../service/socket.service";
const CaptainHome = () => {
    const navigate = useNavigate()
    const socket = getSocketInstance();
    const { user } = useUser();
    let userData = user ? JSON.parse(user) : {};
    const [rides, setRides] = useState([]);
    const acceptRide = async (ride, index) => {
        try {
            const response = await window.$axios.get('/captain/ride/accept/' + ride._id);
            if (response.status) {
                socket.emit("ACCEPT_RIDE", ride);
                navigate("/captain/ride/started", { state: { rideId: response?.data?._id, geojson: ride?.geojson } });
            }
            else {
                rides.splice(index, 1);
                setRides(rides);
            }
        }
        catch (err) {
            rides.splice(index, 1);
            setRides(rides);
            window.$toast({ status: 'error', title: err?.response?.data?.message ?? "Something went wrong!" });
        }
    }
    const rejectRide = async (index) => {
        try {

            const updatedData = (rides.splice(index, 1));
            setRides([...rides]);
        }
        catch (err) {
            console.log(err);
        }
    }
    const checkCurrentRide = async () => {
        try {
            const response = await window.$axios.get("/user/ride/check");
            if (response.status) {
                if (response.data)
                    navigate("/captain/ride/started", { state: { rideId: response?.data?._id } });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        let intervalValue;
        checkCurrentRide();
        try {
            socket.on("receive_ride", ({ ride, geojson }) => {
                ride.count = 30;
                ride.geojson = geojson;
                setRides((prevRides) => [...prevRides, ride]);
            });
            intervalValue = setInterval(() => {
                setRides((prevRides) => {
                    if (!prevRides.length) return [];
                    return prevRides.map((row) => { return { ...row, count: row.count - 1 }; }).filter((row) => row.count > 0);
                });
            }, 1000);

        }
        catch (err) {
            console.log(err);
        }
        return () => {
            socket.off("receive_ride");
            clearInterval(intervalValue);
        };
    }, []);
    return (
        <>
            <div className="h-screen relative">
                <MapComponent />
                <div className="absolute w-screen bg-white bottom-0">
                    <div className="p-2 absolute h-[22vh] bottom-0 bg-white w-full">
                        <div className="flex justify-between items-center px-2">
                            <h3 className="text-xl font-semibold my-2">Hi Captain !</h3>
                            <i onClick={() => navigate('/setting')} className="ri-settings-2-line absolute top-2 right-2 text-2xl p-2 bg-zinc-200 rounded-full py-1"></i>
                        </div>
                        <span>
                            <i className="text-2xl font-bold absolute right-2 top-5 ri-arrow-down-wide-line hidden"></i>
                        </span>
                        <div className="flex justify-between mt-3 px-3">
                            <div className="w-[15%] border-zinc-200 border-4 rounded-full relative overflow-hidden max-h-[15%]">
                                <img src={userData?.image ? `${import.meta.env.VITE_BASE_URL}/${userData?.image}` : "/images/user.jpg"} className=" rounded-full min-h-[45px]" alt="" />
                            </div>
                            <div>
                                <p className="text-zinc-400 text-sm font-semibold">{userData?.fullname?.firstname} {userData?.fullname?.lastname}</p>
                                <h2 className="font-semibold text-center">{userData?.vehicleNumber}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="p-2 absolute bottom-0 bg-white w-full max-h-[50vh] overflow-scroll">
                        {
                            rides.map((ride, index) => {
                                return (
                                    <div key={ride} className="bg-zinc-300 rounded-lg p-2 my-3">
                                        <div className="flex items-center justify-between">
                                            {ride?.image}
                                            <div className="w-20 rounded-full overflow-hidden border-5 border-zinc-400">
                                                <img src={ride?.userId?.image ? `${import.meta.env.VITE_BASE_URL}/${ride?.userId?.image}` : "/images/user.jpg"} className="object-cover" alt="" />
                                            </div>
                                            <div className="text-end">
                                                <h2 className="text-xs font-semibold text-zinc-700">{ride?.userId?.fullname?.firstname} {ride?.userId?.fullname?.lastname}</h2>
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
                                                <span className="font-semibold text-sm bg-white rounded-full p-1">{(ride.distance)?.toFixed(1)} kms</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between px-3">
                                            <button className="p-2 bg-red-500 text-sm font-semibold rounded-lg w-25" onClick={() => rejectRide(index)}>Reject</button>
                                            <button className="p-2 bg-yellow-400 text-sm font-semibold rounded-lg w-25" onClick={() => acceptRide(ride, index)}>Accept ({ride.count})
                                            </button>
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
