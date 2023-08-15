const { checkTypeString, checkTypeNumber, checkTypeObject, checkTypeArray } = require("./utils");

String.prototype.minLength = function(number) {
    checkTypeNumber(number);

    return this.length >= number;
}

String.prototype.maxLength = function(number) {
    checkTypeNumber(number);

    return this.length <= number;
}

String.prototype.regex = function(expression) {
    checkTypeObject(expression);

    return expression.test(this)
};

String.prototype.values = function(arrayOfString) {
    checkTypeArray(arrayOfString);

    for (const string of arrayOfString) {
        checkTypeString(string);
    }

    return arrayOfString.include(this);
}   