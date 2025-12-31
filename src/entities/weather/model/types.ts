export interface CurrentWeather {
  temperature: number
  humidity: number
  windSpeed: number
  precipitation: number
  weatherCode: number
  time: string
}

export interface HourlyForecast {
  time: string[]
  temperature: number[]
  weatherCode: number[]
  precipitation: number[]
  windSpeed: number[]
}

export interface DailyForecast {
  time: string[]
  temperatureMax: number[]
  temperatureMin: number[]
  weatherCode: number[]
  precipitationSum: number[]
}

export interface WeatherData {
  current: CurrentWeather
  hourly: HourlyForecast
  daily: DailyForecast
}

