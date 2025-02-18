import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";
const home = () => {
    const [pickupLocation, setPickupLocation] = useState("");
    const [dropLocation, setDropLocation] = useState("");
    let locationType = useRef("");
    const isBothEntered = useMemo(() => ((pickupLocation && pickupLocation.length > 2) && (dropLocation && dropLocation.length > 2)), [pickupLocation, dropLocation]);
    const navigate = useNavigate()
    const recentLocation = useRef();
    const arrowElement = useRef();
    const searchLocationRef = useRef();
    const [suggestions, setSuggestions] = useState([
        'Tribune Chowk, Chandigarh',
        'Elante Nexus, Chandigarh',
        'CP Mall, Sector 67, Mohali'
    ]);
    const showFullPage = (value, type) => {
        try {
            if (recentLocation?.current?.style) {
                recentLocation.current.style.display = value ? 'none' : 'block';
                arrowElement.current.style.display = value ? 'none' : 'unset';
            }
            if(type)
                locationType.current = type;
        }
        catch (err) { console.log(err) }
    }
    const searchRide = () => {
        // Hit axios to fetch the distance between.......
        searchLocationRef.current.style.display = 'none';
        navigate('/user/vehicle/search');
    }
    const searchSuggestions = (value, is_pickup) => {
        console.log(value,is_pickup);
        if (is_pickup)
            setPickupLocation(value)
        else
            setDropLocation(value)
        // axios.............value
    }
    const selectLocation = (value) => {
        if (locationType?.current) {
            if (locationType.current == 'pickup')
                setPickupLocation(value)
            else if (locationType.current == 'drop')
                setDropLocation(value)
        }
    }
    return (
        <>
            <div className="h-screen relative">
                <MapComponent />
                <div className="absolute w-screen bg-white bottom-0" ref={searchLocationRef}>
                    <div className="p-2 relative h-[30vh]">
                        <div className="absolute bg-black w-1 h-15 rounded-full top-[52%] left-5"></div>
                        <h3 className="text-2xl font-semibold my-2">Select the location</h3>
                        <span>
                            <i className="text-2xl font-bold absolute right-2 top-5 ri-arrow-down-wide-line hidden" ref={arrowElement} onClick={() => showFullPage(true)}></i>
                        </span>
                        <input type="text" onClick={() => { showFullPage(false, 'pickup') }} value={pickupLocation} onChange={(e) => searchSuggestions(e.target.value, true)} placeholder="Enter pickup location" className="p-2 bg-gray-100 text-lg font-medium w-full rounded mt-5 pl-8 border-2 border-gray-400" />
                        <input type="text" onClick={() => showFullPage(false, 'drop')} value={dropLocation} onChange={(e) => searchSuggestions(e.target.value, false)} placeholder="Enter drop location" className="p-2 bg-gray-100 text-lg font-medium w-full rounded mt-5 pl-8 border-2 border-gray-400" />
                    </div>
                    <div className="p-2 relative h-[64vh] hidden bg-300 p-2" ref={recentLocation}>
                        {isBothEntered}
                        <button disabled={!isBothEntered} className={`${(!isBothEntered ? 'bg-zinc-300' : 'bg-yellow-300')} p-2  w-[80%] block mx-auto font-medium text-xl rounded-lg`} onClick={searchRide}>Search Ride</button>
                        {
                            suggestions.map((suggestion) => {
                                return (
                                    <div className="flex gap-2 mt-2 active:border-black p-2 rounded-lg border-2 border-gray-300" onClick={()=>selectLocation(suggestion)}>
                                        <span className="bg-gray-200 rounded-full p-2 py-1">
                                            <i className="ri-map-pin-line"></i>
                                        </span>
                                        <h2 className="text-lg font-medium ml-2">{suggestion}</h2>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
};
export default home;