import { DateDecimal } from '../src/index';

test('New DateDecimal today', () => {
  const date: Date = new Date();
  const dateDecimal: DateDecimal = new DateDecimal();
  expect(dateDecimal).toBeDefined();
  expect(dateDecimal.date).toBeDefined();
  expect(dateDecimal.date.getDate()).toEqual(date.getDate());
  expect(dateDecimal.date.getMonth()).toEqual(date.getMonth());
  expect(dateDecimal.date.getFullYear()).toEqual(date.getFullYear());
});

test('New DateDecimal past', () => {
  const date: Date = new Date(2000, 0, 1);
  const dateDecimal: DateDecimal = new DateDecimal(2000, 0, 1);
  expect(dateDecimal).toBeDefined();
  expect(dateDecimal.date).toBeDefined();
  expect(dateDecimal.date.getDate()).toEqual(date.getDate());
  expect(dateDecimal.date.getMonth()).toEqual(date.getMonth());
  expect(dateDecimal.date.getFullYear()).toEqual(date.getFullYear());
});
