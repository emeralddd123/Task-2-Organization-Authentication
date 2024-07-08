const Joi = require("joi");
const jwt = require("jsonwebtoken");
require('dotenv').config()


const userCreateSchema = Joi.object({
    email: Joi.string().min(3).max(255).required(),
    firstName: Joi.string().min(3).max(100).required(),
    lastName: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(3).required(),
    phone: Joi.string().min(3).optional()
});

const userLoginSchema = Joi.object({
    email: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(3).required()
});



const validUserCreation = (req, res, next) => {
    const { error, value } = userCreateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validLoginCreation = (req, res, next) => {
    const { error, value } = userLoginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};


const authenticate = (req, res, next) => {
    try {
        const authToken = req.headers.authorization;
        if (!authToken) {
            return res.status(401).json({ message: "Authentication Credentials not provided" });
        }
        if (authToken.split(' ')[0] !== "Bearer" || !authToken.split(' ')[1]) {
            return res.json("Invalid authorization header");
        }

        const token = authToken.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (error, decodedToken) => {
            if (error) {
                return res.status(401).json({ message: error.message })
            }

            req.user = decodedToken;
            next();

        })
    } catch (error) {
        return res.status(500).json({ message: "An error occurred" });
    }
}



module.exports = { validUserCreation, validLoginCreation,  authenticate};
