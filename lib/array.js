const { checkTypeNumber, checkTypeArray } = require("./utils")

Array.prototype.maxLength = function(number) {
    checkTypeNumber(number);

    return this.length < number;
}


Array.prototype.minLength = function(number) {
    checkTypeNumber(number);

    return this.length > number;
}

Array.prototype.sameValues = function(array) {
    checkTypeArray(array);
    
    for (let i = 0; i < this.length; i++) {
        if (!array.includes(this[i])) {
            return false;
        }
    }
    
    return true;
}