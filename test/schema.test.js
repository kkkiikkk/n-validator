const { Schema } = require("../lib/schema")

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

const a = {
    n: 1,
    validator() {
        return 1
    }
}

// console.log(a['validator']())