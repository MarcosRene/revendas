import { type PropsBase, type PropsRange } from 'react-day-picker'
import { FiCalendar } from 'react-icons/fi'

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

type DateRangeProps = Omit<PropsRange, 'mode'> &
  Omit<PropsBase, 'mode'> & {
    placeholder?: string
    fullWidth?: boolean
  }

export function DateRange({
  selected,
  onSelect,
  placeholder,
  fullWidth = false,
}: DateRangeProps) {
  return (
    <PopoverRoot
      lazyMount
      unmountOnExit
      positioning={{ placement: 'bottom-start' }}
    >
      <PopoverTrigger asChild>
        <InputGroup
          width={fullWidth ? 'full' : 'max-content'}
          endElement={<FiCalendar />}
        >
          <TextInput
            placeholder={placeholder}
            value={
              selected
                ? `${formatDate(selected.from, 'DD/MM/YYYY [-] ')}${formatDate(selected.to)}`
                : ''
            }
            readOnly
          />
        </InputGroup>
      </PopoverTrigger>

      <PopoverContent width="fit-content">
        <PopoverArrow />
        <PopoverBody padding="4">
          <DatePicker mode="range" selected={selected} onSelect={onSelect} />
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}
