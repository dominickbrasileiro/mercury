interface IDateProvider {
  getNow(): Promise<Date>;
  addDays(date: Date, days: number): Promise<Date>;
  isBefore(date: Date, dateToCompare: Date): Promise<boolean>;
}

export { IDateProvider };
