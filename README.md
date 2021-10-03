# decimal-time
![Test](https://github.com/kmturley/decimal-time/workflows/Test/badge.svg)

Universal decimal calendar and time system for the internet age using:

* NodeJS 12.x
* TypeScript 4.x


## Installation

To install the common package, run the command:

    npm install decimal-time


## Usage

Import the package using:

    import { DateDecimal } from 'decimal-time';

Then use the available methods as normal:

    const today = new DateDecimal();
    today.getDateString();
    today.getDecimalDateString();
    today.getTimeString();
    today.getDecimalTimeString();


## Deployment

Release an updated version on npm by simply creating a version tag:

    npm version patch
    git push && git push origin --tags

Then publish to npm using:

    npm publish


## Contact

For more information please contact kmturley
