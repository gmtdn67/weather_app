import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { City } from '../model/types'
import type { NominatimGeocodingResponse } from './types'

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
  keepUnusedDataFor: 600, // Кэш на 10 минут для геокодирования
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
      transformResponse: (response: NominatimGeocodingResponse[]): City[] => {
        if (!Array.isArray(response)) {
          return []
        }

        return response
          .filter((item) => item.place_id && item.lat && item.lon)
          .map((item) => {
            const latitude = parseFloat(item.lat)
            const longitude = parseFloat(item.lon)

            // Валидация координат
            if (isNaN(latitude) || isNaN(longitude)) {
              throw new Error(`Invalid coordinates for place_id: ${item.place_id}`)
            }

            // Определение названия города из адреса
            const name =
              item.address?.city ||
              item.address?.town ||
              item.address?.village ||
              item.address?.municipality ||
              ''

            return {
              id: item.place_id,
              name,
              country: item.address?.country || '',
              latitude,
              longitude,
              displayName: item.display_name,
            }
          })
          .filter((city) => city.name !== '') // Фильтруем города без названия
      },
      transformErrorResponse: (response: { status: number; data?: { error?: string } }) => {
        // Обработка ошибок Nominatim API
        if (response.status === 429) {
          return {
            status: response.status,
            data: {
              message: 'Too many requests. Please wait a moment before searching again.',
            },
          }
        }
        return response
      },
    }),
  }),
})

export const { useSearchCityQuery, useLazySearchCityQuery } = geocodingApi

