import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '../IDateProvider'

dayjs.extend(utc)

class DayJsDateProvider implements IDateProvider {
  async compare(startDate: Date, endDate: Date): Promise<number> {
    const endDateUTC = await this.convertToUTC(endDate)
    const startDateUTC = await this.convertToUTC(startDate)
    return dayjs(endDateUTC).diff(startDateUTC, 'hours')
  }

  async convertToUTC(date: Date): Promise<string> {
    return dayjs(date).utc().local().format()
  }

  async compareInDays(startDate: Date, endDate: Date): Promise<number> {
    const endDateUTC = await this.convertToUTC(endDate)
    const startDateUTC = await this.convertToUTC(startDate)
    return dayjs(endDateUTC).diff(startDateUTC, 'days')
  }

  async addDays(days: number): Promise<Date> {
    return dayjs().add(days, 'days').toDate()
  }

  async addHours(hours: number): Promise<Date> {
    return dayjs().add(hours, 'hours').toDate()
  }

  async isBefore(startDate: Date, endDate: Date): Promise<boolean> {
    return dayjs(startDate).isBefore(endDate)
  }
}

export { DayJsDateProvider }
