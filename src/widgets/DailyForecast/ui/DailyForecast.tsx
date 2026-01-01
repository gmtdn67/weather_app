import { memo, useMemo } from 'react'
import { Card, CardBody, VStack, Heading, SimpleGrid } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/app/store'
import { DailyForecastItem } from './DailyForecastItem'
import type { DailyForecast } from '@/entities/weather/model/types'

interface DailyForecastProps {
  forecast: DailyForecast
}

export const DailyForecast = memo(function DailyForecast({ forecast }: DailyForecastProps) {
  const { t } = useTranslation()
  const { temperatureUnit } = useAppSelector((state) => state.settings)
  const locale = useAppSelector((state) => state.settings.language)

  // Мемоизируем массив элементов для предотвращения лишних ререндеров
  const dailyItems = useMemo(
    () =>
      forecast.time.map((time, index) => (
        <DailyForecastItem
          key={`${time}-${index}`}
          time={time}
          temperatureMax={forecast.temperatureMax[index]}
          temperatureMin={forecast.temperatureMin[index]}
          weatherCode={forecast.weatherCode[index]}
          precipitationSum={forecast.precipitationSum[index]}
          temperatureUnit={temperatureUnit}
          locale={locale}
        />
      )),
    [
      forecast.time,
      forecast.temperatureMax,
      forecast.temperatureMin,
      forecast.weatherCode,
      forecast.precipitationSum,
      temperatureUnit,
      locale,
    ]
  )

  return (
    <Card>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <Heading size="md">{t('weather.daily')}</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {dailyItems}
          </SimpleGrid>
        </VStack>
      </CardBody>
    </Card>
  )
})

