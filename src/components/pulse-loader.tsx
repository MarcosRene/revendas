import { AbsoluteCenter, Box, HStack } from '@chakra-ui/react'

export function PulseLoader() {
  return (
    <AbsoluteCenter boxSize="100%" zIndex="max">
      <HStack>
        {Array.from({ length: 3 }).map((_, index) => (
          <Box
            key={index}
            width="3"
            height="3"
            bg="purple.600"
            borderRadius="full"
            animation="loader"
            animationDelay={`${index * 0.2}s`}
            zIndex="overlay"
          />
        ))}
      </HStack>
    </AbsoluteCenter>
  )
}
