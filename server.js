const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');

const connectDB = require('./config/mongodb.connect');

const app = express();

dotenv.config({path : 'config.env'});
const PORT = process.env.PORT || 8080

//log requests
app.use(logger('tiny'));

//mongoDB connections
connectDB();

//load routers
app.use('/api', require('./routes/api'))

//call this API to check if all is OK
app.get('/checkOk', (_req, res) => {
    res.send('OK');
})

app.listen(PORT, () => {console.log('Server is running',(PORT))});



