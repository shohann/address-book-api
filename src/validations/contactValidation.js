const Joi = require('joi');

module.exports.validateContact = contact => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        phone: Joi.string().min(7).max(15).required(),
        email: Joi.string().min(5).max(255).required().email(),
        city: Joi.string().min(2).max(20).required(),

    });
    return schema.validate(contact,  {  abortEarly: false });
};

module.exports.validateBulkContact = contacts => {
    const schema = Joi.array().items(Joi.object({
        name: Joi.string().min(3).max(255).required(),
        phone: Joi.string().min(7).max(15).required(),
        email: Joi.string().min(5).max(255).required().email(),
        city: Joi.string().min(2).max(20).required(),
    }));
    return schema.validate(contacts,  {  abortEarly: false });
};



