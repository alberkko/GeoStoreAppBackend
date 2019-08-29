const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const storeRoutes = require('./apis/routes/stores');

//connect to db
mongoose.connect('mongodb+srv://UserOne:userone@cluster0-8vwja.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//handle corse error by adding headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Controll-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();

});


app.use('/stores', storeRoutes);

//404 error for stores that do not exist
app.use((req, res, next) => {
    const error = new Error('404 Not Found');
    error.status = 404;
    next(error);
})

//500 error for everything else
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;