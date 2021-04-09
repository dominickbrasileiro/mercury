import dayjs from 'dayjs';
import { IDateProvider } from '../models/date-provider-model';

class DayJSDateProvider implements IDateProvider {
  async getNow(): Promise<Date> {
    return dayjs().toDate();
  }

  async addDays(date: Date, days: number): Promise<Date> {
    return dayjs(date).add(days, 'days').toDate();
  }
}

export { DayJSDateProvider };
