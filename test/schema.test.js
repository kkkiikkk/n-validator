const { Schema } = require("../lib/schema")

const schema = new Schema({
    rate: {
        type: "number",
        require: true,
        range: [2, 10]
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
    rate: 5,
    email: "example@gmail.com",
    person: {
        firstName: "Ned",
        lastName: "Stark",
        age: 1
    }
}))