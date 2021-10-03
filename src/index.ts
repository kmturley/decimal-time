export * from './classes';
export * from './types';

// Used for local development
import { DateDecimal } from './classes';
const today: DateDecimal = new DateDecimal();
console.log(today);
