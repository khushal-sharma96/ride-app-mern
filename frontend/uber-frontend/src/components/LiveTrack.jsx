// "use client"

// import { useEffect, useRef, useState } from "react"
// import mapboxgl from "mapbox-gl"
// import "mapbox-gl/dist/mapbox-gl.css"
// // import { button } from "@/components/ui/button"
// // import { input } from "@/components/ui/input"
// // import { span, span, span, span } from "lucide-react"

// // Initialize mapbox with access token
// mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_TOKEN
// export default function Livespan() {
//   const mapContainer = useRef(null)
//   const map = useRef(null)
//   const marker = useRef(null)
//   const navigationControl = useRef(null)
//   const geolocateControl = useRef(null)

//   const [lng, setLng] = useState(-74.006)
//   const [lat, setLat] = useState(40.7128)
//   const [zoom, setZoom] = useState(12)
//   const [destination, setDestination] = useState("")
//   const [route, setRoute] = useState(null)
//   const [isNavigating, setIsNavigating] = useState(false)
//   const [userLocation, setUserLocation] = useState(null)
//   const [error, setError] = useState(null)

//   // Initialize map when component mounts
//   useEffect(() => {
//     if (map.current) return // initialize map only once

//     if (mapContainer.current) {
//       map.current = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: "mapbox://styles/mapbox/streets-v12",
//         center: [lng, lat],
//         zoom: zoom,
//         pitch: 45,
//       })

//       // Add navigation controls
//       navigationControl.current = new mapboxgl.supported()
//       console.log(navigationControl);
//       map.current.addControl(navigationControl.current, "top-right")

//       // Add geolocate control
//       geolocateControl.current = new mapboxgl.GeolocateControl({
//         positionOptions: {
//           enableHighAccuracy: true,
//         },
//         trackUserLocation: true,
//         showUserHeading: true,
//       })
//       map.current.addControl(geolocateControl.current, "top-right")

//       // Get user's location on load
//       map.current.on("load", () => {
//         geolocateControl.current?.trigger()
//       })

//       // Update state when user location changes
//       if (geolocateControl.current) {
//         map.current.on("geolocate", (e) => {
//           const { longitude, latitude } = e.coords
//           setUserLocation([longitude, latitude])
//           setLng(longitude)
//           setLat(latitude)
//         })
//       }

//       // Update state when map moves
//       map.current.on("move", () => {
//         if (map.current) {
//           const center = map.current.getCenter()
//           setLng(Number(center.lng.toFixed(4)))
//           setLat(Number(center.lat.toFixed(4)))
//           setZoom(Number(map.current.getZoom().toFixed(2)))
//         }
//       })
//     }

//     return () => {
//       if (map.current) {
//         map.current.remove()
//         map.current = null
//       }
//     }
//   }, [])

//   // Function to search for a destination
//   const searchDestination = async () => {
//     if (!destination) {
//       setError("Please enter a destination")
//       return
//     }

//     try {
//       setError(null)
//       const response = await fetch(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(destination)}.json?access_token=${mapboxgl.accessToken}`,
//       )
//       const data = await response.json()

//       if (data.features && data.features.length > 0) {
//         const [destLng, destLat] = data.features[0].center

//         // Add marker for destination
//         if (marker.current) {
//           marker.current.remove()
//         }

//         marker.current = new mapboxgl.Marker({ color: "#FF0000" }).setLngLat([destLng, destLat]).addTo(map.current)

//         // Fly to the destination
//         map.current?.flyTo({
//           center: [destLng, destLat],
//           zoom: 14,
//           essential: true,
//         })

//         // If we have user location, get directions
//         if (userLocation) {
//           getDirections(userLocation, [destLng, destLat])
//         }
//       } else {
//         setError("Location not found")
//       }
//     } catch (err) {
//       setError("Error searching for location")
//       console.error(err)
//     }
//   }

//   // Function to get directions
//   const getDirections = async (start, end) => {
//     try {
//       const response = await fetch(
//         `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
//       )
//       const data = await response.json()

//       if (data.routes && data.routes.length > 0) {
//         setRoute(data.routes[0])

