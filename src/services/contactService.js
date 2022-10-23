const { Contact } = require('../models/contact');

module.exports.createSingleContact = async (contact) => {
    const newContact = new Contact(contact);
    return await newContact.save();
};

module.exports.createBulkContact = async (contacts) => {
    return await Contact.insertMany(contacts);
}

module.exports.fetchSingleContactById = async (contactId) => {
    return await Contact.findOne({ _id: contactId }).orFail();
};

module.exports.fetchAllContacts = async (authorId, skip, limit) => {
    return await Contact.find({ authorId: authorId }).skip(skip).limit(limit).orFail();
};

module.exports.updateSingleContactById = async (contactId, data) => {
    return await Contact.findByIdAndUpdate(contactId, data, {
        new: true,
        useFindAndModify: false
    }).orFail();
};

module.exports.deleteSingleContactById = async (contactId) => {
    return Contact.findByIdAndDelete(contactId).orFail();
};
 
module.exports.fetchContactsByKeyword = async (key, authorId) => {
    return await Contact.find({ authorId: authorId, $text : { $search : key }}).orFail();
};

