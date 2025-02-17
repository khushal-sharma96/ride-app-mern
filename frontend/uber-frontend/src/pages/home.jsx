import React, { useRef, useState } from "react";
const home = () => {
    const [pickupLocation, setPickupLocation] = useState("");
    const [dropLocation, setDropLocation] = useState("");
    const recentLocation = useRef();
    const arrowElement = useRef();
    const enterLocation = (value) => {
        if(recentLocation?.current?.style){
            (recentLocation.current.style.display = value?'none':'block')
            (arrowElement.current.style.display = value?'none':'unset')
        }
    }
    return (
        <>
            <div className="h-screen relative">
                <img className="h-screen object-cover" src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif" alt="" />
                <div className="absolute w-screen bg-white bottom-0">
                    <div className="p-2 relative h-[30vh]">
                        <div className="absolute bg-black w-1 h-15 rounded-full top-[52%] left-5"></div>
                        <h3 className="text-2xl font-semibold my-2">Select the location</h3>
                        <span>
                            <i className="text-2xl font-bold absolute right-2 top-5 ri-arrow-down-wide-line hidden" ref={arrowElement} onClick={() => enterLocation(true)}></i>
                        </span>
                        <input type="text" onClick={()=>enterLocation()} placeholder="Enter pickup location" className="p-2 bg-gray-100 text-lg font-medium w-full rounded mt-5 pl-8 border-2 border-gray-400" />
                        <input type="text" placeholder="Enter drop location" className="p-2 bg-gray-100 text-lg font-medium w-full rounded mt-5 pl-8 border-2 border-gray-400" />
                    </div>
                    <div className="p-2 relative h-[70vh] hidden bg-300 p-2" ref={recentLocation}>
                        <div className="flex gap-2 mt-2 active:border-black p-2 rounded-lg border-2 border-gray-300">
                            <span className="bg-gray-200 rounded-full p-2 py-1">
                                <i className="ri-map-pin-line"></i>
                            </span>
                            <h2 className="text-lg font-medium ml-2">Tribune Chowk, Chandigarh</h2>
                        </div>
                        <div className="flex gap-2 mt-2 active:border-black p-2 rounded-lg border-2 border-gray-300">
                            <span className="bg-gray-200 rounded-full p-2 py-1">
                                <i className="ri-map-pin-line"></i>
                            </span>
                            <h2 className="text-lg font-medium ml-2">Elante Nexus, Chandigarh</h2>
                        </div>
                        <div className="flex gap-2 mt-2 active:border-black p-2 rounded-lg border-2 border-gray-300">
                            <span className="bg-gray-200 rounded-full p-2 py-1">
                                <i className="ri-map-pin-line"></i>
                            </span>
                            <h2 className="text-lg font-medium ml-2">CP Mall, Sector 67, Mohali</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default home;