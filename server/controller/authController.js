const users = require('../db/models/users');
const bcrypt = require('bcryptjs');
const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const validateLogin = require('../utils/validations/loginValidation').validateLogin;

exports.login = async function (req, res) {
    try {
        console.log("Reached here...");

        const {isValid, errors} = await validateLogin(req.body);
        console.log("isValid : ", isValid);
        console.log("errors : ", errors);

        if(!isValid) {
            let response = error_function({
                statusCode : 400,
                message : "Validation failed",
            })

            response.errors = errors;

            res.status(response.statusCode).send(response);
            return;
        }


        const email = req.body.email;
        const password = req.body.password;

        const user = await users.findOne({email});
        console.log("user : ", user);

        if(user) {
            let db_password = user.password;

            let match = await bcrypt.compare(password, db_password);
            console.log("match : ", match);

            if(match) {
                const token = jwt.sign({user_id : user._id}, process.env.PRIVATE_KEY, {expiresIn : "1d"});
                let response = success_function({
                    statusCode : 200,
                    data : token,
                    message : "Login Successful",
                });

                res.status(response.statusCode).send(response);
                return;
            }else {
                let response = error_function({
                    statusCode : 400,
                    message : "Login Failed",
                });
                res.status(response.statusCode).send(response);
                return;
            }

        }else {
            let response = error_function({
                statusCode : 404,
                message : "User not found",
            });

            res.status(response.statusCode).send(response);
            return;
        }
    } catch (error) {
        let response = error_function({
            statusCode : 400,
            message : error.message ? error.message : "Something went wrong",
        });
        res.status(response.statusCode).send(response);
        return;
    }
}