const mongoose = require('mongoose');
const { dbServer } = require('../../config/environmentVariables');

module.exports = async () => {
    try {
        await mongoose.connect(dbServer,  { useNewUrlParser: true });
        console.log('Database connected...');

    } catch(error) {
        console.log(error.message);
    }
};