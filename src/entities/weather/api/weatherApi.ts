import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { WeatherData } from '../model/types'
import type { OpenMeteoResponse, OpenMeteoError } from './types'

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1'

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: OPEN_METEO_BASE_URL }),
  keepUnusedDataFor: 300, // Кэш на 5 минут
  endpoints: (builder) => ({
    getWeather: builder.query<WeatherData, { latitude: number; longitude: number }>({
      query: ({ latitude, longitude }) => ({
        url: '/forecast',
        params: {
          latitude,
          longitude,
          current: 'temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m',
          hourly: 'temperature_2m,weather_code,precipitation,wind_speed_10m',
          daily: 'temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum',
          timezone: 'auto',
          forecast_days: 14,
        },
      }),
      transformResponse: (response: OpenMeteoResponse): WeatherData => {
        // Валидация ответа
        if (!response.current || !response.hourly || !response.daily) {
          throw new Error('Invalid API response: missing required data')
        }

        return {
          current: {
            temperature: response.current.temperature_2m,
            humidity: response.current.relative_humidity_2m,
            windSpeed: response.current.wind_speed_10m,
            precipitation: response.current.precipitation,
            weatherCode: response.current.weather_code,
            time: response.current.time,
          },
          hourly: {
            time: response.hourly.time.slice(0, 24),
            temperature: response.hourly.temperature_2m.slice(0, 24),
            weatherCode: response.hourly.weather_code.slice(0, 24),
            precipitation: response.hourly.precipitation.slice(0, 24),
            windSpeed: response.hourly.wind_speed_10m.slice(0, 24),
          },
          daily: {
            time: response.daily.time,
            temperatureMax: response.daily.temperature_2m_max,
            temperatureMin: response.daily.temperature_2m_min,
            weatherCode: response.daily.weather_code,
            precipitationSum: response.daily.precipitation_sum,
          },
        }
      },
      transformErrorResponse: (response: { status: number; data?: OpenMeteoError }) => {
        // Обработка ошибок API
        if (response.data?.error) {
          return {
            status: response.status,
            data: {
              message: response.data.reason || 'Unknown error from weather API',
            },
          }
        }
        return response
      },
    }),
  }),
})

export const { useGetWeatherQuery, useLazyGetWeatherQuery } = weatherApi

