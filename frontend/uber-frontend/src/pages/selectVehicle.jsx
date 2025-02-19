import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MapComponent from "../components/MapComponent";
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
</script>
const SelectRide = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const fareSummary = location.state;
    const [vehicleType, setVehicleType] = useState(null);
    const selectVehicle = async (vehicle) => {
        showConfirmElement(true);
        setVehicleType(vehicle);
    }
    const confirmElement = useRef(null);
    const searchingElement = useRef(null);
    const showConfirmElement = (value) => {
        confirmElement.current.style.display = value ? 'unset' : 'none';
    }
    const rideData = useRef();
    const searchCaptain = async () => {
        try {
            const response = await window.$axios.post('/user/ride/create', {
                pickupLocation: fareSummary?.pickupLocation?.title,
                dropLocation: fareSummary?.dropLocation?.title,
                fare: fareSummary ? fareSummary[vehicleType]?.cost : 0,
                vehicleType: vehicleType,
            });
            console.log(response);
            if (response.status) {
                rideData.current = response.data;
                searchingElement.current.style.display = 'unset'
            }
        }
        catch (err) {
            console.log(err);
        }
        // searchingElement.current.style.display = 'unset'
    };
    const cancelRide = async () => {
        try {
            const response = await window.$axios.get(`/user/ride/cancel/${rideData?.current?._id}`);
            if (response.status)
                navigate('/');
        }
        catch (err) {
            console.log(err);
        }
        // cancel ride............
    }
    useEffect(() => {
        if (!fareSummary) navigate('/');
    });
    return (
        <>
            <div className="h-screen relative">
                <MapComponent />
                <div className="absolute w-screen bg-white bottom-0">
                    <div className="p-2 absolute bg-white w-full h-[60vh] bottom-0">
                        <h3 className="text-2xl font-semibold my-2 mb-4">Select the Vehicle</h3>
                        <div onClick={() => selectVehicle('car')} className="flex gap-2 p-2 py-4 justify-between items-center border-3 border-zinc-200 rounded-lg mt-3">
                            <span>
                                <img src="/images/car-logo.webp" className="w-20" alt="" />
                            </span>
                            <div>
                                <h2 className="font-semibold text-xl">UberGo <i className="ri-user-3-fill text-[17px] mr-1"></i>4</h2>
                                <p className="text-sm text-grey">Affortable compact rides</p>
                            </div>
                            <span className="font-bold text-xl">${fareSummary?.car?.cost}</span>
                        </div>
                        <div onClick={() => selectVehicle('bike')} className="flex gap-2 p-2 py-4 justify-between items-center border-3 border-zinc-200 rounded-lg mt-3">
                            <span>
                                <img src="/images/bike-logo.webp" className="w-20" alt="" />
                            </span>
                            <div>
                                <h2 className="font-semibold text-xl">Moto <i className="ri-user-3-fill text-[17px] mr-1">1</i></h2>
                                <p className="text-sm text-grey">Affortable compact rides</p>
                            </div>
                            <span className="font-bold text-xl">${fareSummary?.bike?.cost}</span>
                        </div>
                        <div onClick={() => selectVehicle('auto')} className="flex gap-2 p-2 py-4 justify-between items-center border-3 border-zinc-200 rounded-lg mt-3">
                            <span>
                                <img src="/images/auto-logo.jfif" className="w-20" alt="" />
                            </span>
                            <div>
                                <h2 className="font-semibold text-xl">UberAuto <i className="ri-user-3-fill text-[17px] mr-1">3</i></h2>
                                <p className="text-sm text-grey">Affortable compact rides</p>
                            </div>
                            <span className="font-bold text-xl">${fareSummary?.auto?.cost}</span>
                        </div>
                    </div>
                    <div className="p-2 absolute bg-white w-full h-[70vh] bottom-0 hidden" ref={confirmElement}>
                        <h2 className="text-2xl font-semibold my-2 mb-[5%]">Confirm your ride</h2>
                        <span><i onClick={() => showConfirmElement()} className="ri-arrow-down-wide-line absolute top-5 right-5 text-2xl font-bold"></i></span>
                        <img
                            className="w-1/2 mx-auto"
                            src={
                                vehicleType === 'car'
                                    ? "/images/car-logo.webp"
                                    : vehicleType === 'auto'
                                        ? "/images/auto-logo.jfif"
                                        : "/images/bike-logo.webp"
                            }
                        />
                        <div className="flex gap-3 p-2 mt-3 border-b-2 py-4 border-zinc-200">
                            <span><i className="ri-map-pin-user-line text-lg"></i></span>
                            <h2 className="text-xl font-semibold">{fareSummary?.pickupLocation?.title}</h2>
                        </div>
                        <div className="flex gap-3 p-2 mt-3 border-b-2 py-4 border-zinc-200">
                            <span><i className="ri-map-pin-user-fill text-lg"></i></span>
                            <h2 className="text-xl font-semibold">{fareSummary?.dropLocation?.title}</h2>
                        </div>
                        <div className="flex gap-3 p-2 mt-3 border-b-2 py-4 border-zinc-200">
                            <span><i className="ri-currency-line text-lg"></i></span>
                            <h2 className="text-xl font-semibold">${fareSummary[vehicleType]?.cost}</h2>
                        </div>
                        <button onClick={searchCaptain} className="bg-green-400 p-3 text-white text-xl font-semibold w-full rounded-lg">Confirm</button>
                    </div>
                    <div className="p-2 absolute bg-white w-full h-[67vh] bottom-0 hidden" ref={searchingElement}>
                        <img
                            className="w-1/2 mx-auto mb-10 mt-[15%]"
                            src="/images/search-log.gif"
                        />
                        <h2 className="text-lg text-zinc-500 text-center font-semibold my-2 mb-[5%] p-2">Be Patient, we are searching the captain.</h2>
                        <button onClick={cancelRide} className="border-red-400 border-3 p-3 text-red-400 text-xl font-semibold w-full rounded-lg">Cancel Ride</button>
                    </div>
                </div>
            </div>
        </>
    )
};
export default SelectRide;