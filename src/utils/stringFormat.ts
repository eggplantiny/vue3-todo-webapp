import moment, { Moment } from 'moment'

export function dateString (date: Date | string | Moment, format: string = 'YYYY MMMM D hh:mm') {
  return moment(date).format(format)
}
