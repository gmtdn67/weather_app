import { Spinner, Box } from '@chakra-ui/react'

export function Loader() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minH="200px">
      <Spinner size="xl" color="blue.500" thickness="4px" />
    </Box>
  )
}

