require("./array");
require("./number");
require("./string");
const { checkTypeObject } = require("./utils");


const commonValdiationFields = ["type", "require", "validator"];
const allowedNumberValidationFields = ["min", "max", "range", ...commonValdiationFields];
const allowedStringValidationFields = ["minLength", "maxLength", "regex", "values", ...commonValdiationFields];
const allowedArrayValidationFields = ["minLength", "maxLength", "empty", ...commonValdiationFields];

const numberValidation = [
    { name: allowedNumberValidationFields[0], validate(incomingNum, config) { return incomingNum.greater(config) }} , 
    { name: allowedNumberValidationFields[1], validate(incomingNum, config) { return incomingNum.less(config); } },
    { name: allowedNumberValidationFields[2], validate(incomingNum, config) { return incomingNum.range(config); } },
];

const stringValidation = [
    { name: allowedStringValidationFields[0], validate(incomingStr, conifg) { return incomingStr.minLength(conifg); } },
    { name: allowedStringValidationFields[1], validate(incomingStr, config) { return incomingStr.maxLength(config); } },
    { name: allowedStringValidationFields[2], validate(incomingStr, config) { return incomingStr.regex(config); }},
    { name: allowedStringValidationFields[3], validate(incomingStr, config) { return incomingStr.values(config); } }
]

const arrayValidation = [
    { name: allowedArrayValidationFields[0], validate(incomingArr, config) { return incomingArr.length >= config } },
    { name: allowedArrayValidationFields[1], validate(incomingArr, config) { return incomingArr.length <= config } },
    { name: allowedArrayValidationFields[2], validate(incomingArr, conifg) { return !incomingArr.length } },
]


class Schema {

    #schema = null;

    constructor(schema) {
        checkTypeObject(schema);

        this.#schema = schema;
    }

    validate(objForValidate) {
        const keysOfSchema = Object.keys(this.#schema)
        let isValid = null;
        if(!Object.keys(objForValidate).sameValues(keysOfSchema)) {
            throw new Error("Schema contain unknown or missing fields");
        }

        for (const keyOfSchema of keysOfSchema) {
            const schemaByKey = this.#schema[keyOfSchema];

            switch(schemaByKey.type) {
                case "number":
                    isValid = this.#validateNumber(schemaByKey, objForValidate[keyOfSchema]);
                    if(!isValid) {
                        return isValid;
                    }
                    break;
                case "string": 
                    isValid = this.#validateString(schemaByKey, objForValidate[keyOfSchema]);
                    if(!isValid) {
                        return isValid;
                    }
                    break;
                case "array":
                    isValid = this.#validateArray(schemaByKey, objForValidate[keysOfSchema]);
                    if(!isValid) {
                        return isValid;
                    }
                case "object": 
                    this.#checkRequire(schemaByKey, objForValidate[keyOfSchema]);
                    const schema = new Schema(schemaByKey.schema);
                    isValid = schema.validate(objForValidate[keyOfSchema]);
                    if(!isValid) {
                        return isValid;
                    }
                    break;
                default:
                    throw new Error("This type does not exist");
            }
        }

        return isValid;
    }

    #validateNumber(schema, num) {
        this.#checkRequire(schema, num);
        
        const keysOfSchema = Object.keys(schema);
        
        this.#checkSchemaKeys(keysOfSchema, allowedNumberValidationFields)

        const validatorFunctionResult = this.#executeValidatorFunction(schema, num);
        if (!validatorFunctionResult) {
            return false;
        }

        for (const keyOfSchema of keysOfSchema) {
            const validator = (numberValidation.filter((item) => item.name === keyOfSchema))[0];

            if (!validator) {
                continue;
            }

            const validateResult = validator.validate(num, schema[keyOfSchema]);

            if (!validateResult) {
                return false;
            } 
        }

        return true;
    }

    #validateString(schema, str) {
        this.#checkRequire(schema, str);

        const keysOfSchema = Object.keys(schema);

        this.#checkSchemaKeys(keysOfSchema, allowedStringValidationFields)

        const validatorFunctionResult = this.#executeValidatorFunction(schema, str);
        if (!validatorFunctionResult) {
            return false;
        }

        for (const keyOfSchema of keysOfSchema) {
            const validator = (stringValidation.filter((item) => item.name === keyOfSchema))[0];

            if (!validator) {
                continue;
            }

            const validateResult = validator.validate(str, schema[keyOfSchema]);
            if (!validateResult) {
                return false;
            } 
        }

        return true;
    }

    #validateArray(schema, arr) {
        this.#checkRequire(schema, arr);

        const keysOfSchema = Object.keys(schema);

        this.#checkSchemaKeys(keysOfSchema, allowedArrayValidationFields);

        const validatorFunctionResult = this.#executeValidatorFunction(schema, arr);
        if (!validatorFunctionResult) {
            return false;
        }

        for (const keyOfSchema of keysOfSchema) {
            const validator = (arrayValidation.filter((item) => item.name === keyOfSchema))[0];

            if (!validator) {
                continue;
            }

            const validateResult = validator.validate(arr, schema[keyOfSchema]);
            if (!validateResult) {
                return false;
            } 
        }

        return true;
    }

    #checkRequire(schema, value) {
        const isRequire = schema["require"];
        if (isRequire && typeof value !== "number" && (typeof value === "undefined" || value !== null || value.length === 0)) {
            throw new Error("Data does not match schema");
        }    
    }

    #checkSchemaKeys(incomingKeys, configKeys) {
        if (!incomingKeys.sameValues(configKeys)) {
            throw new Error("Schema contain unknown fields")
        }
    }

    #executeValidatorFunction(schema, value) {
        let validatorResult = null;
        if (schema[commonValdiationFields[2]]) {
            validatorResult = schema[commonValdiationFields[2]](value);
        }

        if(typeof validatorResult === "boolean" && !validatorResult) {
            return false
        };

        return true;
    }
}

module.exports = {
    Schema,
}