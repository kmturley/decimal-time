import { DateDecimal } from '../src/index';

const timeStart: string = 'T00:00:00.000Z';
const timeEnd: string = 'T23:59:59.999Z';
const dateStart: string = '2000-01-01';
const dateEnd: string = '2000-12-31';
const dateTimeStart: string = dateStart + timeStart;
const dateTimeEnd: string = dateEnd + timeEnd;

test('Timezone PST', () => {
  expect(new DateDecimal().date.getTimezoneOffset()).toBe(480);
});

// 365 for a leap year, otherwise 364
// 2000 was a leap year
test('Day of year, between 0 and 365', () => {
  expect(new DateDecimal(dateTimeStart).getDayOfYear()).toEqual(0);
  expect(new DateDecimal('2000-02-06' + timeStart).getDayOfYear()).toEqual(36);
  expect(new DateDecimal('2000-02-07' + timeStart).getDayOfYear()).toEqual(37);
  expect(new DateDecimal(dateTimeEnd).getDayOfYear()).toEqual(365);
});

// 38 for last month in a leap year, otherwise 36 even and 37 odd
// 2000 was a leap year
test('Days of a month, between 36 and 38', () => {
  expect(new DateDecimal(dateTimeStart).getDecimalDaysOfMonth()).toEqual(36);
  expect(new DateDecimal('2000-02-10' + timeStart).getDecimalDaysOfMonth()).toEqual(37);
  expect(new DateDecimal(dateTimeEnd).getDecimalDaysOfMonth()).toEqual(38);
});

// 38 for last month in a leap year, otherwise 36 even and 37 odd
// 2000 was a leap year
test('Decimal day of the month, between 0 and 37', () => {
  expect(new DateDecimal(dateTimeStart).getDecimalDate()).toEqual(0);
  expect(new DateDecimal('2000-02-06' + timeStart).getDecimalDate()).toEqual(36);
  expect(new DateDecimal('2000-02-07' + timeStart).getDecimalDate()).toEqual(1);
  expect(new DateDecimal('2000-02-08' + timeStart).getDecimalDate()).toEqual(2);
  expect(new DateDecimal(dateTimeEnd).getDecimalDate()).toEqual(37);
});

test('Decimal day of the week, between 0 and 9', () => {
  expect(new DateDecimal('1970-01-01' + timeStart).getDecimalDay()).toEqual(0);
  expect(new DateDecimal(dateTimeStart).getDecimalDay()).toEqual(7);
  expect(new DateDecimal('2000-01-02' + timeStart).getDecimalDay()).toEqual(8);
  expect(new DateDecimal('2000-01-03' + timeStart).getDecimalDay()).toEqual(9);
  expect(new DateDecimal('2000-01-04' + timeStart).getDecimalDay()).toEqual(0);
  expect(new DateDecimal(dateTimeEnd).getDecimalDay()).toEqual(2);
});

test('Decimal year, between 1000 and 9999', () => {
  expect(new DateDecimal('1999-01-01' + timeStart).getDecimalYear()).toEqual(1999);
  expect(new DateDecimal(dateTimeStart).getDecimalYear()).toEqual(2000);
  expect(new DateDecimal('2001-01-01' + timeStart).getDecimalYear()).toEqual(2001);
  expect(new DateDecimal(dateTimeEnd).getDecimalYear()).toEqual(2000);
});

test('Decimal hours, between 0 and 9', () => {
  expect(new DateDecimal(dateTimeStart).getDecimalHours()).toEqual(0);
  expect(new DateDecimal(dateTimeEnd).getDecimalHours()).toEqual(9);
});

test('Decimal milliseconds, between 0 and 999', () => {
  expect(new DateDecimal(dateTimeStart).getDecimalMilliseconds()).toEqual(0);
  expect(new DateDecimal(dateTimeEnd).getDecimalMilliseconds()).toEqual(999);
});

test('Decimal minutes, between 0 and 99', () => {
  expect(new DateDecimal(dateTimeStart).getDecimalMinutes()).toEqual(0);
  expect(new DateDecimal(dateTimeEnd).getDecimalMinutes()).toEqual(99);
});

test('Decimal month, between 0 and 9', () => {
  expect(new DateDecimal(dateTimeStart).getDecimalMonth()).toEqual(0);
  expect(new DateDecimal(dateTimeEnd).getDecimalMonth()).toEqual(9);
});

test('Decimal seconds, between 0 and 99', () => {
  expect(new DateDecimal(dateTimeStart).getDecimalSeconds()).toEqual(0);
  expect(new DateDecimal(dateTimeEnd).getDecimalSeconds()).toEqual(99);
});

test('Decimal time, milliseconds since the Unix Epoch', () => {
  expect(new DateDecimal(dateTimeStart).getDecimalTime()).toEqual(1095700000000);
  expect(new DateDecimal(dateTimeEnd).getDecimalTime()).toEqual(1132200000000);
});

test('Decimal date string, returns DD/MM/YYYY or YYYY-MM-DD', () => {
  expect(new DateDecimal(dateTimeStart).toDecimalDateString()).toEqual('01/01/2000');
  expect(new DateDecimal(dateTimeStart).toDecimalDateString('ISO')).toEqual('2000-01-01');
  expect(new DateDecimal(dateTimeEnd).toDecimalDateString()).toEqual('38/10/2000');
  expect(new DateDecimal(dateTimeEnd).toDecimalDateString('ISO')).toEqual('2000-10-38');
});

test('Decimal time string, returns HH:MM:SS or THH:MM:SS.000Z', () => {
  expect(new DateDecimal(dateTimeStart).toDecimalTimeString()).toEqual('00:00:00');
  expect(new DateDecimal(dateTimeStart).toDecimalTimeString('ISO')).toEqual('T00:00:00.000Z');
  expect(new DateDecimal(dateTimeEnd).toDecimalTimeString()).toEqual('09:99:99');
  expect(new DateDecimal(dateTimeEnd).toDecimalTimeString('ISO')).toEqual('T09:99:99.999Z');
});

test('Decimal datetime string, returns DD/MM/YYYY HH:MM:SS or  YYYY-MM-DDTHH:MM:SS.000Z', () => {
  expect(new DateDecimal(dateTimeStart).toDecimalString()).toEqual('01/01/2000 00:00:00');
  expect(new DateDecimal(dateTimeStart).toDecimalString('ISO')).toEqual('2000-01-01T00:00:00.000Z');
  expect(new DateDecimal(dateTimeEnd).toDecimalString()).toEqual('38/10/2000 09:99:99');
  expect(new DateDecimal(dateTimeEnd).toDecimalString('ISO')).toEqual('2000-10-38T09:99:99.999Z');
});
