import dayjs from 'dayjs';
import { IDateProvider } from '../models/date-provider-model';

class DayJSDateProvider implements IDateProvider {
  async getNow(): Promise<Date> {
    return dayjs().toDate();
  }

  async addDays(date: Date, days: number): Promise<Date> {
    return dayjs(date).add(days, 'days').toDate();
  }

  async addHours(date: Date, hours: number): Promise<Date> {
    return dayjs(date).add(hours, 'hours').toDate();
  }

  async isBefore(date: Date, dateToCompare: Date): Promise<boolean> {
    return dayjs(date).isBefore(dateToCompare);
  }
}

export { DayJSDateProvider };
