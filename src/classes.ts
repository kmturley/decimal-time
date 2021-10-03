import { DateDecimalInterface } from './types';

class DateDecimal implements DateDecimalInterface {
  date: Date;
  private gregorianDayMs: number = 1000 * 60 * 60 * 24;
  private decimalDayMs: number = 1000 * 100 * 100 * 10;

  constructor(...args: any[]) {
    this.date = new Date(...args as ConstructorParameters<typeof Date>);
  }

  getDecimalFullYear(): number {
    return this.date.getFullYear();
  }

  getDecimalMonth(): number {
    const startYear: Date = new Date(this.date);
    let day: number = 0;
    let month: number = 0;
    startYear.setMonth(0);
    startYear.setDate(1);
    day = Math.floor((this.date.getTime() - startYear.getTime()) / this.gregorianDayMs);
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
    return month;
  }

  getDecimalDate(): number {
    const startYear: Date = new Date(this.date);
    let day: number = 0;
    let num: number = 0;
    startYear.setMonth(0);
    startYear.setDate(1);
    day = Math.floor((this.date.getTime() - startYear.getTime()) / this.gregorianDayMs);
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
    return day - num;
  }

  getDecimalDay(): number {
    const startYear: Date = new Date(this.date);
    let day: number = 0;
    startYear.setMonth(0);
    startYear.setDate(1);
    day = Math.floor((this.date.getTime() - startYear.getTime()) / this.gregorianDayMs);
    return day % 10;
  }

  getDecimalHours(): number {
    const startDay: Date = new Date(this.date);
    const decMs: number =
      ((this.date.getTime() - startDay.setHours(0, 0, 0, 0)) / this.gregorianDayMs) * this.decimalDayMs;
    return decMs / 10000000 || 0;
  }

  getDecimalMinutes(): number {
    const startDay: Date = new Date(this.date);
    const decMs: number =
      ((this.date.getTime() - startDay.setHours(0, 0, 0, 0)) / this.gregorianDayMs) * this.decimalDayMs;
    return (decMs % 10000000) / 100000 || 0;
  }

  getDecimalSeconds(): number {
    const startDay: Date = new Date(this.date);
    const decMs: number =
      ((this.date.getTime() - startDay.setHours(0, 0, 0, 0)) / this.gregorianDayMs) * this.decimalDayMs;
    return (decMs % 100000) / 1000 || 0;
  }

  getDecimalMilliseconds(): number {
    const startDay: Date = new Date(this.date);
    const decMs: number =
      ((this.date.getTime() - startDay.setHours(0, 0, 0, 0)) / this.gregorianDayMs) * this.decimalDayMs;
    return decMs % 1000;
  }

  addZero(num: number): string {
    if (num < 10) {
      return '0' + num;
    }
    return String(num);
  }

  getDateString(): string {
    return (
      this.addZero(this.date.getDate()) +
      '-' +
      this.addZero(this.date.getMonth() + 1) +
      '-' +
      this.addZero(this.date.getFullYear())
    );
  }

  getDecimalDateString(): string {
    return (
      this.addZero(this.getDecimalDate()) +
      '-' +
      this.addZero(this.getDecimalMonth() + 1) +
      '-' +
      this.addZero(this.getDecimalFullYear())
    );
  }

  getTimeString(): string {
    return (
      this.addZero(this.date.getHours()) +
      ':' +
      this.addZero(this.date.getMinutes()) +
      ':' +
      this.addZero(this.date.getSeconds())
    );
  }

  getDecimalTimeString(): string {
    return (
      this.addZero(this.getDecimalHours()) +
      ':' +
      this.addZero(this.getDecimalMinutes()) +
      ':' +
      this.addZero(this.getDecimalSeconds())
    );
  }
}

export { DateDecimal };
