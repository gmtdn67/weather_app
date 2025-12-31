import { Box } from '@chakra-ui/react'
import { HomePage } from '@/pages/HomePage'
import { ResultsPage } from '@/pages/ResultsPage'
import { useAppSelector } from './store'

export function App() {
  const selectedCity = useAppSelector((state) => state.weather.selectedCity)

  return (
    <Box minH="100vh">
      {selectedCity ? <ResultsPage /> : <HomePage />}
    </Box>
  )
}

