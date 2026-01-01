import { memo, useCallback } from 'react'
import { ListItem, Button, VStack, Text } from '@chakra-ui/react'
import type { City } from '@/entities/city/model/types'

interface SearchHistoryItemProps {
  city: City
  onSelect: (city: City) => void
}

export const SearchHistoryItem = memo(function SearchHistoryItem({
  city,
  onSelect,
}: SearchHistoryItemProps) {
  const handleClick = useCallback(() => {
    onSelect(city)
  }, [city, onSelect])

  return (
    <ListItem>
      <Button variant="ghost" w="100%" justifyContent="flex-start" onClick={handleClick}>
        <VStack align="flex-start" spacing={0}>
          <Text fontWeight="medium">{city.name}</Text>
          <Text fontSize="xs" color="gray.500">
            {city.country}
          </Text>
        </VStack>
      </Button>
    </ListItem>
  )
})

