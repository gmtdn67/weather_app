import { memo } from 'react'
import { VStack, Text, useColorModeValue } from '@chakra-ui/react'
import { formatTemperature, formatTime, getWeatherIcon } from '@/shared/lib/utils'

interface HourlyForecastItemProps {
  time: string
  temperature: number
  weatherCode: number
  temperatureUnit: 'celsius' | 'fahrenheit'
  locale: string
}

export const HourlyForecastItem = memo(function HourlyForecastItem({
  time,
  temperature,
  weatherCode,
  temperatureUnit,
  locale,
}: HourlyForecastItemProps) {
  const bgColor = useColorModeValue('gray.50', 'gray.700')

  return (
    <VStack minW="80px" p={3} borderRadius="md" bg={bgColor}>
      <Text fontSize="sm" fontWeight="medium">
        {formatTime(time, locale)}
      </Text>
      <Text fontSize="2xl">{getWeatherIcon(weatherCode)}</Text>
      <Text fontSize="sm" fontWeight="bold">
        {formatTemperature(temperature, temperatureUnit)}
      </Text>
    </VStack>
  )
})

