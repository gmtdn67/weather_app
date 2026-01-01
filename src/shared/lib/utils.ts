// Кэш для форматирования дат/времени
// Ограничиваем размер кэша для предотвращения утечек памяти
const MAX_CACHE_SIZE = 1000
const dateFormatCache = new Map<string, string>()
const timeFormatCache = new Map<string, string>()

// Функция для ограничения размера кэша
const limitCacheSize = (cache: Map<string, string>, maxSize: number) => {
  if (cache.size > maxSize) {
    const firstKey = cache.keys().next().value
    cache.delete(firstKey)
  }
}

export const formatTemperature = (temp: number, unit: 'celsius' | 'fahrenheit'): string => {
  const value = unit === 'fahrenheit' ? (temp * 9) / 5 + 32 : temp
  return `${Math.round(value)}°${unit === 'fahrenheit' ? 'F' : 'C'}`
}

export const formatWindSpeed = (speed: number, unit: 'kmh' | 'ms'): string => {
  const value = unit === 'ms' ? speed / 3.6 : speed
  return `${Math.round(value)} ${unit === 'ms' ? 'м/с' : 'км/ч'}`
}

export const formatDate = (date: string | Date, locale: string = 'ru'): string => {
  const dateStr = typeof date === 'string' ? date : date.toISOString()
  const cacheKey = `${dateStr}-${locale}`
  
  if (dateFormatCache.has(cacheKey)) {
    return dateFormatCache.get(cacheKey)!
  }
  
  const d = typeof date === 'string' ? new Date(date) : date
  const formatted = d.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  
  dateFormatCache.set(cacheKey, formatted)
  limitCacheSize(dateFormatCache, MAX_CACHE_SIZE)
  return formatted
}

export const formatTime = (date: string | Date, locale: string = 'ru'): string => {
  const dateStr = typeof date === 'string' ? date : date.toISOString()
  const cacheKey = `${dateStr}-${locale}`
  
  if (timeFormatCache.has(cacheKey)) {
    return timeFormatCache.get(cacheKey)!
  }
  
  const d = typeof date === 'string' ? new Date(date) : date
  const formatted = d.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  })
  
  timeFormatCache.set(cacheKey, formatted)
  limitCacheSize(timeFormatCache, MAX_CACHE_SIZE)
  return formatted
}

// Map для быстрого доступа к иконкам погоды (WMO Weather interpretation codes)
const WEATHER_ICON_MAP = new Map<number, string>([
  [0, '☀️'], // Clear sky
  [1, '🌤️'], // Mainly clear
  [2, '🌤️'], // Partly cloudy
  [3, '☁️'], // Overcast
  [45, '🌫️'], // Fog
  [48, '🌫️'], // Depositing rime fog
  [51, '🌧️'], // Light drizzle
  [53, '🌧️'], // Moderate drizzle
  [55, '🌧️'], // Dense drizzle
  [56, '🌧️'], // Light freezing drizzle
  [57, '🌧️'], // Dense freezing drizzle
  [61, '🌧️'], // Slight rain
  [63, '🌧️'], // Moderate rain
  [65, '🌧️'], // Heavy rain
  [66, '🌧️'], // Light freezing rain
  [67, '🌧️'], // Heavy freezing rain
  [71, '🌨️'], // Slight snow fall
  [73, '🌨️'], // Moderate snow fall
  [75, '🌨️'], // Heavy snow fall
  [77, '🌨️'], // Snow grains
  [80, '🌧️'], // Slight rain showers
  [81, '🌧️'], // Moderate rain showers
  [82, '⛈️'], // Violent rain showers
  [85, '🌨️'], // Slight snow showers
  [86, '🌨️'], // Heavy snow showers
  [95, '⛈️'], // Thunderstorm
  [96, '⛈️'], // Thunderstorm with slight hail
  [99, '⛈️'], // Thunderstorm with heavy hail
])

export const getWeatherIcon = (code: number): string => {
  // Прямой доступ через Map - O(1) вместо множественных проверок
  return WEATHER_ICON_MAP.get(code) || '🌫️' // Fallback на fog
}

