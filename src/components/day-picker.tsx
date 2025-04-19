import 'react-day-picker/style.css'

import { IconButton, Stack, Table, Text } from '@chakra-ui/react'
import { ClassNames } from '@emotion/react'
import { DayPicker } from 'react-day-picker'
import { ptBR } from 'react-day-picker/locale'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { Button } from '@/components/ui/button'
import { formatDate } from '@/utils/dayjs'

type DatePickerProps = React.ComponentProps<typeof DayPicker>

export function DatePicker({ ...props }: DatePickerProps) {
  return (
    <ClassNames>
      {({ css }) => (
        <DayPicker
          components={{
            PreviousMonthButton: (props) => (
              <IconButton
                onClick={props.onClick}
                variant="ghost"
                color="zinc.900"
                aria-label="Previus Month Button"
                _hover={{
                  color: 'purple.950',
                  backgroundColor: 'purple.100',
                }}
              >
                <FiChevronLeft />
              </IconButton>
            ),
            NextMonthButton: (props) => (
              <IconButton
                onClick={props.onClick}
                variant="ghost"
                color="zinc.900"
                aria-label="Next Month Button"
                _hover={{
                  color: 'purple.950',
                  backgroundColor: 'purple.100',
                }}
              >
                <FiChevronRight />
              </IconButton>
            ),
            MonthCaption: (props) => (
              <Stack
                height="11"
                paddingX="3"
                justifyContent="center"
                {...props}
              >
                <Text fontSize="md" fontWeight="bold" color="zinc.900">
                  {formatDate(
                    props.calendarMonth.date,
                    'MMMM [de] YYYY'
                  ).replace(/\b\w/, (char) => char.toUpperCase())}
                </Text>
              </Stack>
            ),
            MonthGrid: (props) => (
              <Table.Root {...props}>{props.children}</Table.Root>
            ),
            Weekday: (props) => (
              <Table.Cell fontWeight="medium" color="zinc.600" border="none">
                {props.children
                  ?.toString()
                  .replace(/\b\w/, (char) => char.toUpperCase())}
              </Table.Cell>
            ),
            Day: (props) => (
              <Table.Cell
                fontWeight="medium"
                color="zinc.900"
                border="none"
                padding="0"
                {...props}
              >
                {props.children}
              </Table.Cell>
            ),
            DayButton: (props) => (
              <Button fontWeight="medium" border="none" {...props}>
                {props.children}
              </Button>
            ),
          }}
          classNames={{
            day: css({
              ':hover:not([aria-selected="true"]) > button': {
                backgroundColor: 'hsl(262, 100%, 95%)',
                color: 'hsl(269, 100%, 23%)',
              },
            }),
            today: css({
              button: {
                color: 'hsl(269, 100%, 23%)',
                backgroundColor: 'hsl(262, 100%, 95%)',
              },
            }),
            selected: css({
              border: 'transparent',
              color: 'hsl(269, 100%, 23%)',

              '&[aria-selected="true"] > button': props.mode === 'single' && {
                backgroundColor: 'hsl(273, 100%, 54%)',
                color: 'hsl(262, 100%, 95%)',
              },
            }),
            range_start: css({
              borderTopLeftRadius: '0.375rem',
              borderBottomLeftRadius: '0.375rem',
              backgroundColor: 'hsl(262, 100%, 95%)',
              button: {
                backgroundColor: 'hsl(273, 100%, 54%)',
                color: 'hsl(262, 100%, 95%)',
              },
            }),
            range_middle: css({
              backgroundColor: 'hsl(262, 100%, 95%)',
            }),
            range_end: css({
              background:
                'linear-gradient(90deg, hsl(262, 100%, 95%) 50%, transparent 50%)',
              button: {
                backgroundColor: 'hsl(273, 100%, 54%)',
                color: 'hsl(262, 100%, 95%)',
              },
            }),
            disabled: css({
              pointerEvents: 'none',
            }),
          }}
          locale={ptBR}
          disabled={{ dayOfWeek: [0, 6] }}
          {...props}
        />
      )}
    </ClassNames>
  )
}
