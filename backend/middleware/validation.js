const Joi = require('joi');

const validateNote = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(1).required(),
        description: Joi.string().min(1).required(),
        category: Joi.string().min(1).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
}

module.exports = { validateNote };
