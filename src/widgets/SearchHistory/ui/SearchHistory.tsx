import { Box, Card, CardBody, VStack, Heading, List, ListItem, Button, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { setSelectedCity } from '@/entities/weather/model/weatherSlice'
import { addCity } from '@/features/search/model/searchHistorySlice'

export function SearchHistory() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const history = useAppSelector((state) => state.searchHistory.cities)

  const handleSelectCity = (city: typeof history[0]) => {
    dispatch(setSelectedCity(city))
    dispatch(addCity(city))
  }

  if (history.length === 0) {
    return (
      <Card>
        <CardBody>
          <Text color="gray.500">{t('history.empty')}</Text>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <Heading size="md">{t('history.title')}</Heading>
          <List spacing={2}>
            {history.map((city) => (
              <ListItem key={city.id}>
                <Button
                  variant="ghost"
                  w="100%"
                  justifyContent="flex-start"
                  onClick={() => handleSelectCity(city)}
                >
                  <VStack align="flex-start" spacing={0}>
                    <Text fontWeight="medium">{city.name}</Text>
                    <Text fontSize="xs" color="gray.500">
                      {city.country}
                    </Text>
                  </VStack>
                </Button>
              </ListItem>
            ))}
          </List>
        </VStack>
      </CardBody>
    </Card>
  )
}

