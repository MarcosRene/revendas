import { Box, Flex, Separator } from '@chakra-ui/react'
import { type PropsBase, type PropsSingle } from 'react-day-picker'
import { FiCalendar, FiXCircle } from 'react-icons/fi'

import { DatePicker } from '@/components/day-picker'
import { TextInput } from '@/components/text-input'
import { InputGroup } from '@/components/ui/input-group'
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from '@/components/ui/popover'
import { formatDate } from '@/utils/dayjs'

type DateSingleProps = Omit<PropsSingle, 'mode'> &
  Omit<PropsBase, 'mode'> & {
    onClearValue?: () => void
    placeholder?: string
    fullWidth?: boolean
    clearable?: boolean
  }

export function DateSingle({
  selected,
  onSelect,
  onClearValue,
  placeholder,
  fullWidth = false,
  clearable = false,
  ...props
}: DateSingleProps) {
  return (
    <PopoverRoot
      lazyMount
      unmountOnExit
      positioning={{ placement: 'bottom-start' }}
    >
      <PopoverTrigger asChild>
        <InputGroup
          width={fullWidth ? 'full' : 'max-content'}
          endElement={
            <Flex gap="2" alignItems="center">
              {clearable && (
                <Flex gap="2" alignItems="center">
                  <Box
                    onClick={onClearValue}
                    cursor="pointer"
                    scale={1}
                    transitionProperty="all"
                    transitionDuration="fast"
                    transitionTimingFunction="ease-in-out"
                    _hover={{
                      scale: '1.1',
                    }}
                  >
                    <FiXCircle />
                  </Box>

                  <Separator height="4" orientation="vertical" />
                </Flex>
              )}
              <FiCalendar />
            </Flex>
          }
        >
          <TextInput
            placeholder={placeholder}
            value={selected ? formatDate(selected) : ''}
            readOnly
          />
        </InputGroup>
      </PopoverTrigger>

      <PopoverContent width="fit-content">
        <PopoverArrow />
        <PopoverBody>
          <DatePicker
            mode="single"
            selected={selected}
            onSelect={onSelect}
            {...props}
          />
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}
