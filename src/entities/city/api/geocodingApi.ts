import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { City, GeocodingResponse } from '../model/types'

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org'

export const geocodingApi = createApi({
  reducerPath: 'geocodingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: NOMINATIM_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('User-Agent', 'WeatherForecastApp/1.0')
      return headers
    },
  }),
  endpoints: (builder) => ({
    searchCity: builder.query<City[], string>({
      query: (cityName) => ({
        url: '/search',
        params: {
          q: cityName,
          format: 'json',
          limit: 5,
          addressdetails: 1,
        },
      }),
      transformResponse: (response: GeocodingResponse[]): City[] => {
        return response.map((item, index) => ({
          id: item.place_id,
          name: item.address?.city || item.address?.town || item.address?.village || '',
          country: item.address?.country || '',
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lon),
          displayName: item.display_name,
        }))
      },
    }),
  }),
})

export const { useSearchCityQuery, useLazySearchCityQuery } = geocodingApi

