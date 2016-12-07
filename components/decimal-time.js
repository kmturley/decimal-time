/**
 * DecimalTime
 * Universal decimal calendar and time system for the internet age
 * by kmturley
 */

Date.prototype.getDecimalFullYear = function () {
    return this.getUTCFullYear();
};

Date.prototype.getDecimalMonth = function () {
    var startYear = new Date(this),
        day = 0,
        month = 0;
    startYear.setUTCMonth(0);
    startYear.setUTCDate(1);
    day = Math.floor((this - startYear) / 8.64e7);
    if (day > 36) { month = 1; }
    if (day > 73) { month = 2; }
    if (day > 109) { month = 3; }
    if (day > 146) { month = 4; }
    if (day > 182) { month = 5; }
    if (day > 219) { month = 6; }
    if (day > 255) { month = 7; }
    if (day > 292) { month = 8; }
    if (day > 328) { month = 9; }
    return month;
};

Date.prototype.getDecimalDate = function () {
    var startYear = new Date(this),
        day = 0,
        num = 0;
    startYear.setUTCMonth(0);
    startYear.setUTCDate(1);
    day = Math.floor((this - startYear) / 8.64e7);
    if (day > 36) { num += 36; }
    if (day > 73) { num += 37; }
    if (day > 109) { num += 36; }
    if (day > 146) { num += 37; }
    if (day > 182) { num += 36; }
    if (day > 219) { num += 37; }
    if (day > 255) { num += 36; }
    if (day > 292) { num += 37; }
    if (day > 328) { num += 36; }
    return day - num;
};

Date.prototype.getDecimalDay = function () {
    var startYear = new Date(this),
        day = 0,
        num = 0;
    startYear.setUTCMonth(0);
    startYear.setUTCDate(1);
    day = Math.floor((this - startYear) / 8.64e7);
    return day % 10;
};

Date.prototype.getDecimalHours = function () {
    var startDay = new Date(this),
        decMs = Math.round((this - startDay.setUTCHours(0, 0, 0, 0)) / 8.64e7 * 2.0e8);
    return decMs / 10000000 | 0;
};

Date.prototype.getDecimalMinutes = function () {
    var startDay = new Date(this),
        decMs = Math.round((this - startDay.setUTCHours(0, 0, 0, 0)) / 8.64e7 * 2.0e8);
    return decMs % 10000000 / 100000 | 0;
};

Date.prototype.getDecimalSeconds = function () {
    var startDay = new Date(this),
        decMs = Math.round((this - startDay.setUTCHours(0, 0, 0, 0)) / 8.64e7 * 2.0e8);
    return decMs % 100000 / 1000 | 0;
};

Date.prototype.getDecimalMilliseconds = function () {
    var startDay = new Date(this),
        decMs = Math.round((this - startDay.setUTCHours(0, 0, 0, 0)) / 8.64e7 * 2.0e8);
    return decMs % 1000;
};

Date.prototype.addZero = function (num) {
    if (num < 10) { num = '0' + num; }
    return num;
}

Date.prototype.getUTCDateString = function () {
    return this.addZero(this.getUTCDate()) + '-' + this.addZero(this.getUTCMonth() + 1) + '-' + this.addZero(this.getUTCFullYear());
};

Date.prototype.getDecimalDateString = function () {
    return this.addZero(this.getDecimalDate()) + '-' + this.addZero(this.getDecimalMonth() + 1) + '-' + this.addZero(this.getDecimalFullYear());
};

Date.prototype.getUTCTimeString = function () {
    return this.addZero(this.getUTCHours()) + ':' + this.addZero(this.getUTCMinutes()) + ':' + this.addZero(this.getUTCSeconds()) + '.' + ('00' + this.getUTCMilliseconds()).slice(-3);
};

Date.prototype.getDecimalTimeString = function () {
    return this.addZero(this.getDecimalHours()) + ':' + this.addZero(this.getDecimalMinutes()) + ':' + this.addZero(this.getDecimalSeconds()) + '.' + ('00' + this.getDecimalMilliseconds()).slice(-3);
};