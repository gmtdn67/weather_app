export interface City {
  id: number
  name: string
  country: string
  latitude: number
  longitude: number
  displayName: string
}

export interface GeocodingResponse {
  place_id: number
  display_name: string
  lat: string
  lon: string
  address?: {
    city?: string
    town?: string
    village?: string
    country: string
  }
}

