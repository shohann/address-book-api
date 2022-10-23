const { createSingleContact, fetchSingleContactById, updateSingleContactById, deleteSingleContactById, fetchContactsByKeyword, createBulkContact, fetchAllContacts } = require('../services/contactService');

module.exports.setSingleContact = async (req, res) => {
    try {
        const { _id, name, phone, email, city } = await createSingleContact({
            authorId: req.user.id,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            city: req.body.city
        });

        res.status(201).json({
            success: true,
            message: 'Contact created successfully',
            data: {
                id: _id, 
                name: name,
                phone:phone,
                email: email,
                city: city
            }
        });
    } catch(error) {
        if (error.code === 11000) {
            return res.status(403).json({
                success: false,
                message: 'Contact already exists'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    }
};

module.exports.setBulkContact = async (req, res) => {
    try {
        const authorId = req.user.id;
        const contacts = req.body.map( contact => {
            contact.authorId = authorId;
            return contact;
        });
        const result = await createBulkContact(contacts);

        res.status(201).json({
            success: true,
            message: 'Contact created successfully',
            data: result
        });
    } catch(error) {
        if (error.name === 'MongoBulkWriteError') {
            return res.status(403).json({
                success: false,
                message: 'Contact already exists'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    }
};

module.exports.getSingleContact = async (req, res) => {
    try {
        const { _id, name, phone, email, city } = await fetchSingleContactById(req.params.contactId);

        res.status(200).json({
            success: true,
            message: 'Contact found',
            data: {
                id: _id,
                name: name,
                phone: phone,
                email: email,
                city: city
            }
        });
    } catch(error) {
        if (error.name === 'DocumentNotFoundError') {
            return res.status(404).json({
                success: false,
                message: 'Not found'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
};

module.exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await fetchAllContacts(
            req.user.id, 
            parseInt(req.skip),
            parseInt(req.limit)
        );

        res.status(200).json({
            success: true,
            message: 'Contact found',
            data: contacts
        });
    } catch(error) {
        if (error.name === 'DocumentNotFoundError') {
            return res.status(404).json({
                success: false,
                message: 'Not found'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
};

module.exports.modifySingleContact = async (req, res) => {
    try {
        const { _id, name, phone, email, city } = await updateSingleContactById(req.params.contactId,{
            authorId: req.user.id,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            city: req.body.city
        });

        res.status(200).json({
            success: true,
            message: 'Contact updated',
            data: {
                id: _id,
                name: name,
                phone: phone,
                email: email,
                city: city
            }
        });
    } catch(error) {
        if (error.name === 'DocumentNotFoundError') {
            return res.status(404).json({
                success: false,
                message: 'Not found'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
};

module.exports.removeSingleContact = async (req, res) => {
    try {
        const { _id, name, phone, email, city } = await deleteSingleContactById(req.params.contactId);

        res.status(202).json({
            success: true,
            message: 'Contact deleted',
            data: {
                id: _id,
                name: name,
                phone: phone,
                email: email,
                city: city
            }
        });
    } catch(error) {
        if (error.name === 'DocumentNotFoundError') {
            return res.status(404).json({
                success: false,
                message: 'Not found'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
};

module.exports.searchContact = async (req, res) => {
    try {
        const key = req.query.key.replace("+", " ");
        // console.log(key)
        const results = await fetchContactsByKeyword(key, req.user.id);
        res.send(results);
    } catch(error) {
        if (error.name === 'DocumentNotFoundError') {
            return res.status(404).json({
                success: false,
                message: 'Not found'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
};
