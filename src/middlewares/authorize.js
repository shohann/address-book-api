const { verify } = require('jsonwebtoken');
const { jwtKey } = require('../../config/environmentVariables');

module.exports.authorizeAccess =  (req, res, next) => {
    try {
        let tokenHeader = req.header('Authorization');
        const token = tokenHeader.split(" ")[1].trim();
        const decoded = verify(token, jwtKey);
        req.user = decoded;
        next();
    } catch(error) {
        if (error.name === 'TokenExpiredError') return res.status(401).json('Invalid Token');
        else if (error.name === 'TypeError') return res.status(401).send('Access denied.No token provided');
        else return res.status(500).send('Internal server error');
    }
};

