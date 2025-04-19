import { forwardRef } from 'react'
import { PatternFormat, type PatternFormatProps } from 'react-number-format'

interface MaskedInputProps extends PatternFormatProps {}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  (props, ref) => {
    return <PatternFormat getInputRef={ref} {...props} />
  }
)
