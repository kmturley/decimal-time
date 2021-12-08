var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var DateDecimal = /** @class */ (function () {
    function DateDecimal() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.gregorianDayMs = 1000 * 60 * 60 * 24;
        this.decimalDayMs = 1000 * 100 * 100 * 10;
        this.date = new (Date.bind.apply(Date, __spreadArray([void 0], args, false)))();
    }
    DateDecimal.prototype.isLeapYear = function () {
        return new Date(this.date.getUTCFullYear(), 1, 29).getDate() === 29;
    };
    DateDecimal.prototype.formatNum = function (num, prefix, prefix2) {
        if (prefix === void 0) { prefix = '0'; }
        if (prefix2 === void 0) { prefix2 = ''; }
        if (num < 10) {
            return prefix + num;
        }
        else if (num < 100) {
            return prefix2 + num;
        }
        return String(num);
    };
    DateDecimal.prototype.formatDateString = function (date, month, year, separator) {
        return "" + this.formatNum(date) + separator + this.formatNum(month) + separator + this.formatNum(year);
    };
    DateDecimal.prototype.getDecimalMillisecondsElapsed = function () {
        var dateCopy = new Date(this.date.getTime());
        dateCopy.setUTCHours(0, 0, 0, 0);
        return Math.ceil(((this.date.getTime() - dateCopy.getTime()) / this.gregorianDayMs) * this.decimalDayMs);
    };
    /**
     * Day of the year, between 0 and 365
     * 365 for leap years, otherwise 364
     * @returns {number}
     */
    DateDecimal.prototype.getDayOfYear = function () {
        var dateCopy = new Date(this.date.getTime());
        dateCopy.setUTCMonth(0, 1);
        dateCopy.setUTCHours(0, 0, 0, 0);
        return Math.floor((this.date.getTime() - dateCopy.getTime()) / this.gregorianDayMs);
    };
    /**
     * Days of a month, between 36 and 38
     * 38 for last month in a leap year, otherwise 36 even and 37 odd
     * @returns {number}
     */
    DateDecimal.prototype.getDecimalDaysOfMonth = function () {
        if (this.isLeapYear() && this.getDecimalMonth() === 9)
            return 38;
        return this.getDecimalMonth() % 2 === 0 ? 36 : 37;
    };
    /**
     * Decimal day of the month, between 0 and 38
     * 38 for last month in a leap year, otherwise 36 even and 37 odd
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate
     * @returns {number}
     */
    DateDecimal.prototype.getDecimalDate = function () {
        var day = this.getDayOfYear();
        var num = 0;
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
    };
    /**
     * Decimal day of the week, between 0 and 9
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
     * @returns {number}
     */
    DateDecimal.prototype.getDecimalDay = function () {
        return Math.floor(this.date.getTime() / this.gregorianDayMs) % 10;
    };
    /**
     * Year, between 1000 and 9999
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear
     * @returns {number}
     */
    DateDecimal.prototype.getDecimalYear = function () {
        return this.date.getUTCFullYear();
    };
    /**
     * Decimal hour, between 0 and 9
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours
     * @returns {number}
     */
    DateDecimal.prototype.getDecimalHours = function () {
        return Math.floor(this.getDecimalMillisecondsElapsed() / 10000000) || 0;
    };
    /**
     * Decimal milliseconds, between 0 and 999
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMilliseconds
     * @returns {number}
     */
    DateDecimal.prototype.getDecimalMilliseconds = function () {
        return Math.floor(this.getDecimalMillisecondsElapsed() % 1000) || 0;
    };
    /**
     * Decimal minutes, between 0 and 99
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes
     * @returns {number}
     */
    DateDecimal.prototype.getDecimalMinutes = function () {
        return Math.floor((this.getDecimalMillisecondsElapsed() % 10000000) / 100000) || 0;
    };
    /**
     * Decimal month, between 0 and 9
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
     * @returns {number}
     */
    DateDecimal.prototype.getDecimalMonth = function () {
        var day = this.getDayOfYear();
        var month = 0;
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
    };
    /**
     * Decimal seconds, between 0 and 99
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getSeconds
     * @returns {number}
     */
    DateDecimal.prototype.getDecimalSeconds = function () {
        return Math.floor((this.getDecimalMillisecondsElapsed() % 100000) / 1000) || 0;
    };
    /**
     * Decimal time, milliseconds since the Unix Epoch
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
     * @returns {number}
     */
    DateDecimal.prototype.getDecimalTime = function () {
        return Math.floor(this.date.getTime() / this.gregorianDayMs) * this.decimalDayMs;
    };
    /**
     * Decimal date string, returns DD/MM/YYYY or YYYY-MM-DD
     * @returns {string}
     */
    DateDecimal.prototype.toDecimalDateString = function (format) {
        if (format === 'ISO')
            return this.formatDateString(this.date.getUTCFullYear(), this.getDecimalMonth() + 1, this.getDecimalDate() + 1, '-');
        return this.formatDateString(this.getDecimalDate() + 1, this.getDecimalMonth() + 1, this.date.getUTCFullYear(), '/');
    };
    /**
     * Decimal time string, returns HH:MM:SS or THH:MM:SS.000Z
     * @returns {string}
     */
    DateDecimal.prototype.toDecimalTimeString = function (format) {
        var timeString = this.formatDateString(this.getDecimalHours(), this.getDecimalMinutes(), this.getDecimalSeconds(), ':');
        if (format === 'ISO')
            return 'T' + timeString + '.' + this.formatNum(this.getDecimalMilliseconds(), '00', '0') + 'Z';
        return timeString;
    };
    /**
     * Decimal datetime string, returns DD/MM/YYYY HH:MM:SS or  YYYY-MM-DDTHH:MM:SS.000Z
     * @returns {string}
     */
    DateDecimal.prototype.toDecimalString = function (format) {
        if (format === 'ISO')
            return this.toDecimalDateString(format) + this.toDecimalTimeString(format);
        return this.toDecimalDateString() + ' ' + this.toDecimalTimeString();
    };
    return DateDecimal;
}());
export { DateDecimal };
