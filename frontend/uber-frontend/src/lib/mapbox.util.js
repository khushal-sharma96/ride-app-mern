// Helper functions for Mapbox integration

/**
 * Formats duration in seconds to a human-readable string
 */
export function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
  
    if (hours > 0) {
      return `${hours} hr ${minutes} min`
    }
    return `${minutes} min`
  }
  
  /**
   * Formats distance in meters to a human-readable string
   */
  export function formatDistance(meters: number): string {
    if (meters < 1000) {
      return `${Math.round(meters)} m`
    }
    return `${(meters / 1000).toFixed(1)} km`
  }
  
  /**
   * Gets the bearing between two points
   */
  export function getBearing(start: [number, number], end: [number, number]): number {
    const startLat = toRadians(start[1])
    const startLng = toRadians(start[0])
    const endLat = toRadians(end[1])
    const endLng = toRadians(end[0])
  
    const y = Math.sin(endLng - startLng) * Math.cos(endLat)
    const x = Math.cos(startLat) * Math.sin(endLat) - Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng)
  
    let bearing = toDegrees(Math.atan2(y, x))
    bearing = (bearing + 360) % 360 // Normalize to 0-360
  
    return bearing
  }
  
  /**
   * Converts degrees to radians
   */
  function toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180
  }
  
  /**
   * Converts radians to degrees
   */
  function toDegrees(radians: number): number {
    return (radians * 180) / Math.PI
  }
  
   