const { createUser, fetchSingleUserByEmail } = require('../services/userService');
const { genSalt, hash, compare } = require('bcrypt');
const { generateJWT } = require('../utils/jwt');
const { saltRound } = require('../../config/default');

module.exports.signUp = async (req, res) => {
    try {
        const salt = await genSalt(saltRound);
        const hashedPassword = await hash(req.body.password, salt);
        const { _id, name, email } = await createUser({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        const token = generateJWT(_id, email);
        
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                name: name,
                email: email
            },
            token: token
        });
    } catch(error) {
        if (error.code === 11000) {
            return res.status(403).json({
                success: false,
                message: 'User already exists'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    }
};

module.exports.signIn = async (req, res) => {
    try {
        const { _id, email, password } = await fetchSingleUserByEmail(req.body.email);
        const validUser = await compare(req.body.password, password); 
        if (!validUser) throw new Error('Invalid email or password', { cause: 'password' })
        const token = generateJWT(_id, email);

        res.status(200).json({
            success: true,
            message: 'User found',
            data: {
                email: email
            },
            token: token
        });
    } catch(error) {
        if (error.name === 'DocumentNotFoundError') {
            return res.status(404).json({
                success: false,
                message: 'Invalid email or password'
            });
        } else if (error.cause === 'password') {
            return res.status(404).json({
                success: false,
                message: 'Invalid email or password'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }             
    }
};