const app = require('./app');
const connectDB = require('./src/utils/connectDB');
const port = require('./config/default').port || 3001 ;

app.listen(port, () => {
    connectDB();
    console.log(`Listening on port ${port}`);
});

