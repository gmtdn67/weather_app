import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

interface ErrorMessageProps {
  title?: string
  message: string
}

export function ErrorMessage({ title, message }: ErrorMessageProps) {
  return (
    <Alert status="error" borderRadius="md">
      <AlertIcon />
      <AlertTitle mr={2}>{title || 'Ошибка'}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

