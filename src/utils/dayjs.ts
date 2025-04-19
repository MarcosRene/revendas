import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)
export function formatDate(value: string | Date | undefined, format?: string) {
  return dayjs(value).format(format || 'DD/MM/YYYY')
}

export function formatDateTime(value: string | Date | undefined) {
  return dayjs(value).format('DD/MM/YYYY [às] HH:mm')
}

export function formatTimerShort(value: number) {
  return dayjs.duration(value, 'seconds').format('mm:ss')
}
