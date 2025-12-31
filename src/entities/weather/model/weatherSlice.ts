import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { City } from '@/entities/city/model/types'

interface WeatherState {
  selectedCity: City | null
}

const initialState: WeatherState = {
  selectedCity: null,
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setSelectedCity: (state, action: PayloadAction<City | null>) => {
      state.selectedCity = action.payload
    },
    clearSelectedCity: (state) => {
      state.selectedCity = null
    },
  },
})

export const { setSelectedCity, clearSelectedCity } = weatherSlice.actions
export default weatherSlice.reducer

