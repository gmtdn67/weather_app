
export interface OpenMeteoCurrentWeather {
  time: string
  interval: number
  temperature_2m: number
  relative_humidity_2m: number
  precipitation: number
  weather_code: number
  wind_speed_10m: number
}

export interface OpenMeteoHourlyForecast {
  time: string[]
  temperature_2m: number[]
  weather_code: number[]
  precipitation: number[]
  wind_speed_10m: number[]
}

export interface OpenMeteoDailyForecast {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  weather_code: number[]
  precipitation_sum: number[]
}

export interface OpenMeteoResponse {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: {
    time: string
    interval: string
    temperature_2m: string
    relative_humidity_2m: string
    precipitation: string
    weather_code: string
    wind_speed_10m: string
  }
  current: OpenMeteoCurrentWeather
  hourly_units: {
    time: string
    temperature_2m: string
    weather_code: string
    precipitation: string
    wind_speed_10m: string
  }
  hourly: OpenMeteoHourlyForecast
  daily_units: {
    time: string
    temperature_2m_max: string
    temperature_2m_min: string
    weather_code: string
    precipitation_sum: string
  }
  daily: OpenMeteoDailyForecast
}

export interface OpenMeteoError {
  error: boolean
  reason: string
}

