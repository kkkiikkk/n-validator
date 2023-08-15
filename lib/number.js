const { checkTypeNumber, checkTypeArray } = require("./utils");

Number.prototype.isEqual = function(number) {
    checkTypeNumber(number);

    return this == number;
}

Number.prototype.greater = function(number) {
    checkTypeNumber(number);

    return this >= number;
}

Number.prototype.less = function(number) {
    checkTypeNumber(number);

    return this <= number;
}

Number.prototype.range = function(numbers) {
    checkTypeArray(numbers);
    checkTypeNumber(numbers[0]);
    checkTypeNumber(numbers[1]);   

    if (numbers.length != 2) {
        throw Error("Range must contain only two numbers");         
    }

    return this > numbers[0] && numbers[1] > this;
}

Number.prototype.isDecimal = function() {
    return this % 1 !== 0;
}