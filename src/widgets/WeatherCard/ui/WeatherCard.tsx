import { Box, Card, CardBody, VStack, HStack, Text, Heading } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/app/store'
import { formatTemperature, formatWindSpeed, getWeatherIcon } from '@/shared/lib/utils'
import type { CurrentWeather } from '@/entities/weather/model/types'

interface WeatherCardProps {
  weather: CurrentWeather
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const { t } = useTranslation()
  const { temperatureUnit, windSpeedUnit } = useAppSelector((state) => state.settings)

  return (
    <Card>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between">
            <Box fontSize="6xl">{getWeatherIcon(weather.weatherCode)}</Box>
            <VStack align="flex-end">
              <Heading size="2xl">{formatTemperature(weather.temperature, temperatureUnit)}</Heading>
              <Text fontSize="sm" color="gray.500">
                {t('weather.current')}
              </Text>
            </VStack>
          </HStack>

          <HStack justify="space-around" pt={4} borderTop="1px" borderColor="gray.200">
            <VStack>
              <Text fontSize="sm" color="gray.500">
                {t('weather.humidity')}
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                {weather.humidity}%
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="sm" color="gray.500">
                {t('weather.windSpeed')}
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                {formatWindSpeed(weather.windSpeed, windSpeedUnit)}
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="sm" color="gray.500">
                {t('weather.precipitation')}
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                {weather.precipitation}mm
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  )
}

