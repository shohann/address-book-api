const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dbServer: process.env.MONGODB_SERVER,
    jwtKey: process.env.JWT_SECRET_KEY,
}