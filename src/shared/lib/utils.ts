export const formatTemperature = (temp: number, unit: 'celsius' | 'fahrenheit'): string => {
  const value = unit === 'fahrenheit' ? (temp * 9) / 5 + 32 : temp
  return `${Math.round(value)}°${unit === 'fahrenheit' ? 'F' : 'C'}`
}

export const formatWindSpeed = (speed: number, unit: 'kmh' | 'ms'): string => {
  const value = unit === 'ms' ? speed / 3.6 : speed
  return `${Math.round(value)} ${unit === 'ms' ? 'м/с' : 'км/ч'}`
}

export const formatDate = (date: string | Date, locale: string = 'ru'): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatTime = (date: string | Date, locale: string = 'ru'): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const getWeatherIcon = (code: number): string => {
  // Упрощенная логика для иконок погоды
  if (code === 0) return '☀️' // Clear sky
  if (code <= 3) return '🌤️' // Partly cloudy
  if (code <= 48) return '☁️' // Cloudy
  if (code <= 67 || code <= 77) return '🌧️' // Rain/Snow
  if (code <= 82) return '⛈️' // Thunderstorm
  if (code <= 86) return '🌨️' // Snow
  return '🌫️' // Fog
}

