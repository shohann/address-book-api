const { Schema, model } = require('mongoose');

module.exports.Contact = model(
    'Contact', 
    Schema({
        authorId: Schema.Types.ObjectId,
        name: String,
        phone: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        city: String,
    })
);
