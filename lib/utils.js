const checkTypeNumber = (num) => {
    if (typeof num !== "number") {
        throw TypeError("Type is not assignable to type number");
    }
}

const checkTypeArray = (array) => {
    if (!Array.isArray(array)) {
        throw TypeError("Type is not assignable to type array");
    }
}

const checkTypeString= (string) => {
    if (typeof string !== "string") {
        throw TypeError("Type is not assignable to type string");
    }
}

const checkTypeObject = (obj) => {
    if (typeof obj !== "object") {
        throw TypeError("Type is not assignable to type object");
    }
}

module.exports = {
    checkTypeNumber,
    checkTypeArray,
    checkTypeString,
    checkTypeObject
}