import { memo, useMemo } from 'react'
import { Box, Card, CardBody, VStack, HStack, Heading } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/app/store'
import { HourlyForecastItem } from './HourlyForecastItem'
import type { HourlyForecast } from '@/entities/weather/model/types'

interface HourlyForecastProps {
  forecast: HourlyForecast
}

export const HourlyForecast = memo(function HourlyForecast({ forecast }: HourlyForecastProps) {
  const { t } = useTranslation()
  const { temperatureUnit } = useAppSelector((state) => state.settings)
  const locale = useAppSelector((state) => state.settings.language)

  // Мемоизируем массив элементов для предотвращения лишних ререндеров
  const hourlyItems = useMemo(
    () =>
      forecast.time.map((time, index) => (
        <HourlyForecastItem
          key={`${time}-${index}`}
          time={time}
          temperature={forecast.temperature[index]}
          weatherCode={forecast.weatherCode[index]}
          temperatureUnit={temperatureUnit}
          locale={locale}
        />
      )),
    [forecast.time, forecast.temperature, forecast.weatherCode, temperatureUnit, locale]
  )

  return (
    <Card>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <Heading size="md">{t('weather.hourly')}</Heading>
          <Box overflowX="auto">
            <HStack spacing={4} minW="max-content">
              {hourlyItems}
            </HStack>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  )
})

