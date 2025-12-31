import { Box, Card, CardBody, VStack, HStack, Text, Heading, SimpleGrid } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/app/store'
import { formatTemperature, formatTime, getWeatherIcon } from '@/shared/lib/utils'
import type { HourlyForecast } from '@/entities/weather/model/types'

interface HourlyForecastProps {
  forecast: HourlyForecast
}

export function HourlyForecast({ forecast }: HourlyForecastProps) {
  const { t } = useTranslation()
  const { temperatureUnit } = useAppSelector((state) => state.settings)
  const locale = useAppSelector((state) => state.settings.language)

  return (
    <Card>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <Heading size="md">{t('weather.hourly')}</Heading>
          <Box overflowX="auto">
            <HStack spacing={4} minW="max-content">
              {forecast.time.map((time, index) => (
                <VStack
                  key={index}
                  minW="80px"
                  p={3}
                  borderRadius="md"
                  bg="gray.50"
                  _dark={{ bg: 'gray.700' }}
                >
                  <Text fontSize="sm" fontWeight="medium">
                    {formatTime(time, locale)}
                  </Text>
                  <Text fontSize="2xl">{getWeatherIcon(forecast.weatherCode[index])}</Text>
                  <Text fontSize="sm" fontWeight="bold">
                    {formatTemperature(forecast.temperature[index], temperatureUnit)}
                  </Text>
                </VStack>
              ))}
            </HStack>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  )
}

