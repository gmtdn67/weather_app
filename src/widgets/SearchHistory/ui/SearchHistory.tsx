import { memo, useCallback, useMemo } from 'react'
import { Card, CardBody, VStack, Heading, List, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { setSelectedCity } from '@/entities/weather/model/weatherSlice'
import { addCity } from '@/features/search/model/searchHistorySlice'
import { SearchHistoryItem } from './SearchHistoryItem'

export const SearchHistory = memo(function SearchHistory() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const history = useAppSelector((state) => state.searchHistory.cities)

  const handleSelectCity = useCallback(
    (city: typeof history[0]) => {
      dispatch(setSelectedCity(city))
      dispatch(addCity(city))
    },
    [dispatch]
  )

  // Мемоизируем список элементов
  const historyItems = useMemo(
    () =>
      history.map((city) => (
        <SearchHistoryItem key={city.id} city={city} onSelect={handleSelectCity} />
      )),
    [history, handleSelectCity]
  )

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
          <List spacing={2}>{historyItems}</List>
        </VStack>
      </CardBody>
    </Card>
  )
})

