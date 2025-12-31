import { configureStore } from '@reduxjs/toolkit'
import { weatherApi } from '@/entities/weather/api/weatherApi'
import { geocodingApi } from '@/entities/city/api/geocodingApi'
import weatherReducer from '@/entities/weather/model/weatherSlice'
import settingsReducer from '@/features/settings/model/settingsSlice'
import searchHistoryReducer from '@/features/search/model/searchHistorySlice'

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    settings: settingsReducer,
    searchHistory: searchHistoryReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [geocodingApi.reducerPath]: geocodingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware, geocodingApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Типизированные хуки
export { useAppDispatch, useAppSelector } from './hooks'

