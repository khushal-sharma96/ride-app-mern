import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Google Maps container style
const containerStyle = {
    width: "100%",
    height: "100%",
};


const MapComponent = () => {
    const [location, setLocation] = useState({
        lat: 0,
        lng: 0
    });
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log(latitude, longitude);
                setLocation({
                    lat: latitude,
                    lng: longitude
                });
            },
            (error) => {
                console.log("Map error:", error);
                window.$toast({
                    type:'error',
                    title:error?.message??"Something went wrong while loading the map!"
                });
            }
        );
    }, []);
    return (
        <LoadScript googleMapsApiKey={import.meta.env.GOOGLE_MAP_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={16} 
            >
                <Marker position={location} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
