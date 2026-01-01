export interface City {
  id: number
  name: string
  country: string
  latitude: number
  longitude: number
  displayName: string
}

/**
 * @deprecated Используйте NominatimGeocodingResponse из @/entities/city/api/types
 * Оставлено для обратной совместимости
 */
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

