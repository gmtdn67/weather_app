import { useState } from 'react'
import { Button, useToast } from '@chakra-ui/react'
import { FaLocationArrow } from 'react-icons/fa'
import { useAppDispatch } from '@/app/store'
import { setSelectedCity } from '@/entities/weather/model/weatherSlice'
import { addCity } from '@/features/search/model/searchHistorySlice'
import type { City } from '@/entities/city/model/types'

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
          // Используем обратное геокодирование для получения названия города
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
          )
          const data = await response.json()

          const city: City = {
            id: Date.now(),
            name: data.address?.city || data.address?.town || data.address?.village || 'Unknown',
            country: data.address?.country || '',
            latitude,
            longitude,
            displayName: data.display_name,
          }

          dispatch(setSelectedCity(city))
          dispatch(addCity(city))
          setIsLoading(false)
        } catch (error) {
          toast({
            title: 'Ошибка при определении местоположения',
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

