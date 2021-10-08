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
    DateDecimal.prototype.getDecimalFullYear = function () {
        return this.date.getFullYear();
    };
    DateDecimal.prototype.getDecimalMonth = function () {
        var startYear = new Date(this.date);
        var day = 0;
        var month = 0;
        startYear.setMonth(0);
        startYear.setDate(1);
        day = (this.date.getTime() - startYear.getTime()) / this.gregorianDayMs;
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
    };
    DateDecimal.prototype.getDecimalDate = function () {
        var startYear = new Date(this.date);
        var day = 0;
        var num = 0;
        startYear.setMonth(0);
        startYear.setDate(0);
        day = (this.date.getTime() - startYear.getTime()) / this.gregorianDayMs;
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
    DateDecimal.prototype.getDecimalDay = function () {
        var startYear = new Date(this.date);
        var day = 0;
        startYear.setMonth(0);
        startYear.setDate(1);
        day = (this.date.getTime() - startYear.getTime()) / this.gregorianDayMs;
        return Math.floor(day % 10) || 0;
    };
    DateDecimal.prototype.getDecimalHours = function () {
        var startDay = new Date(this.date);
        var decMs = ((this.date.getTime() - startDay.setHours(0, 0, 0, 0)) / this.gregorianDayMs) * this.decimalDayMs;
        return Math.floor(decMs / 10000000) || 0;
    };
    DateDecimal.prototype.getDecimalMinutes = function () {
        var startDay = new Date(this.date);
        var decMs = ((this.date.getTime() - startDay.setHours(0, 0, 0, 0)) / this.gregorianDayMs) * this.decimalDayMs;
        return Math.floor((decMs % 10000000) / 100000) || 0;
    };
    DateDecimal.prototype.getDecimalSeconds = function () {
        var startDay = new Date(this.date);
        var decMs = ((this.date.getTime() - startDay.setHours(0, 0, 0, 0)) / this.gregorianDayMs) * this.decimalDayMs;
        return Math.floor((decMs % 100000) / 1000) || 0;
    };
    DateDecimal.prototype.getDecimalMilliseconds = function () {
        var startDay = new Date(this.date);
        var decMs = ((this.date.getTime() - startDay.setHours(0, 0, 0, 0)) / this.gregorianDayMs) * this.decimalDayMs;
        return Math.floor(decMs % 1000) || 0;
    };
    DateDecimal.prototype.formatNum = function (num) {
        if (num < 10) {
            return '0' + num;
        }
        return String(num);
    };
    DateDecimal.prototype.getDateString = function () {
        return (this.formatNum(this.date.getDate()) +
            '-' +
            this.formatNum(this.date.getMonth() + 1) +
            '-' +
            this.formatNum(this.date.getFullYear()));
    };
    DateDecimal.prototype.getDecimalDateString = function () {
        return (this.formatNum(this.getDecimalDate()) +
            '-' +
            this.formatNum(this.getDecimalMonth() + 1) +
            '-' +
            this.formatNum(this.getDecimalFullYear()));
    };
    DateDecimal.prototype.getTimeString = function () {
        return (this.formatNum(this.date.getHours()) +
            ':' +
            this.formatNum(this.date.getMinutes()) +
            ':' +
            this.formatNum(this.date.getSeconds()));
    };
    DateDecimal.prototype.getDecimalTimeString = function () {
        return (this.formatNum(this.getDecimalHours()) +
            ':' +
            this.formatNum(this.getDecimalMinutes()) +
            ':' +
            this.formatNum(this.getDecimalSeconds()));
    };
    return DateDecimal;
}());
export { DateDecimal };
