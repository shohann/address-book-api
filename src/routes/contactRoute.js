const { setSingleContact, getSingleContact, modifySingleContact, removeSingleContact, searchContact, setBulkContact, getAllContacts } = require('../controllers/contactControllers');
const { authorizeAccess } = require('../middlewares/authorize');
const { contactValidator, bulkContactValidator } = require('../middlewares/validate');
const { pagination } = require('../middlewares/paginate')
const router = require('express').Router();

router.route('/')
    .post(authorizeAccess, contactValidator, setSingleContact)
    .get(authorizeAccess, pagination, getAllContacts)

router.route('/bulk')
    .post(authorizeAccess, bulkContactValidator ,setBulkContact);

router.route('/search')
    .get(authorizeAccess, searchContact)        

router.route('/:contactId')
    .get(authorizeAccess, getSingleContact)
    .put(authorizeAccess, contactValidator, modifySingleContact)
    .delete(authorizeAccess, removeSingleContact)

module.exports = router;
  