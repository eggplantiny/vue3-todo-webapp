import moment, { Moment } from 'moment'

export function dateString (date: Date | string | Moment, format: string = 'YYYY년 MM월 DD일 hh시 mm분') {
  return moment(date).format(format)
}
