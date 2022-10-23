const { validateUser } = require('../validations/userValidation');
const { validateContact, validateBulkContact } = require('../validations/contactValidation');

module.exports.userValidator = (req, res, next) => {
    const { error } = validateUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    if (error) {
        const messages = error.details.map(error => error.message);
        return res.status(400).json({
            success: false,
            message: messages
        });
    } else {
        next();
    }
};

module.exports.contactValidator = (req, res, next) => {
    const { error } = validateContact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        city: req.body.city
    });

    if (error) {
        const messages = error.details.map(error => error.message);
        return res.status(400).json({
            success: false,
            message: messages
        });
    } else {
        next();
    }
};

module.exports.bulkContactValidator = (req, res, next) => {
    console.log(req.body)
    const { error } = validateBulkContact(req.body);
    if (error) {
        const messages = error.details.map(error => error.message);
        return res.status(400).json({
            success: false,
            message: messages
        });
    } else {
        next();
    }
}


