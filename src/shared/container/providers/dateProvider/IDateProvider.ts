interface IDateProvider {
  compare(startDate: Date, endDate: Date): Promise<number>
  compareInDays(startDate: Date, endDate: Date): Promise<number>
  convertToUTC(date: Date): Promise<string>
  addDays(days: number): Promise<Date>
  addHours(hours: number): Promise<Date>
  isBefore(startDate: Date, endDate: Date): Promise<boolean>
}

export { IDateProvider }
