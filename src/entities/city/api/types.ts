export interface NominatimAddress {
  city?: string
  town?: string
  village?: string
  municipality?: string
  county?: string
  state?: string
  country?: string
  country_code?: string
  postcode?: string
  road?: string
  house_number?: string
}

export interface NominatimGeocodingResponse {
  place_id: number
  licence: string
  powered_by: string
  osm_type: string
  osm_id: number
  boundingbox: [string, string, string, string]
  lat: string
  lon: string
  display_name: string
  class: string
  type: string
  importance: number
  icon?: string
  address?: NominatimAddress
}

export interface NominatimReverseGeocodingResponse {
  place_id: number
  licence: string
  powered_by: string
  osm_type: string
  osm_id: number
  lat: string
  lon: string
  display_name: string
  address: NominatimAddress
  boundingbox: [string, string, string, string]
}

