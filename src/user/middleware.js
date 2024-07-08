const Joi = require("joi");

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



module.exports = { validUserCreation, validLoginCreation };