//         // Add the route to the map
//         if (map.current?.getSource("route")) {
//           ;(map.current.getSource("route")).setData({
//             type: "Feature",
//             properties: {},
//             geometry: data.routes[0].geometry,
//           })
//         } else if (map.current) {
//           map.current.addSource("route", {
//             type: "geojson",
//             data: {
//               type: "Feature",
//               properties: {},
//               geometry: data.routes[0].geometry,
//             },
//           })

//           map.current.addLayer({
//             id: "route",
//             type: "line",
//             source: "route",
//             layout: {
//               "line-join": "round",
//               "line-cap": "round",
//             },
//             paint: {
//               "line-color": "#3887be",
//               "line-width": 5,
//               "line-opacity": 0.75,
//             },
//           })
//         }
//       } else {
//         setError("No route found")
//       }
//     } catch (err) {
//       setError("Error getting directions")
//       console.error(err)
//     }
//   }

//   // Start navigation
//   const startspan = () => {
//     if (!route) {
//       setError("Please search for a destination first")
//       return
//     }

//     setIsNavigating(true)

//     // Center on user location and follow
//     if (userLocation && map.current) {
//       map.current.flyTo({
//         center: userLocation,
//         zoom: 16,
//         pitch: 60,
//         bearing: 0,
//         essential: true,
//       })
//     }

//     // Trigger geolocate to start tracking
//     geolocateControl.current?.trigger()
//   }

//   // Stop navigation
//   const stopspan = () => {
//     setIsNavigating(false)

//     // Reset map view
//     if (map.current) {
//       map.current.flyTo({
//         pitch: 0,
//         bearing: 0,
//         zoom: 12,
//         essential: true,
//       })
//     }
//   }

//   // Reset everything
//   const resetMap = () => {
//     setDestination("")
//     setRoute(null)
//     setIsNavigating(false)
//     setError(null)

//     // Remove route layer and source
//     if (map.current?.getLayer("route")) {
//       map.current.removeLayer("route")
//     }

//     if (map.current?.getSource("route")) {
//       map.current.removeSource("route")
//     }

//     // Remove marker
//     if (marker.current) {
//       marker.current.remove()
//       marker.current = null
//     }

//     // Reset map view
//     if (map.current) {
//       map.current.flyTo({
//         center: userLocation || [lng, lat],
//         zoom: 12,
//         pitch: 0,
//         bearing: 0,
//         essential: true,
//       })
//     }
//   }

//   return (
//     <div className="w-full h-screen flex flex-col">
//       <div className="relative w-full h-full">
//         <div ref={mapContainer} className="absolute inset-0" />

//         <div className="absolute top-4 left-4 right-4 z-10">
//           <div className="w-full shadow-lg bg-white/90 backdrop-blur-sm">
//             <div className="pb-2">
//               <div>Live span</div>
//             </div>
//             <div>
//               <div className="flex gap-2">
//                 <input
//                   placeholder="Enter destination"
//                   value={destination}
//                   onChange={(e) => setDestination(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && searchDestination()}
//                 />
//                 <button onClick={searchDestination}>
//                   <span className="h-4 w-4 mr-2" />
//                   Search
//                 </button>
//               </div>
//               {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//               {route && (
//                 <div className="mt-2 text-sm">
//                   <p>Distance: {(route.distance / 1000).toFixed(2)} km</p>
//                   <p>Duration: {Math.floor(route.duration / 60)} minutes</p>
//                 </div>
//               )}
//             </div>
//             <div className="flex justify-between pt-0">
//               <button
//                 variant={isNavigating ? "destructive" : "default"}
//                 onClick={isNavigating ? stopspan : startspan}
//                 disabled={!route}
//               >
//                 {isNavigating ? (
//                   <>
//                     <span className="h-4 w-4 mr-2" />
//                     Stop span
//                   </>
//                 ) : (
//                   <>
//                     <span className="h-4 w-4 mr-2" />
//                     Start span
//                   </>
//                 )}
//               </button>
//               <button variant="outline" onClick={resetMap}>
//                 <span className="h-4 w-4 mr-2" />
//                 Reset
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

