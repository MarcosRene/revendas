import { Input, type InputProps } from '@chakra-ui/react'
import * as React from 'react'

export interface TextInputProps extends InputProps {}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(props, ref) {
    return (
      <Input
        ref={ref}
        borderRadius="l3"
        colorPalette="zinc"
        _placeholder={{ color: 'zinc.400' }}
        {...props}
      />
    )
  }
)
