import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Google Maps container style
const containerStyle = {
    width: "100%",
    height: "400px",
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
                console.log("Map errorrrr", error);
            }
        );
    }, []);
    return (
        <LoadScript googleMapsApiKey="AIzaSyDlOEOMtCsHSRCGn_TEg0ffWXdWjC3I5GY">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={20} // Adjust zoom level as needed
            >
                <Marker position={location} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
