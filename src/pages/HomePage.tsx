import { motion } from 'framer-motion'
import { Box, VStack, Container, Heading, Text } from '@chakra-ui/react'
import { SearchBar } from '@/features/search/ui/SearchBar'
import { GeolocationButton } from '@/features/geolocation/ui/GeolocationButton'
import { SearchHistory } from '@/widgets/SearchHistory/ui/SearchHistory'
import { Settings } from '@/widgets/Settings/ui/Settings'
import { useTranslation } from 'react-i18next'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function HomePage() {

  const {t} = useTranslation()

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, blue.400, purple.500)"
      py={10}
      px={4}
    >
      <Container maxW="container.lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <VStack spacing={8} align="stretch">
            <motion.div variants={itemVariants}>
              <VStack spacing={4} textAlign="center" color="white" mb={8}>
                <Heading size="2xl" fontWeight="bold">
                  Weather App by gmt9n
                </Heading>
                <Text fontSize="lg" opacity={0.9}>
                  {t('search.description')}
                </Text>
              </VStack>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SearchBar />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Box display="flex" justifyContent="center">
                <GeolocationButton />
              </Box>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SearchHistory />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Settings />
            </motion.div>
          </VStack>
        </motion.div>
      </Container>
    </Box>
  )
}

