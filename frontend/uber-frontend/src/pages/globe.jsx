import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';

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
            zoom: 1,
            center: [30, 15],
            pitch: 40
        });

        mapRef.current.addControl(new mapboxgl.NavigationControl());
        mapRef.current.scrollZoom.enable();
        mapRef.current.scrollZoom.setWheelZoomRate(1/800);
        mapRef.current.scrollZoom.setZoomRate(1/300);


        mapRef.current.on('style.load', () => {
            mapRef.current.setFog({}); // Set the default atmosphere style
        });

        const secondsPerRevolution = 240;
        // Above zoom level 5, do not rotate.
        const maxSpinZoom = 5;
        // Rotate at intermediate speeds between zoom levels 3 and 5.
        const slowSpinZoom = 3;

        const spinEnabled = true;

        function spinGlobe() {
            const zoom = mapRef.current.getZoom();
            if (spinEnabled && !userInteractingRef.current && zoom < maxSpinZoom) {
                let distancePerSecond = 360 / secondsPerRevolution;
                if (zoom > slowSpinZoom) {
                    // Slow spinning at higher zooms
                    const zoomDif =
                        (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                    distancePerSecond *= zoomDif;
                }
                const center = mapRef.current.getCenter();
                center.lng -= distancePerSecond;
                mapRef.current.easeTo({ center, duration: 1000, easing: (n) => n });
            }
        }

        mapRef.current.on('mousedown', () => {
            userInteractingRef.current = true;
        });

        mapRef.current.on('dragstart', () => {
            userInteractingRef.current = true;
        });

        // Reset user interaction flag when interaction ends
        mapRef.current.on('mouseup', () => {
            userInteractingRef.current = false;
            spinGlobe();
        });

        mapRef.current.on('dragend', () => {
            userInteractingRef.current = false;
            spinGlobe();
        });

        // When animation is complete, start spinning if there is no ongoing interaction
        mapRef.current.on('moveend', () => {
            spinGlobe();
        });

        // Start the globe spinning
        spinGlobe();

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