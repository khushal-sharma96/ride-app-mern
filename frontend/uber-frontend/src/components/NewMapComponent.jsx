import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import * as turf from '@turf/turf';

const LiveNavigation = (props) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        console.log(props);
        if (!props?.mapData) {
            return;
        }
        mapboxgl.accessToken = 'pk.eyJ1Ijoia2h1c2hhbC05NiIsImEiOiJjbTg1anNocmIxODY3MmpzYWg3cDVldWJoIn0.ghP9SbHf4SWGbMvI-2OAAQ';

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v9',
            projection: 'globe', // Display the map as a globe
            zoom: 13,
            center: props?.mapData?.geometry?.coordinates[0],
            pitch: 40
        });

        mapRef.current.addControl(new mapboxgl.NavigationControl());
        mapRef.current.scrollZoom.enable();
        mapRef.current.scrollZoom.setWheelZoomRate(1 / 800);
        mapRef.current.scrollZoom.setZoomRate(1 / 300);
        mapRef.current.on('load', () => {
            const cordinates = props?.mapData?.geometry?.coordinates;
            if (cordinates?.length) {
                const points = [
                    cordinates[0],
                    cordinates[cordinates.length - 1],
                ];

                mapRef.current.loadImage(
                    'http://localhost:5173/images/origin.png',
                    (error, image) => {
                        if (error) throw error;

                        mapRef.current.addImage('origin', image);
                    });
                mapRef.current.loadImage(
                    'http://localhost:5173/images/destination.png',
                    (error, image) => {
                        if (error) throw error;

                        mapRef.current.addImage('destination', image);
                    });

                points.forEach((cordinate, index) => {
                    mapRef.current.addSource('points' + index, {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: [
                                {
                                    type: 'Feature',
                                    geometry: {
                                        type: 'Point',
                                        coordinates: cordinate
                                    }
                                }
                            ]
                        }
                    });
                    mapRef.current.addLayer({
                        id: 'points' + index,
                        type: 'symbol',
                        source: 'points' + index,
                        layout: {
                            'icon-image': index?"destination":'origin',
                            'icon-size': 0.02
                        }
                    });
                    // mapRef.current.addLayer({
                    //     id: 'point' + index,
                    //     type: 'circle',
                    //     source: {
                    //         type: 'geojson',
                    //         data: {
                    //             type: 'FeatureCollection',
                    //             features: [
                    //                 {
                    //                     type: 'Feature',
                    //                     properties: {},
                    //                     geometry: {
                    //                         type: 'Point',
                    //                         coordinates: cordinate
                    //                     }
                    //                 }
                    //             ]
                    //         }
                    //     },
                    //     paint: {
                    //         'circle-radius': 10,
                    //         'circle-color': index ? '#ff9900' : "#ff1a1a"
                    //     }
                    // });
                });
            }
            mapRef.current.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: props?.mapData
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#3887be',
                    'line-width': 8,
                    'line-opacity': 1
                }
            });

        }
        )
        // Clean up on unmount
        return () => {
            mapRef.current.remove();
        };
    }, [props?.mapData]);

    return (
        <>
            <div ref={mapContainerRef} style={{ height: '400px' }} />
        </>
    );
};

export default LiveNavigation;