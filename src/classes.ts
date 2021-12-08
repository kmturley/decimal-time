import { DateDecimalInterface, DateDecimalFormats } from './types';

class DateDecimal implements DateDecimalInterface {
  date: Date;
  private gregorianDayMs: number = 1000 * 60 * 60 * 24;
  private decimalDayMs: number = 1000 * 100 * 100 * 10;

  constructor(...args: any[]) {
    this.date = new Date(...(args as ConstructorParameters<typeof Date>));
  }

  private formatNum(num: number, prefix: string = '0', prefix2: string = ''): string {
    if (num < 10) {
      return prefix + num;
    } else if (num < 100) {
      return prefix2 + num;
    }
    return String(num);
  }

  private formatDateString(date: number, month: number, year: number, separator: string): string {
    return `${this.formatNum(date)}${separator}${this.formatNum(month)}${separator}${this.formatNum(year)}`;
  }

  private getDecimalMillisecondsElapsed(): number {
    const dateCopy = new Date(this.date.getTime());
    dateCopy.setUTCHours(0, 0, 0, 0);
    return Math.ceil(((this.date.getTime() - dateCopy.getTime()) / this.gregorianDayMs) * this.decimalDayMs);
  }

  /**
   * Day of the year, between 0 and 365
   * 365 for leap years, otherwise 364
   * @returns {number}
   */
  getDayOfYear(): number {
    const dateCopy = new Date(this.date.getTime());
    dateCopy.setUTCMonth(0, 1);
    dateCopy.setUTCHours(0, 0, 0, 0);
    return Math.floor((this.date.getTime() - dateCopy.getTime()) / this.gregorianDayMs);
  }

  /**
   * Decimal day of the month, between 0 and 37
   * 37 for one month in a leap year, otherwise 35 or 36
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate
   * @returns {number}
   */
  getDecimalDate(): number {
    const day: number = this.getDayOfYear();
    let num: number = 0;
    if (day > 36) {
      num += 36;
    }
    if (day > 73) {
      num += 37;
    }
    if (day > 109) {
      num += 36;
    }
    if (day > 146) {
      num += 37;
    }
    if (day > 182) {
      num += 36;
    }
    if (day > 219) {
      num += 37;
    }
    if (day > 255) {
      num += 36;
    }
    if (day > 292) {
      num += 37;
    }
    if (day > 328) {
      num += 36;
    }
    return Math.floor(day - num);
  }

  /**
   * Decimal day of the week, between 0 and 9
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
   * @returns {number}
   */
  getDecimalDay(): number {
    return Math.floor(this.date.getTime() / this.gregorianDayMs) % 10;
  }

  /**
   * Year, between 1000 and 9999
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear
   * @returns {number}
   */
  getDecimalYear(): number {
    return this.date.getUTCFullYear();
  }

  /**
   * Decimal hour, between 0 and 9
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours
   * @returns {number}
   */
  getDecimalHours(): number {
    return Math.floor(this.getDecimalMillisecondsElapsed() / 10000000) || 0;
  }

  /**
   * Decimal milliseconds, between 0 and 999
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMilliseconds
   * @returns {number}
   */
  getDecimalMilliseconds(): number {
    return Math.floor(this.getDecimalMillisecondsElapsed() % 1000) || 0;
  }

  /**
   * Decimal minutes, between 0 and 99
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes
   * @returns {number}
   */
  getDecimalMinutes(): number {
    return Math.floor((this.getDecimalMillisecondsElapsed() % 10000000) / 100000) || 0;
  }

  /**
   * Decimal month, between 0 and 9
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
   * @returns {number}
   */
  getDecimalMonth(): number {
    const day: number = this.getDayOfYear();
    let month: number = 0;
    if (day > 36) {
      month = 1;
    }
    if (day > 73) {
      month = 2;
    }
    if (day > 109) {
      month = 3;
    }
    if (day > 146) {
      month = 4;
    }
    if (day > 182) {
      month = 5;
    }
    if (day > 219) {
      month = 6;
    }
    if (day > 255) {
      month = 7;
    }
    if (day > 292) {
      month = 8;
    }
    if (day > 328) {
      month = 9;
    }
    return Math.floor(month);
  }

  /**
   * Decimal seconds, between 0 and 99
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getSeconds
   * @returns {number}
   */
  getDecimalSeconds(): number {
    return Math.floor((this.getDecimalMillisecondsElapsed() % 100000) / 1000) || 0;
  }

  /**
   * Decimal time, milliseconds since the Unix Epoch
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
   * @returns {number}
   */
  getDecimalTime(): number {
    return Math.floor(this.date.getTime() / this.gregorianDayMs) * this.decimalDayMs;
  }

  /**
   * Decimal date string, returns DD/MM/YYYY or YYYY-MM-DD
   * @returns {string}
   */
  toDecimalDateString(format?: keyof DateDecimalFormats): string {
    if (format === 'ISO')
      return this.formatDateString(
        this.date.getUTCFullYear(),
        this.getDecimalMonth() + 1,
        this.getDecimalDate() + 1,
        '-',
      );
    return this.formatDateString(
      this.getDecimalDate() + 1,
      this.getDecimalMonth() + 1,
      this.date.getUTCFullYear(),
      '/',
    );
  }

  /**
   * Decimal time string, returns HH:MM:SS or THH:MM:SS.000Z
   * @returns {string}
   */
  toDecimalTimeString(format?: keyof DateDecimalFormats): string {
    const timeString: string = this.formatDateString(
      this.getDecimalHours(),
      this.getDecimalMinutes(),
      this.getDecimalSeconds(),
      ':',
    );
    if (format === 'ISO')
      return 'T' + timeString + '.' + this.formatNum(this.getDecimalMilliseconds(), '00', '0') + 'Z';
    return timeString;
  }

  /**
   * Decimal datetime string, returns DD/MM/YYYY HH:MM:SS or  YYYY-MM-DDTHH:MM:SS.000Z
   * @returns {string}
   */
  toDecimalString(format?: keyof DateDecimalFormats): string {
    if (format === 'ISO') return this.toDecimalDateString(format) + this.toDecimalTimeString(format);
    return this.toDecimalDateString() + ' ' + this.toDecimalTimeString();
  }
}

export { DateDecimal };
