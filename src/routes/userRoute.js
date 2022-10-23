const router = require('express').Router();
const { signUp, signIn } = require('../controllers/userControllers');
const { userValidator } = require('../middlewares/validate')

router.route('/signup')
    .post(userValidator, signUp);

router.route('/signin')
    .post(signIn);

module.exports = router;