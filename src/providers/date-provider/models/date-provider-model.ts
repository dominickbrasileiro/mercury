interface IDateProvider {
  getNow(): Promise<Date>;
  addDays(date: Date, days: number): Promise<Date>;
}

export { IDateProvider };
