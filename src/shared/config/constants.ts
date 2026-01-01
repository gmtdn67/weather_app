/**
 * Константы приложения
 */

// Кэширование
export const CACHE_TIME_WEATHER = 300 // 5 минут для погоды
export const CACHE_TIME_GEOCODING = 600 // 10 минут для геокодирования

// Форматирование
export const FORECAST_HOURS = 24 // Количество часов в почасовом прогнозе
export const FORECAST_DAYS = 14 // Количество дней в ежедневном прогнозе
export const MAX_HISTORY_ITEMS = 10 // Максимальное количество элементов в истории

// Поиск
export const SEARCH_DEBOUNCE_DELAY = 300 // Задержка debounce для поиска (мс)
export const MIN_SEARCH_LENGTH = 2 // Минимальная длина запроса для поиска

// Размеры кэша для форматирования
export const DATE_FORMAT_CACHE_SIZE = 1000 // Максимальный размер кэша дат
export const TIME_FORMAT_CACHE_SIZE = 1000 // Максимальный размер кэша времени

