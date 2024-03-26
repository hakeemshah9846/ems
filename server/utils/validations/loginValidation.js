let success_function = require('../response-handler').success_function;
let error_function = require('../response-handler').error_function;
const is_empty = require('./is_empty');
let validator = require('validator');

exports.validateLogin = async function (data) {
    try {
        console.log("Reached login validation");

        let errors = {};
        
        let email = !is_empty(data.email)?data.email:"";
        let password = !is_empty(data.password)?data.password:"";

        console.log("email : ", email);
        console.log("password : ", password);

        if(!validator.isEmail(email)) {
            errors.email = "Invalid email";
        }

        if(!validator.isLength(email,{min : 2, max : 30})) {
            errors.email = "Invalid email";
        }

        let email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!email_regex.test(email)) {
            errors.email = "Invalid email"
        }

        if(!validator.isLength(password, {min : 8, max : 30})) {
            errors.password = "Invalid password";
        }

        let password_regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}|:<>?`~\-=[\]\\;',.\/]{8,}$/;

        if(!password_regex.test(password)) {
            errors.password = "Invalid password";
        }

        console.log("errors : ", errors);
        console.log("isValid : ", is_empty(errors));

        return {
            isValid : is_empty(errors),
            errors,
        }

    } catch (error) {
        console.log("Login validation error : ", error);
        return;

    }
}