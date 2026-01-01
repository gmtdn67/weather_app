import { memo } from 'react'
import { VStack, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { formatTemperature, formatDate, getWeatherIcon } from '@/shared/lib/utils'

interface DailyForecastItemProps {
  time: string
  temperatureMax: number
  temperatureMin: number
  weatherCode: number
  precipitationSum: number
  temperatureUnit: 'celsius' | 'fahrenheit'
  locale: string
}

export const DailyForecastItem = memo(function DailyForecastItem({
  time,
  temperatureMax,
  temperatureMin,
  weatherCode,
  precipitationSum,
  temperatureUnit,
  locale,
}: DailyForecastItemProps) {
  const bgColor = useColorModeValue('gray.50', 'gray.700')

  return (
    <HStack
      p={4}
      borderRadius="md"
      bg={bgColor}
      justify="space-between"
    >
      <VStack align="flex-start" spacing={1}>
        <Text fontSize="sm" fontWeight="medium">
          {formatDate(time, locale)}
        </Text>
        <HStack>
          <Text fontSize="2xl">{getWeatherIcon(weatherCode)}</Text>
          <VStack align="flex-start" spacing={0}>
            <Text fontSize="sm">
              {formatTemperature(temperatureMax, temperatureUnit)}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {formatTemperature(temperatureMin, temperatureUnit)}
            </Text>
          </VStack>
        </HStack>
      </VStack>
      {precipitationSum > 0 && (
        <Text fontSize="xs" color="blue.500">
          {precipitationSum}mm
        </Text>
      )}
    </HStack>
  )
})

