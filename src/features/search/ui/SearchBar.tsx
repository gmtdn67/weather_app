import { useState, useEffect } from 'react'
import {
  Box,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  VStack,
  List,
  ListItem,
  useColorModeValue,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useLazySearchCityQuery } from '@/entities/city/api/geocodingApi'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { setSelectedCity } from '@/entities/weather/model/weatherSlice'
import { addCity } from '../model/searchHistorySlice'
import type { City } from '@/entities/city/model/types'

export function SearchBar() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [triggerSearch, { data: cities, isLoading }] = useLazySearchCityQuery()
  const dispatch = useAppDispatch()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')

  useEffect(() => {
    if (searchQuery.length > 2) {
      const timeoutId = setTimeout(() => {
        triggerSearch(searchQuery)
        setShowSuggestions(true)
      }, 300)
      return () => clearTimeout(timeoutId)
    } else {
      setShowSuggestions(false)
    }
  }, [searchQuery, triggerSearch])

  const handleSelectCity = (city: City) => {
    dispatch(setSelectedCity(city))
    dispatch(addCity(city))
    setSearchQuery('')
    setShowSuggestions(false)
  }

  const handleSearch = () => {
    if (searchQuery.length > 2) {
      triggerSearch(searchQuery)
      setShowSuggestions(true)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Box position="relative" w="100%" maxW="600px" mx="auto">
      <InputGroup size="lg" gap={"5px"}>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('search.placeholder')}
          bg={bgColor}
          borderColor={borderColor}
          _focus={{ borderColor: 'blue.500' }}
        />
        {/* <InputRightElement width="4.5rem"> */}
          <Button
            h="3rem"
            w="120px"
            size="sm"
            onClick={handleSearch}
            isLoading={isLoading}
            colorScheme="blue"
          >
            {t('search.button')}
          </Button>
{/*         </InputRightElement> */}
      </InputGroup>

      {showSuggestions && cities && cities.length > 0 && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          mt={2}
          bg={bgColor}
          border="1px"
          borderColor={borderColor}
          borderRadius="md"
          boxShadow="lg"
          zIndex={10}
          maxH="300px"
          overflowY="auto"
        >
          <List spacing={0}>
            {cities.map((city) => (
              <ListItem
                key={city.id}
                p={3}
                cursor="pointer"
                _hover={{ bg: hoverBg }}
                onClick={() => handleSelectCity(city)}
                borderBottom="1px"
                borderColor={borderColor}
              >
                <Box fontWeight="medium">{city.name}</Box>
                <Box fontSize="sm" color="gray.500">
                  {city.country}
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  )
}

