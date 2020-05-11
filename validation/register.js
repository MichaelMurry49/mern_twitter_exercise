const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.handle = validText(data.handle) ? data.handle : "";
    data.email = validText(data.email) ? data.email : "";
    data.password = validText(data.password) ? data.password : "";
    data.password2 = validText(data.password2) ? data.password2 : "";
    
    console.log(data)
    console.log(Validator.isEmail('\'michael@email.com\''))
    console.log(Validator.isEmail('michael@email.com'))

    if(!Validator.isLength(data.handle, {min: 2, max: 30 })) errors.handle = "Handle must be between 2 and 30 characters"
    if (Validator.isEmpty(data.handle)) errors.handle = "Handle is required"
    
    // if (!Validator.isEmail(data.email)) errors.email = "Email is invalid"
    if (!Validator.isEmail(data.email)) errors.email = "Email is invalid"
    if (Validator.isEmpty(data.email)) errors.email = "Email is required"
    
    if (!Validator.isLength(data.password, {min: 2, max: 30})) errors.password = "Password must be between 2 and 30 characters"
    if (!Validator.equals(data.password, data.password2)) errors.password2 = "Passwords must match"
    if (Validator.isEmpty(data.password)) errors.password = "Password is required"
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }

    
}

