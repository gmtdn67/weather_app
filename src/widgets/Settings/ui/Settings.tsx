import {
  Box,
  Card,
  CardBody,
  VStack,
  Heading,
  HStack,
  Button,
  Select,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { setTemperatureUnit, setWindSpeedUnit, setLanguage, setTheme } from '@/features/settings/model/settingsSlice'
import { useColorMode } from '@chakra-ui/react'
import i18n from 'i18next'

export function Settings() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const settings = useAppSelector((state) => state.settings)
  const { colorMode, toggleColorMode, setColorMode } = useColorMode()

  const handleLanguageChange = (lang: 'ru' | 'en') => {
    dispatch(setLanguage(lang))
    i18n.changeLanguage(lang)
  }

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    dispatch(setTheme(theme))
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setColorMode(prefersDark ? 'dark' : 'light')
    } else {
      setColorMode(theme)
    }
  }

  return (
    <Card>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <Heading size="md">Настройки</Heading>

          <Box>
            <Text fontSize="sm" mb={2}>
              {t('settings.temperature')}
            </Text>
            <HStack>
              <Button
                size="sm"
                colorScheme={settings.temperatureUnit === 'celsius' ? 'blue' : 'gray'}
                onClick={() => dispatch(setTemperatureUnit('celsius'))}
              >
                °C
              </Button>
              <Button
                size="sm"
                colorScheme={settings.temperatureUnit === 'fahrenheit' ? 'blue' : 'gray'}
                onClick={() => dispatch(setTemperatureUnit('fahrenheit'))}
              >
                °F
              </Button>
            </HStack>
          </Box>

          <Box>
            <Text fontSize="sm" mb={2}>
              {t('settings.windSpeed')}
            </Text>
            <HStack>
              <Button
                size="sm"
                colorScheme={settings.windSpeedUnit === 'kmh' ? 'blue' : 'gray'}
                onClick={() => dispatch(setWindSpeedUnit('kmh'))}
              >
                {t('settings.kmh')}
              </Button>
              <Button
                size="sm"
                colorScheme={settings.windSpeedUnit === 'ms' ? 'blue' : 'gray'}
                onClick={() => dispatch(setWindSpeedUnit('ms'))}
              >
                {t('settings.ms')}
              </Button>
            </HStack>
          </Box>

          <Box>
            <Text fontSize="sm" mb={2}>
              {t('settings.language')}
            </Text>
            <Select
              value={settings.language}
              onChange={(e) => handleLanguageChange(e.target.value as 'ru' | 'en')}
            >
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </Select>
          </Box>

          <Box>
            <Text fontSize="sm" mb={2}>
              {t('settings.theme')}
            </Text>
            <HStack>
              <Button
                size="sm"
                colorScheme={settings.theme === 'light' ? 'blue' : 'gray'}
                onClick={() => handleThemeChange('light')}
              >
                {t('settings.light')}
              </Button>
              <Button
                size="sm"
                colorScheme={settings.theme === 'dark' ? 'blue' : 'gray'}
                onClick={() => handleThemeChange('dark')}
              >
              {t('settings.dark')}
              </Button>
              <Button
                size="sm"
                colorScheme={settings.theme === 'system' ? 'blue' : 'gray'}
                onClick={() => handleThemeChange('system')}
              >
               {t('settings.system')}
              </Button>
            </HStack>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  )
}

