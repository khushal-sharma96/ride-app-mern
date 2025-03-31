import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';


const AnimatedNavigation = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const pointRef = useRef(null);
  const originRef = useRef(null);
  const routeRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const steps = 500;
  let counter = 0;

  function handleClick() {
    pointRef.current.features[0].geometry.coordinates = originRef.current;
    mapRef.current.getSource('point').setData(pointRef.current);
    animate(0);
    setDisabled(true);
  }

  function animate() {
    const start =
      routeRef.current.features[0].geometry.coordinates[
        counter >= steps ? counter - 1 : counter
      ];
    const end =
      routeRef.current.features[0].geometry.coordinates[
        counter >= steps ? counter : counter + 1
      ];

    if (!start || !end) {
      setDisabled(false);
      return;
    }

    pointRef.current.features[0].geometry.coordinates =
      routeRef.current.features[0].geometry.coordinates[counter];
    pointRef.current.features[0].properties.bearing = turf.bearing(
      turf.point(start),
      turf.point(end)
    );

    mapRef.current.getSource('point').setData(pointRef.current);

    if (counter < steps) {
      requestAnimationFrame(animate);
    }

    counter = counter + 1;
  }

  useEffect(() => {
    // mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2h1c2hhbC05NiIsImEiOiJjbTg1anNocmIxODY3MmpzYWg3cDVldWJoIn0.ghP9SbHf4SWGbMvI-2OAAQ';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-96, 37.8],
      zoom: 3,
      pitch: 40
    });

    const origin = [-122.414, 37.776];
    originRef.current = origin;

    const destination = [-77.032, 38.913];

    const route = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [origin, destination]
          }
        }
      ]
    };
    routeRef.current = route;

    const point = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: origin
          }
        }
      ]
    };
    pointRef.current = point;

    const lineDistance = turf.length(route.features[0]);
    const arc = [];

    for (let i = 0; i < lineDistance; i += lineDistance / steps) {
      const segment = turf.along(route.features[0], i);
      arc.push(segment.geometry.coordinates);
    }

    route.features[0].geometry.coordinates = arc;

    mapRef.current.on('load', () => {
        const directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: 'metric',
          profile: 'mapbox/driving',
          alternatives: true,
          congestion: true,
          steps: true,
          controls: {
            instructions: true
          }
        });
        
        map.addControl(directions, 'top-left');
    //   mapRef.current.addSource('route', {
    //     type: 'geojson',
    //     data: route
    //   });

    //   mapRef.current.addSource('point', {
    //     type: 'geojson',
    //     data: point
    //   });

    //   mapRef.current.addLayer({
    //     id: 'route',
    //     source: 'route',
    //     type: 'line',
    //     paint: {
    //       'line-width': 2,
    //       'line-color': '#007cbf'
    //     }
    //   });

    //   mapRef.current.addLayer({
    //     id: 'point',
    //     source: 'point',
    //     type: 'symbol',
    //     layout: {
    //       'icon-image': 'airport',
    //       'icon-size': 1.5,
    //       'icon-rotate': ['get', 'bearing'],
    //       'icon-rotation-alignment': 'map',
    //       'icon-allow-overlap': true,
    //       'icon-ignore-placement': true
    //     }
    //   });

    //   animate(counter);
    });

    return () => mapRef.current.remove();
  }, []);

  return (
    <div>
      <div ref={mapContainerRef} style={{ height: '400px' }} />
      <button onClick={handleClick} disabled={disabled}>
        Replay
      </button>
    </div>
  );
};

export default AnimatedNavigation;
/*
    const startLocationTracking = () => {
        if ('geolocation' in navigator) {
            watchIdRef.current = navigator.geolocation.watchPosition(
                position => {
                    const { longitude, latitude } = position.coords;
                    updateUserLocation([longitude, latitude]);
                },
                error => {
                    console.error('Error getting location:', error);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 5000
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };
      const updateUserLocation = (coordinates) => {
            if (!coordinates || !Array.isArray(coordinates) || coordinates.length < 2) {
                console.error('Invalid coordinates:', coordinates);
                return;
            }
    
            // Update marker position
            markerRef.current.setLngLat(coordinates);
    
            // If we're navigating and have a route, calculate progress
            if (isNavigating && routeRef.current) {
                try {
                    // Create a point from user coordinates
                    const userPoint = turf.point(coordinates);
    
                    // Convert route geometry to a line
                    const routeLine = turf.lineString(routeRef.current.coordinates);
    
                    // Find the closest point on the route to the user's current position
                    const snapped = turf.nearestPointOnLine(routeLine, userPoint);
    
                    // Calculate progress percentage along the route
                    const routeDistance = turf.length(routeLine);
                    const progressDistance = turf.length(
                        turf.lineSlice(
                            turf.point(routeLine.geometry.coordinates[0]),
                            snapped,
                            routeLine
                        )
                    );
    
                    const progressPercent = (progressDistance / routeDistance) * 100;
                    setProgress(progressPercent);
    
                    // Calculate remaining distance
                    const remainingDist = routeDistance - progressDistance;
                    setRemainingDistance(remainingDist * 1000); // Convert to meters
    
                    // Estimate remaining time based on progress
                    if (directionsRef.current && directionsRef.current.getRoute() && directionsRef.current.getRoute()[0]) {
                        const totalDuration = directionsRef.current.getRoute()[0].duration;
                        const remainingDur = totalDuration * (1 - (progressPercent / 100));
                        setRemainingTime(remainingDur);
                    }
    
                    // Update current step
                    if (directionsRef.current && directionsRef.current.getRoute() &&
                        directionsRef.current.getRoute()[0] &&
                        directionsRef.current.getRoute()[0].legs &&
                        directionsRef.current.getRoute()[0].legs[0] &&
                        directionsRef.current.getRoute()[0].legs[0].steps) {
    
                        const steps = directionsRef.current.getRoute()[0].legs[0].steps;
    
                        // Find the current step based on progress
                        for (let i = 0; i < steps.length; i++) {
                            const stepStart = steps[i].distance;
                            const stepEnd = i < steps.length - 1 ? steps[i + 1].distance : Infinity;
    
                            if (progressDistance >= stepStart && progressDistance < stepEnd) {
                                setCurrentStep(steps[i]);
                                break;
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error calculating route progress:', error);
                }
            }
        };

        document.getElementById('stop-navigation').addEventListener('click', () => {
                setIsNavigating(false);
                if (watchIdRef.current) {
                    navigator.geolocation.clearWatch(watchIdRef.current);
                    watchIdRef.current = null;
                }
            });

            if (watchIdRef.current) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
            if (mapRef.current) {
                mapRef.current.remove();
            }