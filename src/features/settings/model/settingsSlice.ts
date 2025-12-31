import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingsState {
  temperatureUnit: 'celsius' | 'fahrenheit'
  windSpeedUnit: 'kmh' | 'ms'
  language: 'ru' | 'en'
  theme: 'light' | 'dark' | 'system'
}

const loadSettings = (): SettingsState => {
  const stored = localStorage.getItem('weatherAppSettings')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      // Если ошибка парсинга, используем значения по умолчанию
    }
  }
  return {
    temperatureUnit: 'celsius',
    windSpeedUnit: 'kmh',
    language: 'ru',
    theme: 'system',
  }
}

const initialState: SettingsState = loadSettings()

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<'celsius' | 'fahrenheit'>) => {
      state.temperatureUnit = action.payload
      localStorage.setItem('weatherAppSettings', JSON.stringify(state))
    },
    setWindSpeedUnit: (state, action: PayloadAction<'kmh' | 'ms'>) => {
      state.windSpeedUnit = action.payload
      localStorage.setItem('weatherAppSettings', JSON.stringify(state))
    },
    setLanguage: (state, action: PayloadAction<'ru' | 'en'>) => {
      state.language = action.payload
      localStorage.setItem('weatherAppSettings', JSON.stringify(state))
      localStorage.setItem('language', action.payload)
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload
      localStorage.setItem('weatherAppSettings', JSON.stringify(state))
    },
  },
})

export const { setTemperatureUnit, setWindSpeedUnit, setLanguage, setTheme } =
  settingsSlice.actions
export default settingsSlice.reducer

