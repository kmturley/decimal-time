/**
 * DecimalTime
 * Universal decimal calendar and time system for the internet age
 * by kmturley
 */

var DecimalTime = function () {
    'use strict';

    var module = {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        days_new: ['Unadie', 'Duodie', 'Tresdie', 'Quatdie', 'Quintodie', 'Sexdie', 'Septdie', 'Octdie', 'Novdie', 'Decdie'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        months_new: ['Unamense', 'Duomense', 'Tresmense', 'Quatmense', 'Quintomense', 'Sexmense', 'Septmense', 'Octmense', 'Novmense', 'Decmense'],
        getDecimalDate: function (date) {
            var startYear = new Date(date),
                day = 0,
                num = 0,
                month = 1;
            startYear.setUTCMonth(0);
            startYear.setUTCDate(1);
            day = Math.floor((date - startYear) / 8.64e7);
            if (day > 36) { num += 36; month = 2; }
            if (day > 73) { num += 37; month = 3; }
            if (day > 109) { num += 36; month = 4; }
            if (day > 146) { num += 37; month = 5; }
            if (day > 182) { num += 36; month = 6; }
            if (day > 219) { num += 37; month = 7; }
            if (day > 255) { num += 36; month = 8; }
            if (day > 292) { num += 37; month = 9; }
            if (day > 328) { num += 36; month = 10; }
            return {
                day: day - num,
                month: month,
                year: date.getUTCFullYear(),
                index: num
            };
        },
        getDecimalTime: function (date) {
            var startDay = new Date(date),
                decMs = Math.round((date - startDay.setUTCHours(0, 0, 0, 0)) / 8.64e7 * 2.0e8);
            return {
                hours: decMs / 10000000 | 0,
                minutes: decMs % 10000000 / 100000 | 0,
                seconds: decMs % 100000 / 1000 | 0,
                milliseconds: decMs % 1000
            };
        },
        addZero: function (num) {
            if (num < 10) { num = '0' + num; }
            return num;
        },
        formatUTCTime: function (date) {
            return this.addZero(date.getUTCHours()) + ':' + this.addZero(date.getUTCMinutes()) + ':' + this.addZero(date.getUTCSeconds()) + '.' + ('00' + date.getUTCMilliseconds()).slice(-3);
        },
        formatDecimalTime: function (date) {
            return this.addZero(date.hours) + ':' + this.addZero(date.minutes) + ':' + this.addZero(date.seconds) + '.' + ('00' + date.milliseconds).slice(-3);
        }
    };
    return module;
};