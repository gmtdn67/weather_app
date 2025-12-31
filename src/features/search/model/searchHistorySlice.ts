import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { City } from '@/entities/city/model/types'

interface SearchHistoryState {
  cities: City[]
}

const MAX_HISTORY_ITEMS = 10

const loadHistory = (): City[] => {
  const stored = localStorage.getItem('weatherAppHistory')
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return []
    }
  }
  return []
}

const initialState: SearchHistoryState = {
  cities: loadHistory(),
}

const searchHistorySlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<City>) => {
      // Удаляем город, если он уже есть в истории
      state.cities = state.cities.filter((city) => city.id !== action.payload.id)
      // Добавляем в начало
      state.cities.unshift(action.payload)
      // Ограничиваем размер истории
      state.cities = state.cities.slice(0, MAX_HISTORY_ITEMS)
      localStorage.setItem('weatherAppHistory', JSON.stringify(state.cities))
    },
    clearHistory: (state) => {
      state.cities = []
      localStorage.removeItem('weatherAppHistory')
    },
  },
})

export const { addCity, clearHistory } = searchHistorySlice.actions
export default searchHistorySlice.reducer

