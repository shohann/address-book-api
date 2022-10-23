const express = require('express');
const cors = require('cors')
const app = express();
const userRoute = require('./src/routes/userRoute');
const contactRoute = require('./src/routes/contactRoute')

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoute);
app.use('/api/contacts', contactRoute);

module.exports = app;