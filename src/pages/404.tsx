import { Image, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router'

import pageNotFound from '@/assets/images/page-not-found.svg'

export function NotFound() {
  return (
    <VStack height="vh" alignItems="center" justifyContent="center" gap="2">
      <Image src={pageNotFound} alt="Página 404; Número 404" maxWidth="md" />

      <Text fontSize="4xl" fontWeight="bold">
        Página não encontrada
      </Text>
      <Text>
        Voltar para a{' '}
        <Text
          asChild
          as="span"
          fontWeight="bold"
          textDecoration="underline"
          color="purple.700"
        >
          <Link to="/">página inicial</Link>
        </Text>
      </Text>
    </VStack>
  )
}
