import { motion, AnimatePresence } from 'framer-motion'
import { Box, Container, VStack, Button, Heading, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { clearSelectedCity } from '@/entities/weather/model/weatherSlice'
import { useGetWeatherQuery } from '@/entities/weather/api/weatherApi'
import { WeatherCard } from '@/widgets/WeatherCard/ui/WeatherCard'
import { HourlyForecast } from '@/widgets/HourlyForecast/ui/HourlyForecast'
import { DailyForecast } from '@/widgets/DailyForecast/ui/DailyForecast'
import { Loader } from '@/shared/ui/Loader'
import { ErrorMessage } from '@/shared/ui/ErrorMessage'

const pageVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
}

const transition = {
  duration: 0.5,
  ease: 'easeInOut',
}

export function ResultsPage() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const selectedCity = useAppSelector((state) => state.weather.selectedCity)

  const { data: weather, isLoading, error } = useGetWeatherQuery(
    {
      latitude: selectedCity?.latitude || 0,
      longitude: selectedCity?.longitude || 0,
    },
    {
      skip: !selectedCity,
    }
  )

  const handleBack = () => {
    dispatch(clearSelectedCity())
  }

  if (!selectedCity) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
      >
        <Box minH="100vh" py={8} px={4}>
          <Container maxW="container.xl">
            <VStack spacing={6} align="stretch">
              <HStack justify="space-between" align="center">
                <VStack align="flex-start" spacing={1}>
                  <Heading size="xl">{selectedCity.name}</Heading>
                  <Text color="gray.500">{selectedCity.country}</Text>
                </VStack>
                <Button onClick={handleBack} colorScheme="blue" variant="outline">
                  {t('weather.backToSearch')}
                </Button>
              </HStack>

              {isLoading && <Loader />}

              {error && (
                <ErrorMessage
                  title={t('search.notFound')}
                  message="Не удалось загрузить данные о погоде. Попробуйте позже."
                />
              )}

              {weather && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <VStack spacing={6} align="stretch">
                    <WeatherCard weather={weather.current} />
                    <HourlyForecast forecast={weather.hourly} />
                    <DailyForecast forecast={weather.daily} />
                  </VStack>
                </motion.div>
              )}
            </VStack>
          </Container>
        </Box>
      </motion.div>
    </AnimatePresence>
  )
}

