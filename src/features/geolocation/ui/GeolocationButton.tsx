import { useState } from 'react'
import { Button, useToast } from '@chakra-ui/react'
import { FaLocationArrow } from 'react-icons/fa'
import { useAppDispatch } from '@/app/store'
import { setSelectedCity } from '@/entities/weather/model/weatherSlice'
import { addCity } from '@/features/search/model/searchHistorySlice'
import type { City } from '@/entities/city/model/types'
import type { NominatimReverseGeocodingResponse } from '@/entities/city/api/types'

export function GeolocationButton() {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const dispatch = useAppDispatch()

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: 'Геолокация не поддерживается',
        status: 'error',
        duration: 3000,
      })
      return
    }

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords

          // Валидация координат
          if (isNaN(latitude) || isNaN(longitude)) {
            throw new Error('Invalid coordinates')
          }

          // Используем обратное геокодирование для получения названия города
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
          )

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const data: NominatimReverseGeocodingResponse = await response.json()

          // Валидация ответа
          if (!data.address || !data.display_name) {
            throw new Error('Invalid response from geocoding API')
          }

          const name =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.municipality ||
            'Unknown'

          const city: City = {
            id: data.place_id || Date.now(),
            name,
            country: data.address.country || '',
            latitude,
            longitude,
            displayName: data.display_name,
          }

          dispatch(setSelectedCity(city))
          dispatch(addCity(city))
          setIsLoading(false)
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Unknown error occurred'
          toast({
            title: 'Ошибка при определении местоположения',
            description: errorMessage,
            status: 'error',
            duration: 3000,
          })
          setIsLoading(false)
        }
      },
      (error) => {
        toast({
          title: 'Не удалось получить местоположение',
          description: error.message,
          status: 'error',
          duration: 3000,
        })
        setIsLoading(false)
      }
    )
  }

  return (
    <Button
      leftIcon={<FaLocationArrow />}
      onClick={handleGeolocation}
      isLoading={isLoading}
      colorScheme="blue"
      variant="outline"
    >
      Определить местоположение
    </Button>
  )
}

