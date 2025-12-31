import { Box, Card, CardBody, VStack, HStack, Text, Heading, SimpleGrid } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/app/store'
import { formatTemperature, formatDate, getWeatherIcon } from '@/shared/lib/utils'
import type { DailyForecast } from '@/entities/weather/model/types'

interface DailyForecastProps {
  forecast: DailyForecast
}

export function DailyForecast({ forecast }: DailyForecastProps) {
  const { t } = useTranslation()
  const { temperatureUnit } = useAppSelector((state) => state.settings)
  const locale = useAppSelector((state) => state.settings.language)

  return (
    <Card>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <Heading size="md">{t('weather.daily')}</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {forecast.time.map((time, index) => (
              <HStack
                key={index}
                p={4}
                borderRadius="md"
                bg="gray.50"
                _dark={{ bg: 'gray.700' }}
                justify="space-between"
              >
                <VStack align="flex-start" spacing={1}>
                  <Text fontSize="sm" fontWeight="medium">
                    {formatDate(time, locale)}
                  </Text>
                  <HStack>
                    <Text fontSize="2xl">{getWeatherIcon(forecast.weatherCode[index])}</Text>
                    <VStack align="flex-start" spacing={0}>
                      <Text fontSize="sm">
                        {formatTemperature(forecast.temperatureMax[index], temperatureUnit)}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {formatTemperature(forecast.temperatureMin[index], temperatureUnit)}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
                {forecast.precipitationSum[index] > 0 && (
                  <Text fontSize="xs" color="blue.500">
                    {forecast.precipitationSum[index]}mm
                  </Text>
                )}
              </HStack>
            ))}
          </SimpleGrid>
        </VStack>
      </CardBody>
    </Card>
  )
}

