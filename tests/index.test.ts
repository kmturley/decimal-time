import { DateDecimal } from '../src/index';

test('Date is today', () => {
  const date: Date = new Date();
  const dateDecimal: DateDecimal = new DateDecimal();
  expect(dateDecimal).toBeDefined();
  expect(dateDecimal.date).toBeDefined();
  expect(dateDecimal.date.getDate()).toEqual(date.getDate());
  expect(dateDecimal.date.getMonth()).toEqual(date.getMonth());
  expect(dateDecimal.date.getFullYear()).toEqual(date.getFullYear());
});

test('Date is in the past', () => {
  const date: Date = new Date(2000, 0, 1, 0, 0, 0);
  const dateDecimal: DateDecimal = new DateDecimal(2000, 0, 1, 0, 0, 0);
  expect(dateDecimal).toBeDefined();
  expect(dateDecimal.date).toBeDefined();
  expect(dateDecimal.date.getDate()).toEqual(date.getDate());
  expect(dateDecimal.date.getMonth()).toEqual(date.getMonth());
  expect(dateDecimal.date.getFullYear()).toEqual(date.getFullYear());
});

test('Year start', () => {
  expect(new DateDecimal(2000, 0, 1, 0, 0, 0).getDecimalFullYear()).toEqual(2000);
});

test('Year end', () => {
  expect(new DateDecimal(1999, 11, 31, 23, 59, 59, 999).getDecimalFullYear()).toEqual(1999);
});

test('Month start', () => {
  expect(new DateDecimal(2000, 0, 1, 0, 0, 0).getDecimalMonth()).toEqual(0);
});

test('Month end', () => {
  expect(new DateDecimal(1999, 11, 31, 23, 59, 59, 999).getDecimalMonth()).toEqual(9);
});

test('Date start', () => {
  expect(new DateDecimal(2000, 0, 1, 0, 0, 0).getDecimalDate()).toEqual(1);
});

test('Date end', () => {
  expect(new DateDecimal(1999, 11, 31, 23, 59, 59, 999).getDecimalDate()).toEqual(37);
});

test('Day start', () => {
  expect(new DateDecimal(2000, 0, 1, 0, 0, 0).getDecimalDay()).toEqual(0);
});

test('Day end', () => {
  expect(new DateDecimal(2000, 0, 10, 0, 0, 0).getDecimalDay()).toEqual(9);
});

test('Hours start', () => {
  expect(new DateDecimal(2000, 0, 1, 0, 0, 0).getDecimalHours()).toEqual(0);
});

test('Hours end', () => {
  expect(new DateDecimal(1999, 11, 31, 23, 59, 59, 999).getDecimalHours()).toEqual(9);
});

test('Minutes start', () => {
  expect(new DateDecimal(2000, 0, 1, 0, 0, 0).getDecimalMinutes()).toEqual(0);
});

test('Minutes end', () => {
  expect(new DateDecimal(1999, 11, 31, 23, 59, 59, 999).getDecimalMinutes()).toEqual(99);
});

test('Seconds start', () => {
  expect(new DateDecimal(2000, 0, 1, 0, 0, 0).getDecimalSeconds()).toEqual(0);
});

test('Seconds end', () => {
  expect(new DateDecimal(1999, 11, 31, 23, 59, 59, 999).getDecimalSeconds()).toEqual(99);
});

test('Milliseconds start', () => {
  expect(new DateDecimal(2000, 0, 1, 0, 0, 0).getDecimalMilliseconds()).toEqual(0);
});

test('Milliseconds end', () => {
  // TODO figure out why this is 998 and not 999
  expect(new DateDecimal(1999, 11, 31, 23, 59, 59, 999).getDecimalMilliseconds()).toEqual(998);
});

test('Format number', () => {
  expect(new DateDecimal().formatNum(0)).toEqual('00');
  expect(new DateDecimal().formatNum(9)).toEqual('09');
  expect(new DateDecimal().formatNum(10)).toEqual('10');
});

test('Date string start', () => {
  expect(new DateDecimal(2000, 0, 1, 0, 0, 0).getDateString()).toEqual('01-01-2000');
});

test('Date string end', () => {
  // TODO this should match the country format
  expect(new DateDecimal(1999, 11, 31, 23, 59, 59, 999).getDateString()).toEqual('31-12-1999');
});

test('Decimal date string start', () => {
  expect(new DateDecimal(2000, 0, 1, 0, 0, 0).getDecimalDateString()).toEqual('01-01-2000');
});

test('Decimal date string end', () => {
  expect(new DateDecimal(1999, 11, 31, 23, 59, 59, 999).getDecimalDateString()).toEqual('37-10-1999');
});

test('Decimal time string start', () => {
  expect(new DateDecimal(2000, 0, 1, 0, 0, 0).getDecimalTimeString()).toEqual('00:00:00');
});

test('Decimal time string end', () => {
  expect(new DateDecimal(1999, 11, 31, 23, 59, 59, 999).getDecimalTimeString()).toEqual('09:99:99');
});
