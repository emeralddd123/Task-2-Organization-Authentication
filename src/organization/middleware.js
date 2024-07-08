const Joi = require("joi");

const organizationCreateSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(3).optional()
});


const validOrganizationCreation = (req, res, next) => {
    const { error, value } = organizationCreateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = { validOrganizationCreation };
