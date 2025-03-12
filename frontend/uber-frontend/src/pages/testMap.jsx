import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import * as turf from '@turf/turf';

const LiveNavigation = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const userInteractingRef = useRef(false);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoia2h1c2hhbC05NiIsImEiOiJjbTg1anNocmIxODY3MmpzYWg3cDVldWJoIn0.ghP9SbHf4SWGbMvI-2OAAQ';

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v9',
            projection: 'globe', // Display the map as a globe
            zoom: 2,
            center: [30, 15],
            pitch: 40
        });

        mapRef.current.addControl(new mapboxgl.NavigationControl());
        mapRef.current.addControl(
            new MapboxDirections({
                accessToken: mapboxgl.accessToken
            }),
            'top-right'
        );
        mapRef.current.scrollZoom.enable();
        mapRef.current.scrollZoom.setWheelZoomRate(1/800);
        mapRef.current.scrollZoom.setZoomRate(1/300);

        // Clean up on unmount
        return () => {
            mapRef.current.remove();
        };
    }, []);

    return (
        <div ref={mapContainerRef} style={{ height: '400px' }} />
    );
};

export default LiveNavigation;