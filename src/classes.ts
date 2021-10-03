import { DateDecimalInterface } from './types';

class DateDecimal implements DateDecimalInterface {
  date: Date;

  constructor(dateString?: string) {
    if (dateString) {
      this.date = new Date(dateString);
    } else {
      this.date = new Date();
    }
  }
}

export { DateDecimal };
