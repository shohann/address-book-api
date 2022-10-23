const { sign } = require('jsonwebtoken');
const { jwtKey } = require('../../config/environmentVariables');

module.exports.generateJWT = (id, email) => {
    const payload = { id: id, email: email};
    const time = { expiresIn: "3h" }
    const token = sign(payload, jwtKey, time);

    return token;
};


