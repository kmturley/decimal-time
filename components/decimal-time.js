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
            var oldDay = 1000 * 60 * 60 * 24,
                startYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 0)),
                day = Math.floor((date - startYear) / oldDay),
                num = 0,
                month = 1;
            if (day > 36) { num += 36; month = 2; }
            if (day > 73) { num += 37; month = 3; }
            if (day > 109) { num += 36; month = 4; }
            if (day > 146) { num += 37; month = 5; }
            if (day > 182) { num += 36; month = 6; }
            if (day > 219) { num += 37; month = 7; }
            if (day > 255) { num += 36; month = 8; }
            if (day > 292) { num += 37; month = 9; }
            if (day > 328) { num += 36; month = 10; }
            return { day: day - num, month: month, year: date.getUTCFullYear(), num: num };
        },
        getDecimalTime: function (date) {
            var oldDay = 1000 * 60 * 60 * 24,
                newDay = 1000 * 100 * 100 * 20,
                hours = 0,
                minutes = 0,
                seconds = 0,
                milliseconds = 0,
                startDay = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())),
                delta = ((date - startDay) / oldDay) * newDay;
            hours = Math.floor(delta / 10000000) % 20;
            delta -= hours * 10000000;
            minutes = Math.floor(delta / 100000) % 100;
            delta -= minutes * 100000;
            seconds = Math.floor(delta / 1000) % 100;
            delta -= seconds * 1000;
            milliseconds = Math.floor(delta) % 1000;
            return { milliseconds: milliseconds, seconds: seconds, minutes: minutes, hours: hours };
        },
        addZero: function (num) {
            if (num < 10) { num = '0' + num; }
            return num;
        }
    };
    return module;
};