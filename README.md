# nop-validate

JS and TS validation.

## Usage

```bash
npm i nop-validator
```

```js
import { Schema } from 'nop-validate';
const { Schema } = require("nop-validator");
```

### Schema

```js
const schema = new Schema({
    rate: { 
        type: "number",
        require: true,
        range: [2, 10],
        validator(num) {
            return (num % 2) === 0
        }
    },

    email: {
        type: "string",
        require: true,
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    
    person: {
        type: "object",
        require: true, 
        schema: {
            firstName: {
                type: "string",
            },
            lastName: {
                type: "string",
            },
            age: {
                type: "number",
                min: 5
            }
        }
    }
})


console.log(schema.validate({
    rate: 0,
    email: "example@gmail.com",
    person: {
        firstName: "Ned",
        lastName: "Stark",
        age: 6
    }
}))
```

### Using custom prototype

```javascript
const num = 2
console.log(num.greater(1))
```

## Api

### String

#### maxLength: number

Validate string's max length.

#### minLength: number

Validate string's min length.

#### regex: Regex

Validate whether string is match regex pattern.

### Number

#### min: number

Minimum value.

#### max: number

Maximum value.

#### range: [number, number]

In range min ~ max.

### Array

#### maxLength: number

Validate string's max length.

#### minLength: number

Validate string's min length.

### empty: boolean

check if array is emty

### Object

#### schema

### Demo

```javascript
const schema = new Schema({
    person: {
        type: "number",
        schema: {
            firstName: {
                type: "string",
            },
            lastName: {
                type: "string",
            },
            age: {
                type: "number",
                min: 5
            }
        }
    }
})
```

### Type

#### number

#### string

#### array

### object
